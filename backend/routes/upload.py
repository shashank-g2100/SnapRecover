import json

from database import db
from fastapi import APIRouter, UploadFile, File
import shutil
from services.detect_tampering import detect_tampering
from services.report_generator import (
    generate_report
)
from services.advanced_analysis import analyze_image
from services.ela_analysis import generate_ela_image
from services.threat_score import calculate_threat_score
from services.ocr_analysis import extract_text
from services.ai_deepfake_detection import detect_ai_generated

from datetime import datetime

import numpy as np

def sanitize_for_mongo(obj):
    if isinstance(
        obj,
        np.generic
    ):
        return obj.item()

    if isinstance(obj, dict):
        return {
            k: sanitize_for_mongo(v)
            for k, v in obj.items()
        }

    if isinstance(obj, list):
        return [
            sanitize_for_mongo(v)
            for v in obj
        ]

    return obj

router = APIRouter()

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):

    # SAVE FILE

    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ANALYSIS
    metadata = analyze_image(file_path)
    ela_path = generate_ela_image(
        file_path
    )
    ocr_text = extract_text(
        file_path
    )
    threat = calculate_threat_score(
        file_path,
        metadata
    )
    ai_detection = detect_ai_generated(
        file_path
    )

    # =====================================
    # STATUS FROM MEDIA TYPE
    # =====================================
    media_type = (
        ai_detection.get(
            "classification",
            {}
        ).get(
            "media_type",
            "unknown"
        )
    )

    if media_type == "graphic_design":
        status = (
            "Designed Digital Media"
        )

    elif media_type == "camera_photo":
        status = (
            "Likely Original"
        )

    elif media_type in [
        "screenshot",
        "web_ui",
        "mobile_app"
    ]:
        status = (
            "Screenshot"
        )

    elif media_type == "document_scan":
        status = (
            "Document Scan"
        )

    elif media_type == "ai_generated":
        status = (
            "Potential AI Generated Media"
        )

    else:
        status = detect_tampering(
            file_path
        )

    ai_detection = sanitize_for_mongo(
        ai_detection
    )

    print(
        json.dumps(
            ai_detection,
            indent=2,
            default=str
        )
    )

    metadata = sanitize_for_mongo(
        metadata
    )

    threat = sanitize_for_mongo(
        threat
    )

    ela_path = sanitize_for_mongo(
        ela_path
    )

    # PDF REPORT
    report_path = f"reports/{file.filename}.pdf"
    report_data = {
        "filename": file.filename,
        "status": status,
        "metadata": metadata,
        "risk_level": threat["level"],
        "threat_score": threat["score"],
        "risk_reasons": threat["reasons"]
    }

    generate_report(
        report_data,
        report_path
    )

    # DATABASE SAVE
    investigation = {
        "filename": file.filename,
        "metadata": metadata,
        "status": status,
        "timestamp": str(datetime.now()),
        "risk_level": threat["level"],
        "threat_score": threat["score"],
        "risk_reasons": threat["reasons"],
        "ela_image": ela_path,
        "ocr_text": ocr_text,
        "ai_detection": ai_detection,
        "report": report_path
    }

    investigation = sanitize_for_mongo(
        investigation
    )

    print(
        "MongoDB Save Started"
    )

    await db.investigations.insert_one(
        investigation
    )

    # RESPONSE
    response = {
        "filename": file.filename,
        "metadata": metadata,
        "status": status,
        "report": report_path,
        "ela_image": ela_path,
        "ocr_text": ocr_text,
        "threat_score": threat["score"],
        "risk_level": threat["level"],
        "risk_reasons": threat["reasons"],
        "ai_detection": ai_detection
    }

    return sanitize_for_mongo(
        response
    )