from fastapi import APIRouter
import json
import os

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

STATS_FILE = os.path.join(
    BASE_DIR,
    "data",
    "stats.json"
)


@router.get("/stats")
def get_stats():

    with open(STATS_FILE, "r") as f:
        return json.load(f)


@router.post("/stats/report-generated")
def increment_report_count():

    with open(STATS_FILE, "r") as f:
        data = json.load(f)

    data["reports_generated"] += 1

    with open(STATS_FILE, "w") as f:
        json.dump(data, f, indent=4)

    return {
        "success": True,
        "reports_generated": data["reports_generated"]
    }