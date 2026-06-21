import cv2
import numpy as np
import pytesseract

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)

def result(media_type, confidence):
    return {
        "media_type": media_type,
        "confidence": confidence
    }


def classify_image_type(image_path):
    try:
        image = cv2.imread(image_path)
        if image is None:
            return "unknown"
        height, width, _ = image.shape
        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        # ====================================
        # FACE DETECTION
        # ====================================

        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.15,
            minNeighbors=8,
            minSize=(60, 60)
        )

        face_count = len(faces)

        # ====================================
        # EDGE DENSITY
        # ====================================
        edges = cv2.Canny(
            gray,
            100,
            200
        )
        edge_ratio = (
            np.sum(edges > 0)
            / (width * height)
        )

        # ====================================
        # COLOR DIVERSITY
        # ====================================
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

        # ====================================
        # SHARPNESS
        # ====================================
        sharpness = cv2.Laplacian(
            gray,
            cv2.CV_64F
        ).var()

        # ====================================
        # SATURATION
        # ====================================
        hsv = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2HSV
        )
        saturation = np.mean(
            hsv[:, :, 1]
        )

        # ====================================
        # OCR TEXT
        # ====================================
        text = pytesseract.image_to_string(
            gray
        )
        text_length = len(
            text.strip()
        )

        text_lower = text.lower()

        gps_keywords = [
            "latitude",
            "longitude",
            "lat",
            "long",
            "gps",
            "map camera"
        ]

        gps_overlay_detected = any(
            keyword in text_lower
            for keyword in gps_keywords
        )

        ui_keywords = [
            "dashboard",
            "reports",
            "settings",
            "history",
            "analytics",
            "login",
            "chatgpt",
            "windows",
            "power bi",
            "visual studio"
        ]

        mobile_keywords = [
            "followers",
            "following",
            "stories",
            "profile",
            "messages"
        ]

        document_keywords = [
            "certificate",
            "passport",
            "invoice",
            "receipt",
            "marks card",
            "aadhaar"
        ]

        text_upper = text.upper()
        branding_keywords = [
            "LOGO",
            "SECURITY",
            "ANALYTICS",
            "PROTECT",
            "RESPOND",
            "MONITORING",
            "CLOUD",
            "THREAT"
        ]
        branding_count = sum(
            keyword in text_upper
            for keyword in branding_keywords
        )
        
        if (
            branding_count >= 3
            and saturation > 70
        ):
            return result(
                "graphic_design",
                95
            )
        
        # ====================================
        # CAMERA PHOTO PRIORITY
        # ====================================

        if (
            face_count >= 1
            or gps_overlay_detected
        ):
            return result(
                "camera_photo",
                95
            )
        
        # ====================================
        # DOCUMENT SCAN
        # ====================================

        if any(
            keyword in text_lower
            for keyword in document_keywords
        ):
            return result(
                "document_scan",
                90
            )
        
        # ====================================
        # WEB UI
        # ====================================

        if any(
            keyword in text_lower
            for keyword in ui_keywords
        ):
            return result(
                "web_ui",
                95
            )
        
        # ====================================
        # MOBILE APP
        # ====================================

        if (
            width < height
            and any(
                keyword in text_lower
                for keyword in mobile_keywords
            )
        ):
            return result(
                "mobile_app",
                90
            )
        
        # ====================================
        # SCREENSHOT
        # ====================================
        ui_detected = any(
            keyword in text_lower
            for keyword in ui_keywords
        )

        ui_detected = any(
            keyword in text_lower
            for keyword in ui_keywords
        )

        hsv = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2HSV
        )

        saturation = np.mean(
            hsv[:, :, 1]
        )

        if (
            saturation > 80
            and text_length > 20
            and edge_ratio < 0.08
        ):
            return {
                "media_type": "graphic_design",
                "confidence": 95
            }

        if (
            ui_detected
            and text_length > 100
            and edge_ratio > 0.03
            and width > 1000
        ):
            return result("screenshot", 95)
        
        if (
            saturation > 90
            and sharpness > 100
            and face_count == 0
        ):
            return result(
                "digital_artwork",
                95
            )

        # ====================================
        # SOFTWARE UI / DASHBOARD
        # ====================================

        if (
            text_length > 100
            and edge_ratio > 0.04
            and unique_colors < 1200
        ):
            return result(
                "web_ui",
                90
            )
        
        # ====================================
        # WEB APPLICATION UI
        # ====================================

        if (
            text_length > 100
            and width > 1200
        ):
            return result(
                "web_ui",
                95
            )
        
        if text_length > 300:
            return result(
            "document_scan",
            95
        )

        # ====================================
        # DIGITAL ARTWORK
        # ====================================
        if (
            saturation > 100
            and edge_ratio < 0.03
            and text_length < 20
        ):
            return result(
                "digital_artwork",
                85
            )
        
        social_keywords = [
            "instagram",
            "facebook",
            "twitter",
            "linkedin",
            "youtube",
            "followers",
            "following",
            "likes",
            "comments"
        ]

        if any(
            keyword in text_lower
            for keyword in social_keywords
        ):
            return result(
                "social_media_screenshot",
                95
            )
        
        # ====================================
        # POSTER / BANNER
        # ====================================
        if (
            text_length > 15
            and saturation > 100
            and unique_colors < 700
        ):
            return result(
                "poster",
                85
            )

        # ====================================
        # GRAPHIC DESIGN
        # ====================================
        if (
            text_length > 20
            and unique_colors < 800
            and edge_ratio < 0.06
        ):
            return result(
            "graphic_design",
            90
        )

        # ====================================
        # CAMERA PHOTO
        # ====================================
        if (
            unique_colors > 1200
            and sharpness > 70
            and text_length < 20
        ):
            return result(
                "camera_photo",
                90
            )

        return result(
            "unknown",
            50
        )

    except Exception as e:
        print(
            "Classification Error:",
            e
        )
        return result(
            "unknown",
            0
        )