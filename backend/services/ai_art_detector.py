import cv2
import numpy as np


def detect_ai_artifacts(image_path):

    try:

        image = cv2.imread(image_path)

        if image is None:
            return False, []

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        reasons = []

        score = 0

        # ------------------------------------------------
        # Very smooth texture
        # ------------------------------------------------

        noise = cv2.Laplacian(
            gray,
            cv2.CV_64F
        ).var()

        if noise < 40:
            score += 1
            reasons.append(
                "Extremely smooth synthetic texture"
            )

        # ------------------------------------------------
        # Excessive color perfection
        # ------------------------------------------------

        hsv = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2HSV
        )

        saturation = np.mean(
            hsv[:, :, 1]
        )

        if saturation > 120:
            score += 1
            reasons.append(
                "Artificially enhanced color profile"
            )

        # ------------------------------------------------
        # Unreal sharpness
        # ------------------------------------------------

        sharpness = cv2.Laplacian(
            gray,
            cv2.CV_64F
        ).var()

        if sharpness > 600:
            score += 1
            reasons.append(
                "Unnatural image sharpness"
            )

        # ------------------------------------------------
        # Lack of sensor noise
        # ------------------------------------------------

        noise_std = np.std(gray)

        if noise_std < 20:
            score += 1
            reasons.append(
                "Missing natural sensor noise"
            )

        return score >= 3, reasons

    except Exception:

        return False, []