import cv2
import numpy as np


face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)

eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_eye.xml"
)


def analyze_faces(
    image_path,
    face_detected,
    face_count
):
    score = 0
    reasons = []
    image = cv2.imread(image_path)

    if image is None:
        return {
        "face_detected": False,
        "face_count": 0,
        "forensic_score": 0,
        "reasons": ["Unable to read image"],
        "synthetic_face_suspected": False
    }

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(60, 60)
    )

    face_count = len(faces)
    if face_count == 0:
        return {
        "face_detected": False,
        "face_count": 0,
        "forensic_score": 0,
        "reasons": [],
        "synthetic_face_suspected": False
    }

    for (x, y, w, h) in faces:
        face_width = w

        # =========================
        # SKIP VERY SMALL FACES
        # =========================
        if face_width < 60:
            continue

        face_roi = gray[
            y:y+h,
            x:x+w
        ]

        # =========================
        # FACE SIZE CHECK
        # =========================
        face_area = w * h

        if face_area < 3600:
            continue

        face_roi = gray[
            y:y+h,
            x:x+w
        ]

        # =========================
        # FACE SHARPNESS
        # =========================
        sharpness = cv2.Laplacian(
            face_roi,
            cv2.CV_64F
        ).var()

        if sharpness < 40:
            score += 10
            reasons.append(
                "Blurred face region"
            )

        # =========================
        # FACE SYMMETRY
        # =========================
        left = face_roi[
            :,
            :w//2
        ]

        right = face_roi[
            :,
            w//2:
        ]

        right = cv2.flip(
            right,
            1
        )

        min_width = min(
            left.shape[1],
            right.shape[1]
        )

        left = left[:, :min_width]
        right = right[:, :min_width]

        difference = np.mean(
            np.abs(
                left.astype(np.float32)
                -
                right.astype(np.float32)
            )
        )

        if (
            face_area > 20000
            and difference < 8
        ):
            score += 10
            reasons.append(
                "Unusually perfect face symmetry"
            )

        # =========================
        # EYE DETECTION
        # =========================
        eyes = eye_cascade.detectMultiScale(
            face_roi
        )

        if face_area > 15000:
            if len(eyes) < 2:
                score += 10
                reasons.append(
                    "Eye alignment anomaly"
                )

    return {
        "face_detected": True,
        "face_count": face_count,
        "forensic_score": int(score),
        "reasons": reasons,
        "synthetic_face_suspected":
            score >= 50
    }