# from fastapi import APIRouter
# from database import db

# router = APIRouter()

# @router.get("/history")
# async def get_history():

#     investigations = []

#     cursor = db.investigations.find()

#     async for document in cursor:

#         document["_id"] = str(document["_id"])

#         investigations.append(document)

#     return investigations

# from fastapi import APIRouter

# from database import db

# router = APIRouter()


# @router.get("/history")
# async def get_history():

#     investigations = db.investigations.find()

#     history = []

#     async for item in investigations:

#         history.append({
#             "_id": str(item["_id"]),
#             "filename": item.get("filename"),
#             "status": item.get("status"),
#             "timestamp": item.get("timestamp"),
#             "risk_level": item.get("risk_level"),
#             "threat_score": item.get("threat_score"),
#             "risk_reasons": item.get("risk_reasons"),
#             "ela_image": item.get("ela_image")
#         })

#     return history


from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import db
import os
from bson.errors import InvalidId

router = APIRouter()

# @router.get("/history")
# async def get_history():
#     investigations = db.investigations.find().sort("timestamp", -1)

#     history = []

#     async for item in investigations:
#         metadata = item.get("metadata", {}) or {}
#         ai_detection = item.get("ai_detection", {}) or {}
#         chain_of_custody = item.get("chain_of_custody", {}) or {}

#         # Some old reports may have full analysis stored inside ai_detection
#         analysis_data = ai_detection if isinstance(ai_detection, dict) else {}

#         # OCR may be stored as ocr_text or as ocr.text
#         ocr_text = (
#             item.get("ocr_text")
#             or item.get("ocr", {}).get("text", "")
#             or analysis_data.get("ocr", {}).get("text", "")
#             or ""
#         )

#         # ELA may be direct or inside ai_detection.ela_analysis
#         ela_image = (
#             item.get("ela_image")
#             or analysis_data.get("ela_image")
#             or analysis_data.get("ela_analysis", {}).get("ela_image")
#         )

#         # Merge metadata from all possible backend locations
#         merged_metadata = {
#             **metadata,

#             "file_size": (
#                 metadata.get("file_size")
#                 or metadata.get("file_size_bytes")
#                 or chain_of_custody.get("file_size")
#             ),

#             "width": (
#                 metadata.get("width")
#                 or metadata.get("image_width")
#                 or analysis_data.get("width")
#                 or analysis_data.get("image_width")
#             ),

#             "height": (
#                 metadata.get("height")
#                 or metadata.get("image_height")
#                 or analysis_data.get("height")
#                 or analysis_data.get("image_height")
#             ),

#             "format": (
#                 metadata.get("format")
#                 or metadata.get("file_type")
#                 or analysis_data.get("format")
#                 or analysis_data.get("file_type")
#             ),

#             "sha256": (
#                 metadata.get("sha256")
#                 or metadata.get("sha256_hash")
#                 or chain_of_custody.get("sha256_original")
#                 or chain_of_custody.get("sha256_verified")
#             ),
#         }

#         history.append({
#             "_id": str(item["_id"]),

#             "filename": item.get("filename"),
#             "status": item.get("status"),
#             "timestamp": item.get("timestamp"),
#             "risk_level": item.get("risk_level"),
#             "threat_score": item.get("threat_score", 0),
#             "risk_reasons": item.get("risk_reasons", []),

#             "metadata": merged_metadata,
#             "ocr_text": ocr_text,
#             "ela_image": ela_image,
#             "ai_detection": ai_detection,
#             "chain_of_custody": chain_of_custody,
#             "case_id": item.get("case_id"),
#             "report": item.get("report"),
#         })

#     return history

