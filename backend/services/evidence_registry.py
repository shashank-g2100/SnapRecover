import json
import os

def register_evidence(
    case_id,
    evidence_id,
    filename
):

    registry_file = (
        f"cases/{case_id}/evidence_registry.json"
    )

    registry = []

    if os.path.exists(
        registry_file
    ):

        with open(
            registry_file,
            "r"
        ) as f:

            registry = json.load(f)

    registry.append({

        "evidence_id":
            evidence_id,

        "filename":
            filename
    })

    with open(
        registry_file,
        "w"
    ) as f:

        json.dump(
            registry,
            f,
            indent=4
        )