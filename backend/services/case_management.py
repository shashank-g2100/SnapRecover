import os
import json
import uuid

from datetime import datetime

def case_exists(case_id):
    return os.path.exists(
        f"cases/{case_id}"
    )

def get_case_evidence_count(
    case_id
):
    evidence_dir = (
        f"cases/{case_id}/evidence"
    )
    if not os.path.exists(
        evidence_dir
    ):
        return 0

    return len(
        os.listdir(
            evidence_dir
        )
    )

def generate_case_id():
    return (
        f"CASE-"
        f"{datetime.now().strftime('%Y%m%d')}-"
        f"{uuid.uuid4().hex[:6].upper()}"
    )

def create_case(case_id):
    
    case_dir = os.path.join(
        "cases",
        case_id
    )

    folders = [

        "evidence",

        "reports",

        "timeline",

        "notes"
    ]

    for folder in folders:

        os.makedirs(

            os.path.join(
                case_dir,
                folder
            ),

            exist_ok=True
        )

    return case_dir

def initialize_case_summary(
    case_id
):

    summary = {

        "case_id":
            case_id,

        "created_at":
            datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),

        "evidence_count":
            0,

        "high_risk":
            0,

        "medium_risk":
            0,

        "low_risk":
            0,

        "evidence_list":
            []
    }

    return summary

def save_case_summary(
    case_id,
    summary
):

    summary_path = os.path.join(

        "cases",

        case_id,

        "case_summary.json"
    )

    with open(
        summary_path,
        "w"
    ) as f:

        json.dump(
            summary,
            f,
            indent=4
        )