import os
import shutil
import json


def create_case_repository(
    case_id
):

    case_folder = (
        f"cases/{case_id}"
    )

    os.makedirs(
        f"{case_folder}/evidence",
        exist_ok=True
    )

    os.makedirs(
        f"{case_folder}/logs",
        exist_ok=True
    )

    return case_folder

def create_evidence_folder(
    case_id,
    evidence_id
):

    evidence_folder = (
        f"cases/{case_id}/evidence/{evidence_id}"
    )

    os.makedirs(
        evidence_folder,
        exist_ok=True
    )

    return evidence_folder

def store_original_image(
    image_path,
    evidence_folder
):

    filename = (
        os.path.basename(
            image_path
        )
    )

    destination = (
        f"{evidence_folder}/{filename}"
    )

    shutil.copy2(
        image_path,
        destination
    )

    return destination

def store_ela_image(
    ela_image_path,
    evidence_folder
):

    if not ela_image_path:
        return None

    filename = (
        os.path.basename(
            ela_image_path
        )
    )

    destination = (
        f"{evidence_folder}/{filename}"
    )

    shutil.copy2(
        ela_image_path,
        destination
    )

    return destination

def store_report(
    report_path,
    evidence_folder
):

    if not report_path:
        return None

    filename = (
        os.path.basename(
            report_path
        )
    )

    destination = (
        f"{evidence_folder}/{filename}"
    )

    shutil.copy2(
        report_path,
        destination
    )

    return destination

def store_evidence_json(
    evidence_folder,
    result
):

    json_path = (
        f"{evidence_folder}/evidence.json"
    )

    with open(
        json_path,
        "w"
    ) as f:

        json.dump(
            result,
            f,
            indent=4
        )

    return json_path

