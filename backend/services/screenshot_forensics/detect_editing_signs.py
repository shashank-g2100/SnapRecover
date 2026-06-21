import cv2
import numpy as np


def detect_editing_signs(image_path):

    findings = []

    try:

        image = cv2.imread(image_path)

        if image is None:
            return findings

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        black_pixels = np.sum(
            gray < 5
        )

        ratio = (
            black_pixels
            /
            gray.size
        )

        if ratio > 0.10:

            findings.append(
                "Possible redaction detected"
            )

        return findings

    except Exception:

        return findings