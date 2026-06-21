from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()

@router.get("/download-report/{filename}")
async def download_report(filename: str):

    path = f"reports/{filename}.pdf"

    return FileResponse(
        path,
        media_type='application/pdf',
        filename=f"{filename}.pdf"
    )