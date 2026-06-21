import os
import json

from datetime import datetime

def case_exists(
    case_id
):
    return os.path.exists(
        f"cases/{case_id}"
    )

def open_case(
    case_id
):
    if case_exists(
        case_id
    ):
        return case_id

    return None

def get_case_evidence_count(
    case_id
):

    evidence_path = (
        f"cases/{case_id}/evidence"
    )

    if not os.path.exists(
        evidence_path
    ):
        return 0

    return len(
        os.listdir(
            evidence_path
        )
    )

def create_case_structure(
    case_id
):

    base_dir = (
        f"cases/{case_id}"
    )

    folders = [
        "evidence",
        "reports",
        "timeline",
        "logs",
        "notes"
    ]

    os.makedirs(
        base_dir,
        exist_ok=True
    )

    for folder in folders:

        os.makedirs(
            f"{base_dir}/{folder}",
            exist_ok=True
        )

def add_evidence_to_case(
    case_id,
    evidence_data
):
    create_case_structure(
        case_id
    )

    registry_file = (
        f"cases/{case_id}/"
        "evidence_registry.json"
    )

    if os.path.exists(
        registry_file
    ):

        with open(
            registry_file,
            "r"
        ) as f:

            registry = json.load(f)

    else:

        registry = []

    registry.append(
        {
            "filename":
                evidence_data[
                    "filename"
                ],

            "status":
                evidence_data[
                    "status"
                ],

            "risk_level":
                evidence_data[
                    "risk_level"
                ],

            "threat_score":
                evidence_data[
                    "threat_score"
                ]
        }
    )

    with open(
        registry_file,
        "w"
    ) as f:

        json.dump(
            registry,
            f,
            indent=4
        )

def add_case_event(
    case_id,
    event
):

    create_case_structure(
        case_id
    )

    timeline_file = (
        f"cases/{case_id}/timeline/"
        "timeline.json"
    )

    if os.path.exists(
        timeline_file
    ):

        with open(
            timeline_file,
            "r"
        ) as f:

            timeline = json.load(f)

    else:

        timeline = []

    timeline.append(
        {
            "timestamp":
                str(
                    datetime.now()
                ),

            "event":
                event
        }
    )

    with open(
        timeline_file,
        "w"
    ) as f:

        json.dump(
            timeline,
            f,
            indent=4
        )

def update_case_summary(
    case_id
):

    registry_file = (
        f"cases/{case_id}/"
        "evidence_registry.json"
    )

    if not os.path.exists(
        registry_file
    ):
        return

    with open(
        registry_file,
        "r"
    ) as f:

        registry = json.load(f)

    summary = {
        "case_id":
            case_id,

        "total_evidence":
            len(registry),

        "high_risk":
            len([
                x for x in registry
                if x["risk_level"]
                == "HIGH"
            ]),

        "medium_risk":
            len([
                x for x in registry
                if x["risk_level"]
                == "MEDIUM"
            ]),

        "low_risk":
            len([
                x for x in registry
                if x["risk_level"]
                == "LOW"
            ])
    }

    with open(
        f"cases/{case_id}/"
        "case_summary.json",
        "w"
    ) as f:

        json.dump(
            summary,
            f,
            indent=4
        )