import os
import json
from datetime import datetime

def initialize_notes(
    case_id
):
    notes_file = (
        f"cases/{case_id}/notes/investigator_notes.json"
    )

    if not os.path.exists(
        notes_file
    ):
        with open(
            notes_file,
            "w"
        ) as f:
            json.dump(
                [],
                f,
                indent=4
            )

    return notes_file

def add_note(
    case_id,
    title,
    note,
    analyst="SnapRecover"
):
    notes_file = (
        f"cases/{case_id}/notes/investigator_notes.json"
    )

    if not os.path.exists(
        notes_file
    ):
        initialize_notes(
            case_id
        )

    with open(
        notes_file,
        "r"
    ) as f:
        notes = json.load(
            f
        )

    entry = {
        "timestamp":
            datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
        "title":
            title,
        "note":
            note,
        "analyst":
            analyst
    }
    notes.append(
        entry
    )
    with open(
        notes_file,
        "w"
    ) as f:
        json.dump(
            notes,
            f,
            indent=4
        )

    return entry

def get_notes(
    case_id
):
    notes_file = (
        f"cases/{case_id}/notes/investigator_notes.json"
    )

    if not os.path.exists(
        notes_file
    ):
        return []

    with open(
        notes_file,
        "r"
    ) as f:
        return json.load(
            f
        )