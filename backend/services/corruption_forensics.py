import cv2
import numpy as np
from PIL import Image

def analyze_corruption(
    image_path,
    image_type
):
    corruption_score = 0
    reasons = []
    artifact_types = []

    # ====================================
    # SKIP CORRUPTION ANALYSIS
    # FOR DESIGNED MEDIA
    # ====================================

    if image_type in [
        "graphic_design",
        "poster",
        "digital_artwork",
        "web_ui"
    ]:
        return {
            "corruption_detected": False,
            "corruption_score": 0,
            "risk_level": "LOW",
            "artifact_types": [],
            "horizontal_score": 0,
            "vertical_score": 0,
            "black_ratio": 0,
            "block_damage_count": 0,
            "reasons": [
                "Corruption analysis not applicable to graphic design"
            ]
        }

    try:
        # ====================================
        # FILE INTEGRITY CHECK
        # ====================================
        try:
            img = Image.open(image_path)
            img.verify()

        except Exception:
            corruption_score += 50
            reasons.append(
                "Image file structure corrupted"
            )

            artifact_types.append(
                "File Corruption"
            )

        # ====================================
        # LOAD IMAGE
        # ====================================
        image = cv2.imread(image_path)
        if image is None:
            return {
                "corruption_detected": True,
                "corruption_score": 100,
                "risk_level": "HIGH",
                "artifact_types": [
                    "Unreadable Image"
                ],

                "reasons": [
                    "Image could not be decoded"
                ]
            }

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        height, width = gray.shape

        # ====================================
        # HORIZONTAL ARTIFACTS
        # ====================================
        horizontal_diff = np.mean(
            np.abs(
                gray[1:, :].astype(np.float32)
                -
                gray[:-1, :].astype(np.float32)
            )
        )

        if (
            image_type == "camera_photo"
            and horizontal_diff > 45
        ):
            corruption_score += 20
            reasons.append(
                "Horizontal corruption artifacts detected"
            )

            artifact_types.append(
                "Horizontal Corruption"
            )

        # ====================================
        # VERTICAL ARTIFACTS
        # ====================================
        vertical_diff = np.mean(
            np.abs(
                gray[:, 1:].astype(np.float32)
                -
                gray[:, :-1].astype(np.float32)
            )
        )

        if (
            image_type == "camera_photo"
            and vertical_diff > 45
        ):
            corruption_score += 20
            reasons.append(
                "Vertical corruption artifacts detected"
            )

            artifact_types.append(
                "Vertical Corruption"
            )

        # ====================================
        # BLACK REGION ANALYSIS
        # ====================================
        black_pixels = np.sum(
            gray < 5
        )

        black_ratio = (
            black_pixels
            /
            (height * width)
        )

        if (
            image_type == "camera_photo"
            and black_ratio > 0.25
        ):
            corruption_score += 15
            reasons.append(
                "Large damaged black region detected"
            )

            artifact_types.append(
                "Missing Image Region"
            )

        # ====================================
        # PIXEL BLOCK ANALYSIS
        # ====================================
        block_damage_count = 0
        block_size = 16
        for y in range(
            0,
            height - block_size,
            block_size
        ):
            for x in range(
                0,
                width - block_size,
                block_size
            ):
                block = gray[
                    y:y + block_size,
                    x:x + block_size
                ]

                std = np.std(block)

                if std < 2:
                    block_damage_count += 1

        if (
            image_type == "camera_photo"
            and block_damage_count > 5000
        ):
            corruption_score += 25
            reasons.append(
                "Pixel block corruption detected"
            )
            artifact_types.append(
                "Block Corruption"
            )

        # ====================================
        # CAMERA PHOTO NORMALIZATION
        # ====================================
        if image_type == "camera_photo":
            corruption_score *= 0.5
            corruption_score = int(
                corruption_score
            )

        # ====================================
        # FINAL RISK
        # ====================================
        if corruption_score >= 60:
            risk = "HIGH"

        elif corruption_score >= 30:
            risk = "MEDIUM"

        else:
            risk = "LOW"

        return {
            "corruption_detected":
                corruption_score > 0,
            "corruption_score":
                corruption_score,
            "risk_level":
                risk,
            "artifact_types":
                artifact_types,
            "horizontal_score":
                round(horizontal_diff, 2),
            "vertical_score":
                round(vertical_diff, 2),
            "black_ratio":
                round(black_ratio, 4),
            "block_damage_count":
                block_damage_count,
            "reasons":
                reasons
        }

    except Exception as e:
        return {
            "corruption_detected": False,
            "corruption_score": 0,
            "risk_level": "UNKNOWN",
            "artifact_types": [],
            "reasons": [
                str(e)
            ]
        }