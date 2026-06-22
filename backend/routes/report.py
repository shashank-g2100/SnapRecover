from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
import os

router = APIRouter()


@router.get("/download-report/{filename}")
async def download_report(filename: str):
    # Remove any folder path sent from frontend
    incoming_name = Path(filename).name

    # If frontend sends original image name:
    # photo.jpeg -> photo.pdf
    if Path(incoming_name).suffix.lower() in [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    ]:
        report_filename = f"{Path(incoming_name).stem}.pdf"

    # If frontend sends actual PDF name:
    # photo.pdf -> photo.pdf
    elif Path(incoming_name).suffix.lower() == ".pdf":
        report_filename = incoming_name

    # If no extension was sent
    else:
        report_filename = f"{incoming_name}.pdf"

    report_path = os.path.join(
        "reports",
        report_filename
    )

    print("DOWNLOAD REPORT PATH:", report_path)

    if not os.path.exists(report_path):
        raise HTTPException(
            status_code=404,
            detail=f"Report not found: {report_filename}"
        )

    return FileResponse(
        path=report_path,
        media_type="application/pdf",
        filename=report_filename,
    )