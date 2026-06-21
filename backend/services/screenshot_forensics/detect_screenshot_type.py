import cv2
import pytesseract


def detect_screenshot_type(image_path):

    try:

        image = cv2.imread(image_path)

        if image is None:
            return "Unknown Screenshot"

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        text = pytesseract.image_to_string(
            gray
        ).lower()

        ide_keywords = [
            "python",
            "import",
            "def ",
            "class ",
            "console",
            "terminal",
            "visual studio code"
        ]

        dashboard_keywords = [
            "dashboard",
            "revenue",
            "sales",
            "analytics",
            "profit",
            "power bi"
        ]

        social_keywords = [
            "like",
            "comment",
            "share",
            "followers",
            "following"
        ]

        browser_keywords = [
            "http",
            "https",
            "google",
            "search"
        ]

        if any(
            k in text
            for k in ide_keywords
        ):
            return "IDE Screenshot"

        if any(
            k in text
            for k in dashboard_keywords
        ):
            return "Dashboard Screenshot"

        if any(
            k in text
            for k in social_keywords
        ):
            return "Social Media Screenshot"

        if any(
            k in text
            for k in browser_keywords
        ):
            return "Browser Screenshot"

        return "General Screenshot"

    except Exception:
        return "Unknown Screenshot"