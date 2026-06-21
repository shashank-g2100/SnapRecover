import cv2
import numpy as np


def analyze_sensor_noise(image_path):

    try:

        image = cv2.imread(image_path)

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        blur = cv2.GaussianBlur(
            gray,
            (5, 5),
            0
        )

        noise = gray.astype(
            np.float32
        ) - blur.astype(
            np.float32
        )

        noise_std = np.std(
            noise
        )

        reasons = []

        if noise_std < 3:

            reasons.append(
                "Sensor noise pattern absent"
            )

            return False, reasons

        if noise_std < 6:

            reasons.append(
                "Weak sensor noise pattern"
            )

            return True, reasons

        reasons.append(
            "Natural sensor noise detected"
        )

        return True, reasons

    except:

        return False, []