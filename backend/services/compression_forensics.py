import cv2
import numpy as np
from PIL import Image


def analyze_compression(
    image_path,
    image_type="unknown"
):
    score = 0
    reasons = []

    try:
        image = cv2.imread(image_path)
        if image is None:
            return {
                "compression_detected": False,
                "compression_score": 0,
                "reasons": []
            }

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        height, width = gray.shape

        # ==========================
        # JPEG BLOCK ANALYSIS
        # ==========================
        block_score = 0
        for y in range(8, height, 8):
            diff = np.mean(
                np.abs(
                    gray[y - 1, :].astype(np.float32)
                    -
                    gray[y, :].astype(np.float32)
                )
            )
            block_score += diff

        block_score /= max(
            1,
            height // 8
        )

        if block_score > 15:
            score += 20
            reasons.append(
                "Strong JPEG block artifacts detected"
            )

        # ==========================
        # SHARPNESS LOSS
        # ==========================
        sharpness = cv2.Laplacian(
            gray,
            cv2.CV_64F
        ).var()

        if sharpness < 50:
            score += 15
            reasons.append(
                "Compression blur detected"
            )

        # ==========================
        # COLOR LOSS
        # ==========================
        small = cv2.resize(
            image,
            (100, 100)
        )

        unique_colors = len(
            np.unique(
                small.reshape(-1, 3),
                axis=0
            )
        )

        if (
            image_type == "camera_photo"
            and unique_colors < 2000
        ):
            score += 10
            reasons.append(
                "Reduced color diversity"
            )

        # ==========================
        # SOCIAL MEDIA CHECK
        # ==========================
        pil_img = Image.open(
            image_path
        )
        width, height = pil_img.size
        if width <= 1200:
            score += 3 
            reasons.append(
                "Possible social media resizing"
            )

        if score >= 40:
            compression_level = "High"

        elif score >= 20:
            compression_level = "Moderate"

        else:
            compression_level = "Low"

        # ==========================
        # FINAL
        # ==========================
        if score == 0:
            reasons.append(
            "No significant compression artifacts detected"
        )
            
        return {
            "compression_detected":
                score >= 20,
            "compression_score":
                score,
            "compression_level":
                compression_level,
            "block_artifact_score":
                float(block_score),
            "sharpness":
                float(sharpness),
            "unique_colors":
                unique_colors,
            "reasons":
                reasons
        }

    except Exception as e:
        return {
            "compression_detected": False,
            "compression_score": 0,
            "reasons": [str(e)]
        }