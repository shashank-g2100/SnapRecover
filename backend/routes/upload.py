# import json

# from services import threat_engine
# from database import db
# from fastapi import APIRouter, UploadFile, File
# import shutil
# from services.detect_tampering import detect_tampering
# from services.report_generator import (
#     generate_report
# )
# from services.advanced_analysis import analyze_image
# from services.ela_analysis import generate_ela_image
# from services.threat_score import calculate_threat_score
# from services.ocr_analysis import extract_text
# from services.ai_deepfake_detection import detect_ai_generated

# from datetime import datetime

# import numpy as np

# def sanitize_for_mongo(obj):
#     if isinstance(
#         obj,
#         np.generic
#     ):
#         return obj.item()

#     if isinstance(obj, dict):
#         return {
#             k: sanitize_for_mongo(v)
#             for k, v in obj.items()
#         }

#     if isinstance(obj, list):
#         return [
#             sanitize_for_mongo(v)
#             for v in obj
#         ]

#     return obj

# router = APIRouter()

# @router.post("/upload")
# async def upload_image(file: UploadFile = File(...)):

#     # SAVE FILE

#     file_path = f"uploads/{file.filename}"
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     # ANALYSIS
#     metadata = analyze_image(file_path)
#     print("METADATA DEBUG:")
#     print(json.dumps(metadata, indent=2, default=str))
#     ela_path = generate_ela_image(
#         file_path
#     )
#     ocr_text = extract_text(
#         file_path
#     )
#     threat = calculate_threat_score(
#         file_path,
#         metadata
#     )
#     ai_detection = detect_ai_generated(
#         file_path
#     )

#     # =====================================
#     # STATUS FROM MEDIA TYPE
#     # =====================================
#     media_type = (
#         ai_detection.get(
#             "classification",
#             {}
#         ).get(
#             "media_type",
#             "unknown"
#         )
#     )

#     if media_type == "graphic_design":
#         status = (
#             "Designed Digital Media"
#         )

#     elif media_type == "camera_photo":
#         status = (
#             "Likely Original"
#         )

#     elif media_type in [
#         "screenshot",
#         "web_ui",
#         "mobile_app"
#     ]:
#         status = (
#             "Screenshot"
#         )

#     elif media_type == "document_scan":
#         status = (
#             "Document Scan"
#         )

#     elif media_type == "ai_generated":
#         status = (
#             "Potential AI Generated Media"
#         )

#     else:
#         status = detect_tampering(
#             file_path
#         )

#     ai_detection = sanitize_for_mongo(
#         ai_detection
#     )

#     print(
#         json.dumps(
#             ai_detection,
#             indent=2,
#             default=str
#         )
#     )

#     metadata = sanitize_for_mongo(
#         metadata
#     )

#     threat = sanitize_for_mongo(
#         threat
#     )

#     ela_path = sanitize_for_mongo(
#         ela_path
#     )

#     # DATABASE SAVE
#     # ai_detection contains the complete result returned by
#     # services/ai_deepfake_detection.py

#     threat_engine = ai_detection.get(
#         "threat_engine",
#         {}
#     ) or {}

#     # Use Analyzer's FINAL score and FINAL risk level.
#     # Do not use old threat score if final threat engine value exists.

#     final_score = threat_engine.get(
#         "final_threat_score"
#     )

#     if final_score is None:
#         final_score = threat_engine.get(
#             "threat_score"
#         )

#     if final_score is None:
#         final_score = threat.get(
#             "score",
#             0
#         )

#     final_risk_level = threat_engine.get(
#         "risk_level"
#     )

#     if not final_risk_level:
#         final_risk_level = threat.get(
#             "level",
#             "LOW"
#         )

#     final_verdict = threat_engine.get(
#         "verdict"
#     )

#     if not final_verdict:
#         final_verdict = ai_detection.get(
#             "verdict",
#             status
#         )

#     # PDF file location
#     report_path = f"reports/{file.filename}.pdf"

#     # Convert OCR object into plain text.
#     # Your OCR function may return:
#     # { "text": "...", "text_length": 120 }
#     if isinstance(ocr_text, dict):
#         clean_ocr_text = ocr_text.get("text", "")
#     else:
#         clean_ocr_text = str(ocr_text or "")

