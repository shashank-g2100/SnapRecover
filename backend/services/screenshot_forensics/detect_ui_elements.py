import cv2
import numpy as np


def detect_ui_elements(image_path):

    try:

        image = cv2.imread(image_path)

        if image is None:
            return {}

        height, width = image.shape[:2]

        return {

            "toolbar":
                height > 400,

            "sidebar":
                width > 800,

            "status_bar":
                height > 500,

            "menu_bar":
                height > 600
        }

    except Exception:

        return {}