@router.get("/history")
async def get_history():
    investigations = db.investigations.find().sort("timestamp", -1)

    history = []

    async for item in investigations:
        metadata = item.get("metadata") or {}
        ai_detection = item.get("ai_detection") or {}
        chain_of_custody = item.get("chain_of_custody") or {}

        # Full analysis may be stored under different names
        analysis_data = (
            item.get("analysis_result")
            or item.get("analysis")
            or item.get("result")
            or ai_detection
            or {}
        )

        # OCR can be stored in several places
        ocr_text = (
            item.get("ocr_text")
            or (item.get("ocr") or {}).get("text")
            or (analysis_data.get("ocr") or {}).get("text")
            or ""
        )

        # Get ELA image safely
        ela_analysis = analysis_data.get("ela_analysis") or {}
        ela_image = (
            item.get("ela_image")
            or analysis_data.get("ela_image")
            or ela_analysis.get("ela_image")
            or ""
        )

        # Possible nested image information objects
        image_info = (
            item.get("image_info")
            or item.get("file_info")
            or item.get("image_metadata")
            or analysis_data.get("image_info")
            or analysis_data.get("file_info")
            or {}
        )

        # Merge all metadata sources into one frontend-friendly object
        merged_metadata = {
            **metadata,

            "filename": (
                metadata.get("filename")
                or metadata.get("File Name")
                or item.get("filename")
            ),

            "file_size": (
                metadata.get("file_size")
                or metadata.get("file_size_bytes")
                or chain_of_custody.get("file_size")
            ),

            "file_size_kb": (
                metadata.get("file_size_kb")
                or metadata.get("File Size (KB)")
            ),

            "width": (
                metadata.get("width")
                or metadata.get("image_width")
                or metadata.get("Image Width")
            ),

            "height": (
                metadata.get("height")
                or metadata.get("image_height")
                or metadata.get("Image Height")
            ),

            "file_type": (
                metadata.get("file_type")
                or metadata.get("format")
                or metadata.get("File Type")
            ),

            "format": (
                metadata.get("format")
                or metadata.get("file_type")
                or metadata.get("File Type")
            ),

            "sha256": (
                metadata.get("sha256")
                or metadata.get("sha256_hash")
                or metadata.get("SHA256 Hash")
                or chain_of_custody.get("sha256_original")
            ),
        }

        history.append({
            "_id": str(item["_id"]),

            "filename": item.get("filename"),
            "status": item.get("status"),
            "timestamp": item.get("timestamp"),
            "risk_level": item.get("risk_level"),
            "threat_score": item.get("threat_score", 0),
            "risk_reasons": item.get("risk_reasons", []),

            "metadata": merged_metadata,
            "ocr_text": ocr_text,
            "ela_image": ela_image,

            # Important: send full analysis data to frontend
            "ai_detection": analysis_data,

            "chain_of_custody": chain_of_custody,
            "case_id": item.get("case_id"),
            "report": item.get("report"),
        })

    return history

@router.delete("/history/{investigation_id}")
async def delete_history(investigation_id: str):
    try:
        # Validate MongoDB ObjectId before querying
        if not ObjectId.is_valid(investigation_id):
            raise HTTPException(
                status_code=400,
                detail="Invalid investigation ID"
            )

        object_id = ObjectId(investigation_id)

        # Find investigation first
        document = await db.investigations.find_one(
            {"_id": object_id}
        )

        if not document:
            raise HTTPException(
                status_code=404,
                detail="Investigation not found"
            )

        # Delete ELA image safely
        ela_image = document.get("ela_image")

        # Some reports store ela_image as an object:
        # { "ela_image": "uploads/file.png", "ela_score": 12 }
        if isinstance(ela_image, dict):
            ela_image = ela_image.get("ela_image")

        if isinstance(ela_image, str) and ela_image:
            file_path = ela_image

            if os.path.exists(file_path):
                os.remove(file_path)

        # Delete investigation from MongoDB
        result = await db.investigations.delete_one(
            {"_id": object_id}
        )

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Investigation could not be deleted"
            )

        return {
            "success": True,
            "message": "Investigation deleted successfully"
        }

    except HTTPException:
        # Important: preserve 400 / 404 instead of converting them to 500
        raise

    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid MongoDB investigation ID"
        )

    except Exception as e:
        print("Delete investigation error:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete investigation: {str(e)}"
        )