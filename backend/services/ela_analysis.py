from PIL import (
    Image,
    ImageChops,
    ImageEnhance,
    ImageFile
)

import numpy as np
import os

ImageFile.LOAD_TRUNCATED_IMAGES = True


def generate_ela_image(image_path):

    try:

        original = Image.open(
            image_path
        ).convert("RGB")

        temp_path = "temp_ela.jpg"

        original.save(
            temp_path,
            "JPEG",
            quality=90
        )

        compressed = Image.open(
            temp_path
        )

        ela_image = ImageChops.difference(
            original,
            compressed
        )

        extrema = ela_image.getextrema()

        max_diff = max(
            ex[1]
            for ex in extrema
        )

        if max_diff == 0:
            max_diff = 1

        scale = 255.0 / max_diff

        ela_image = ImageEnhance.Brightness(
            ela_image
        ).enhance(scale)

        ela_output = (
            f"uploads/ela_{os.path.basename(image_path)}"
        )

        ela_image.save(
            ela_output
        )

        # ============================
        # PHASE 4 ANALYSIS
        # ============================

        ela_array = np.array(
            ela_image
        )

        ela_mean = round(
            float(
                np.mean(
                    ela_array
                )
            ),
            2
        )

        ela_std = round(
            float(
                np.std(
                    ela_array
                )
            ),
            2
        )

        ela_max = int(
            np.max(
                ela_array
            )
        )

        # ============================
        # FORENSIC SCORING
        # ============================

        ela_score = 0

        reasons = []

        if ela_mean > 25:

            ela_score += 15

            reasons.append(
                "Abnormally high ELA intensity"
            )

        if ela_std > 40:

            ela_score += 15

            reasons.append(
                "Irregular compression distribution"
            )

        if ela_max > 240:

            ela_score += 10

            reasons.append(
                "Strong localized compression artifacts"
            )

        if ela_score >= 30:

            risk = "HIGH"

        elif ela_score >= 15:

            risk = "MEDIUM"

        else:

            risk = "LOW"

        os.remove(
            temp_path
        )

        return {

            "ela_image":
                ela_output,

            "ela_score":
                float(ela_score),

            "ela_mean":
                ela_mean,

            "ela_std":
                ela_std,

            "ela_max":
                ela_max,

            "ela_risk":
                risk,

            "ela_anomaly_detected":
                ela_score >= 15,

            "reasons":
                reasons
        }

    except Exception as e:

        return {

            "ela_image": None,

            "ela_score": 0,

            "ela_mean": 0,

            "ela_std": 0,

            "ela_max": 0,

            "ela_risk": "UNKNOWN",

            "ela_anomaly_detected": False,

            "reasons": [
                str(e)
            ]
        }