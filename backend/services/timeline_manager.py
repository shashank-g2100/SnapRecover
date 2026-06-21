import json
import os
from datetime import datetime

def add_timeline_event(
    case_id,
    event_name,
    details=""
):
    timeline_dir = (
        f"cases/{case_id}/timeline"
    )

    os.makedirs(
        timeline_dir,
        exist_ok=True
    )

    timeline_file = (
        f"cases/{case_id}/timeline/timeline.json"
    )

    event = {
        "timestamp":
            datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
        "event":
            event_name,
        "details":
            details
    }

    timeline = []

    if os.path.exists(timeline_file):    
        try:
            with open(
                timeline_file,
                "r"
            ) as f:
                timeline = json.load(f)

        except:
            timeline = []

    timeline.append(event)

    with open(
        timeline_file,
        "w"
    ) as f:

        json.dump(
            timeline,
            f,
            indent=4
        )

    return event


def add_audit_log(
    case_id,
    action,
    user="SnapRecover"
):
    log_dir = (
        f"cases/{case_id}/logs"
    )

    os.makedirs(
        log_dir,
        exist_ok=True
    )

    log_file = (
        f"{log_dir}/audit_log.json"
    )

    entry = {
        "timestamp":
            datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
        "action":
            action,
        "user":
            user
    }

    logs = []

    if os.path.exists(
        log_file
    ):
        try:
            with open(
                log_file,
                "r"
            ) as f:
                logs = json.load(f)

        except:
            logs = []

    logs.append(entry)

    with open(
        log_file,
        "w"
    ) as f:

        json.dump(
            logs,
            f,
            indent=4
        )

    return entry