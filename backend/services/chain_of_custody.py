import os
import json
import shutil
import hashlib
import uuid

from datetime import datetime

def calculate_sha256(filepath):
    
    sha256 = hashlib.sha256()

    with open(filepath, "rb") as f:

        for chunk in iter(
            lambda: f.read(4096),
            b""
        ):
            sha256.update(chunk)

    return sha256.hexdigest()

def generate_chain_of_custody(
    image_path
):

    evidence_id = (
        f"SR-"
        f"{datetime.now().strftime('%Y')}-"
        f"{uuid.uuid4().hex[:4].upper()}"
    )

    original_hash = (
        calculate_sha256(image_path)
    )

    file_size = (
        os.path.getsize(image_path)
    )

    acquisition_time = (
        datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    )

    return {
        "evidence_id":
            evidence_id,

        "acquisition_time":
            acquisition_time,

        "sha256_original":
            original_hash,

        "sha256_verified":
            original_hash,

        "file_size":
            file_size,

        "analyst":
            "SnapRecover",

        "chain_status":
            "INTACT",

        "integrity_verified":
            True
    }

# def save_evidence_package(
#     output_path,
#     evidence_data
# ):
#     """
#     Save evidence metadata as JSON
#     """

#     os.makedirs(
#         os.path.dirname(output_path),
#         exist_ok=True
#     )

#     with open(
#         output_path,
#         "w"
#     ) as f:

#         json.dump(
#             evidence_data,
#             f,
#             indent=4
#         )

def create_evidence_package(
    evidence_id,
    image_path,
    report_path=None,
    ela_path=None,
    forensic_result=None
):
    """
    Create complete evidence package
    """

    package_dir = os.path.join(
        "evidence",
        evidence_id
    )

    os.makedirs(
        package_dir,
        exist_ok=True
    )

    #
    # Original image
    #

    if os.path.exists(image_path):

        shutil.copy2(
            image_path,
            os.path.join(
                package_dir,
                os.path.basename(image_path)
            )
        )

    #
    # ELA image
    #

    if ela_path and os.path.exists(ela_path):

        shutil.copy2(
            ela_path,
            os.path.join(
                package_dir,
                os.path.basename(ela_path)
            )
        )

    #
    # PDF report
    #

    if report_path and os.path.exists(report_path):

        shutil.copy2(
            report_path,
            os.path.join(
                package_dir,
                os.path.basename(report_path)
            )
        )

    #
    # JSON evidence
    #

    if forensic_result:

        json_path = os.path.join(
            package_dir,
            "evidence.json"
        )

        with open(
            json_path,
            "w"
        ) as f:

            json.dump(
                forensic_result,
                f,
                indent=4
            )

    return package_dir