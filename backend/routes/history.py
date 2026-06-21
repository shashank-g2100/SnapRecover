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

router = APIRouter()


@router.get("/history")
async def get_history():
    investigations = db.investigations.find()
    history = []
    async for item in investigations:
        history.append({
            "_id": str(item["_id"]),
            "filename": item.get("filename"),
            "status": item.get("status"),
            "timestamp": item.get("timestamp"),
            "risk_level": item.get("risk_level"),
            "threat_score": item.get("threat_score"),
            "risk_reasons": item.get("risk_reasons"),
            "ela_image": item.get("ela_image")
        })

    return history


@router.delete("/history/{investigation_id}")
async def delete_history(investigation_id: str):

    try:
        # Find the investigation first
        document = await db.investigations.find_one(
            {
                "_id": ObjectId(investigation_id)
            }
        )

        if not document:
            raise HTTPException(
                status_code=404,
                detail="Investigation not found"
            )

        # Delete ELA image if it exists
        ela_image = document.get("ela_image")
        if ela_image:
            file_path = ela_image
            if os.path.exists(file_path):
                os.remove(file_path)

        # Delete MongoDB record
        result = await db.investigations.delete_one(
            {
                "_id": ObjectId(investigation_id)
            }
        )

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Failed to delete investigation"
            )

        return {
            "success": True,
            "message": "Investigation deleted successfully"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )