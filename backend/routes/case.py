from fastapi import APIRouter
from bson import ObjectId

from database import db

router = APIRouter()


@router.get("/case/{case_id}")
async def get_case(case_id: str):

    item = await db.investigations.find_one(
        {
            "_id": ObjectId(case_id)
        }
    )

    if not item:

        return {
            "error": "Case not found"
        }

    return {

        "_id": str(item["_id"]),

        "filename": item.get("filename"),

        "metadata": item.get("metadata"),

        "status": item.get("status"),

        "timestamp": item.get("timestamp"),

        "risk_level": item.get("risk_level"),

        "threat_score": item.get("threat_score"),

        "risk_reasons": item.get("risk_reasons"),

        "ela_image": item.get("ela_image"),

        "ocr_text": item.get("ocr_text"),

        "report": item.get("report")
    }