#     # Create chain-of-custody data if it is not already generated
#     chain_of_custody = {
#         "case_id": f"CASE-{datetime.now().strftime('%Y%m%d%H%M%S')}",
#         "evidence_filename": file.filename,
#         "acquired_at": datetime.now().isoformat(),
#         "integrity_status": "Verified",
#     }

#     # This is the FULL MongoDB document.
#     # Reports modal needs all these fields.
#     # OCR may come as plain text or as:
#     # { "text": "...", "text_length": 100 }
#     if isinstance(ocr_text, dict):
#         clean_ocr_text = ocr_text.get("text", "")
#     else:
#         clean_ocr_text = str(ocr_text or "")

#     investigation = {
#         "filename": file.filename,

#         # Use Analyzer verdict instead of an older status value
#         "status": final_verdict,

#         "timestamp": datetime.now().isoformat(),

#         # ==================================================
#         # ONE FINAL SOURCE OF TRUTH FOR REPORTS + ANALYZER
#         # ==================================================
#         "risk_level": str(final_risk_level).upper(),
#         "threat_score": float(final_score),

#         "risk_reasons": (
#             ai_detection.get("reasons")
#             or threat_engine.get("reasons")
#             or threat.get("reasons", [])
#         ),

#         # Main forensic data
#         "metadata": metadata,
#         "ocr_text": clean_ocr_text,
#         "ela_image": ela_path,

#         # Full analyzer result
#         "ai_detection": ai_detection,

#         # Save threat engine separately too
#         "threat_engine": threat_engine,

#         # Case details
#         "chain_of_custody": (
#             ai_detection.get("chain_of_custody")
#             or {}
#         ),

#         "case_id": (
#             ai_detection.get("case_id")
#             or None
#         ),

#         "report": report_path
#     }

#     investigation = sanitize_for_mongo(
#         investigation
#     )

#     # Generate PDF using the SAME final values saved in MongoDB.
#     # This keeps Analyzer UI, Reports page, MongoDB and PDF consistent.

#     report_data = {
#         **investigation,

#         # Ensure PDF generator gets full analyzer result
#         "ai_detection": ai_detection,
#         "ocr_text": ocr_text,
#         "ela_image": ela_path,

#         # Explicitly force final Analyzer values
#         "threat_score": float(final_score),
#         "risk_level": str(final_risk_level).upper(),
#         "status": final_verdict,
#         "threat_engine": threat_engine,
#     }

#     generate_report(
#         report_data,
#         report_path
#     )

#     print(
#         "MongoDB Save Started"
#     )

#     await db.investigations.insert_one(
#         investigation
#     )

#     # RESPONSE
#     response = {
#         "filename": file.filename,
#         "metadata": metadata,
#         "status": status,
#         "timestamp": investigation["timestamp"],

#         "report": report_path,
#         "ela_image": ela_path,
#         "ocr_text": clean_ocr_text,

#         "threat_score": float(final_score),
#         "risk_level": str(final_risk_level).upper(),
#         "risk_reasons": threat.get("reasons", []),

#         "ai_detection": ai_detection,
#         "chain_of_custody": chain_of_custody,
#         "case_id": chain_of_custody["case_id"],
#     }

#     return sanitize_for_mongo(
#         response
#     )


import json
import os
import shutil
from datetime import datetime

import numpy as np
from fastapi import APIRouter, UploadFile, File

from database import db
from services.detect_tampering import detect_tampering
from services.report_generator import generate_report
from services.advanced_analysis import analyze_image
from services.ela_analysis import generate_ela_image
from services.threat_score import calculate_threat_score
from services.ocr_analysis import extract_text
from services.ai_deepfake_detection import detect_ai_generated
from services.advanced_face_forensics import analyze_face_consistency


router = APIRouter()


def sanitize_for_mongo(obj):
    if isinstance(obj, np.generic):
        return obj.item()

    if isinstance(obj, dict):
        return {
            str(k): sanitize_for_mongo(v)
            for k, v in obj.items()
        }

    if isinstance(obj, list):
        return [
            sanitize_for_mongo(v)
            for v in obj
        ]

    return obj


