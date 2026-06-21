import cv2
import pytesseract


def detect_source_platform(image_path):

    try:

        image = cv2.imread(image_path)

        if image is None:
            return "Unknown"

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        text = pytesseract.image_to_string(
            gray
        ).lower()

        # ====================================
        # CHATGPT DETECTION
        # ====================================
        chatgpt_count = text.count(
            "chatgpt"
        )
        if (
            chatgpt_count >= 3
            or (
                "new chat" in text
                and (
                    "gpt-4" in text
                    or "explore gpts" in text
                )
            )
        ):
            return "ChatGPT"
        
        # ====================================
        # BROWSER / WEB DASHBOARD
        # ====================================

        if any(
            keyword in text
            for keyword in [
                "dashboard",
                "reports",
                "history",
                "analytics",
                "analyzer"
            ]
        ):
            return "Browser"

        platforms = {

            "GitHub": [
                "github"
            ],

            "LinkedIn": [
                "linkedin"
            ],

            "Instagram": [
                "instagram"
            ],

            "Power BI": [
                "power bi"
            ],

            "Canva": [
                "canva"
            ],

            "Figma": [
                "figma"
            ],

            "VS Code": [
                "visual studio code",
                "extensions",
                "explorer"
            ]
        }

        for platform, keywords in platforms.items():

            if any(
                k in text
                for k in keywords
            ):
                return platform

        return "Unknown"

    except Exception:
        return "Unknown"