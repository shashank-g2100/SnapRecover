import json
from datetime import datetime

from services.case_manager import get_case_evidence_count

def generate_case_summary(
    case_id,
    evidence_id,
    result
):
    summary = {
        "case_id":
            case_id,
        "evidence_id":
            evidence_id,
        "case_status":
            "Closed",
        "opened_at":
            datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
        "closed_at":
            datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
        "evidence_count":
            get_case_evidence_count(
                case_id
            ),
        "risk_level":
            result.get(
                "risk_level",
                "Unknown"
            ),
        "final_verdict":
            result.get(
                "verdict",
                "Unknown"
            ),
        "analyst":
            "SnapRecover"
    }

    return summary

def save_case_summary(
    case_id,
    summary
):
    path = (
        f"cases/{case_id}/case_summary.json"
    )
    with open(
        path,
        "w"
    ) as f:
        json.dump(
            summary,
            f,
            indent=4
        )

    return path