def normalize_metadata(raw_metadata: dict, filename: str, chain_of_custody: dict):
    """
    Converts analyze_image() output into one consistent format
    for MongoDB, Reports modal, Analyzer page, and PDF.
    """

    raw_metadata = raw_metadata or {}

    file_size_kb = (
        raw_metadata.get("file_size_kb")
        or raw_metadata.get("File Size (KB)")
        or raw_metadata.get("file_size")
        or 0
    )

    width = (
        raw_metadata.get("width")
        or raw_metadata.get("image_width")
        or raw_metadata.get("Image Width")
        or 0
    )

    height = (
        raw_metadata.get("height")
        or raw_metadata.get("image_height")
        or raw_metadata.get("Image Height")
        or 0
    )

    file_type = (
        raw_metadata.get("file_type")
        or raw_metadata.get("format")
        or raw_metadata.get("File Type")
        or "Unknown"
    )

    sha256 = (
        raw_metadata.get("sha256")
        or raw_metadata.get("sha256_hash")
        or raw_metadata.get("SHA256 Hash")
        or chain_of_custody.get("sha256_original")
        or ""
    )

    # If file size is already bytes, preserve it.
    # If only KB exists, convert to bytes.
    file_size_bytes = raw_metadata.get("file_size_bytes")

    if not file_size_bytes:
        try:
            file_size_bytes = int(float(file_size_kb) * 1024)
        except Exception:
            file_size_bytes = chain_of_custody.get("file_size", 0)

    return {
        "filename": (
            raw_metadata.get("filename")
            or raw_metadata.get("File Name")
            or filename
        ),

        "file_size": file_size_bytes,
        "file_size_kb": round(float(file_size_kb), 2) if file_size_kb else 0,

        "width": int(width) if width else 0,
        "height": int(height) if height else 0,

        "file_type": file_type,
        "format": file_type,

        "sha256": sha256,
        "sha256_hash": sha256,

        # Keep original metadata too for debugging / future use
        "raw_metadata": raw_metadata,
    }


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)
    os.makedirs("reports", exist_ok=True)

    # =====================================
    # SAVE UPLOADED FILE
    # =====================================
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # =====================================
    # RUN ANALYSIS
    # =====================================
    raw_metadata = analyze_image(file_path)

    print("METADATA DEBUG:")
    print(json.dumps(raw_metadata, indent=2, default=str))

    ela_path = generate_ela_image(file_path)
    ocr_result = extract_text(file_path)
    threat = calculate_threat_score(file_path, raw_metadata)

    # Main AI / forensic result
    ai_detection = detect_ai_generated(file_path)

    # Advanced face analysis
    advanced_face = analyze_face_consistency(file_path)

    # Add it inside ai_detection so it is automatically saved in:
    # MongoDB, Reports modal, PDF report, and API response
    ai_detection["advanced_face_forensics"] = {
        "face_detected": advanced_face.get("face_detected", False),
        "face_count": advanced_face.get("face_count", 0),
        "face_consistency_score": advanced_face.get(
            "face_consistency_score",
            0
        ),
        "synthetic_face_suspected": advanced_face.get(
            "synthetic_face_suspected",
            False
        ),
        "reasons": advanced_face.get("reasons", []),
    }

    raw_metadata = sanitize_for_mongo(raw_metadata)
    threat = sanitize_for_mongo(threat)
    ai_detection = sanitize_for_mongo(ai_detection)
    ela_path = sanitize_for_mongo(ela_path)

    # =====================================
    # OCR NORMALIZATION
    # =====================================
    if isinstance(ocr_result, dict):
        clean_ocr_text = ocr_result.get("text", "")
    else:
        clean_ocr_text = str(ocr_result or "")

    # =====================================
    # GET FINAL ANALYSIS VALUES
    # =====================================
    threat_engine = ai_detection.get("threat_engine", {}) or {}

    final_score = (
        threat_engine.get("final_threat_score")
        or threat_engine.get("threat_score")
        or ai_detection.get("threat_score")
        or threat.get("score")
        or 0
    )

    final_risk_level = (
        threat_engine.get("risk_level")
        or ai_detection.get("risk_level")
        or threat.get("level")
        or "LOW"
    )

    final_verdict = (
        threat_engine.get("verdict")
        or ai_detection.get("verdict")
        or "Needs Manual Review"
    )

    # =====================================
    # STATUS FROM MEDIA TYPE
    # =====================================
    media_type = (
        ai_detection.get("classification", {})
        .get("media_type", "unknown")
    )

    if media_type == "graphic_design":
        display_status = "Designed Digital Media"

    elif media_type == "camera_photo":
        display_status = "Likely Original"

    elif media_type in ["screenshot", "web_ui", "mobile_app"]:
        display_status = "Screenshot"

    elif media_type == "document_scan":
        display_status = "Document Scan"

    elif media_type == "ai_generated":
        display_status = "Potential AI Generated Media"

    else:
        display_status = detect_tampering(file_path)

    # =====================================
    # USE ONE CHAIN OF CUSTODY EVERYWHERE
    # =====================================
    chain_of_custody = (
        ai_detection.get("chain_of_custody")
        or {}
    )

    if not chain_of_custody:
        chain_of_custody = {
            "evidence_id": f"SR-{datetime.now().strftime('%Y-%H%M')}",
            "acquisition_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "file_size": os.path.getsize(file_path),
            "analyst": "SnapRecover",
            "chain_status": "INTACT",
            "integrity_verified": True,
        }

    # Make sure chain data always has these values
    chain_of_custody["file_size"] = (
        chain_of_custody.get("file_size")
        or os.path.getsize(file_path)
    )

    # =====================================
    # FIX CAPITALIZED METADATA KEYS HERE
    # =====================================
    metadata = normalize_metadata(
        raw_metadata,
        file.filename,
        chain_of_custody
    )

    print("NORMALIZED METADATA:")
    print(json.dumps(metadata, indent=2, default=str))

    # =====================================
    # REPORT PATH
    # =====================================
    report_path = f"reports/{os.path.splitext(file.filename)[0]}.pdf"

    # =====================================
    # MONGODB DOCUMENT
    # =====================================
    investigation = {
        "filename": file.filename,

        # Keep verdict for Reports page
        "status": final_verdict,

        "display_status": display_status,
        "timestamp": datetime.now().isoformat(),

        "risk_level": str(final_risk_level).upper(),
        "threat_score": float(final_score),

        "risk_reasons": (
            threat_engine.get("reasons")
            or ai_detection.get("reasons")
            or threat.get("reasons", [])
        ),

        # Correct normalized metadata
        "metadata": metadata,

        "ocr_text": clean_ocr_text,
        "ocr": {
            "text": clean_ocr_text,
            "text_length": len(clean_ocr_text),
        },

        "ela_image": ela_path,

        # Complete analyzer output
        "ai_detection": ai_detection,

        "threat_engine": threat_engine,

        "chain_of_custody": chain_of_custody,

        "case_id": (
            ai_detection.get("case_id")
            or f"CASE-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        ),

        "report": report_path,
    }

    investigation = sanitize_for_mongo(investigation)

    # =====================================
    # GENERATE PDF USING SAME MONGODB DATA
    # =====================================
    generate_report(
        investigation,
        report_path
    )

    print("MongoDB Save Started")

    await db.investigations.insert_one(investigation)

    # =====================================
    # API RESPONSE
    # =====================================
    return {
        "_id": None,
        "filename": investigation["filename"],
        "metadata": investigation["metadata"],
        "status": investigation["status"],
        "display_status": investigation["display_status"],
        "timestamp": investigation["timestamp"],

        "report": investigation["report"],
        "ela_image": investigation["ela_image"],
        "ocr_text": investigation["ocr_text"],

        "threat_score": investigation["threat_score"],
        "risk_level": investigation["risk_level"],
        "risk_reasons": investigation["risk_reasons"],

        "ai_detection": investigation["ai_detection"],
        "chain_of_custody": investigation["chain_of_custody"],
        "case_id": investigation["case_id"],
    }