import cv2
import numpy as np
import pytesseract


def detect_ai_screenshot(image_path):

    try:

        image = cv2.imread(image_path)

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        text = pytesseract.image_to_string(
            gray
        )

        text_length = len(
            text.strip()
        )

        edges = cv2.Canny(
            gray,
            100,
            200
        )

        edge_ratio = (
            np.sum(edges > 0)
            /
            (image.shape[0] * image.shape[1])
        )

        score = 0
        reasons = []

        # lots of OCR text

        if text_length > 50:
            score += 1
            reasons.append(
                "Screenshot-like text density detected"
            )

        # UI borders

        if edge_ratio > 0.05:
            score += 1
            reasons.append(
                "User interface edge patterns detected"
            )

        ai_keywords = [
            "midjourney",
            "dall-e",
            "stable diffusion",
            "comfyui",
            "flux"
        ]

        text_lower = text.lower()

        for keyword in ai_keywords:
    
            if keyword in text_lower:

                score += 3

                reasons.append(
                    f"AI platform reference found: {keyword}"
                )

        chatgpt_count = text_lower.count(
            "chatgpt"
        )

        if chatgpt_count >= 3:

            reasons.append(
                "ChatGPT interface detected"
            )

        return score >= 3, reasons

    except:

        return False, []