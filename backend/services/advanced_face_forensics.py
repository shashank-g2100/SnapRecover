import cv2
import numpy as np

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)

def calculate_symmetry(face):
    
    try:

        h, w = face.shape[:2]

        left = face[:, :w//2]

        right = face[:, w//2:]

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

        difference = cv2.absdiff(
            left,
            right
        )

        return np.mean(
            difference
        )

    except:

        return 100
    
def texture_score(face):
    
    gray = cv2.cvtColor(
        face,
        cv2.COLOR_BGR2GRAY
    )

    return cv2.Laplacian(
        gray,
        cv2.CV_64F
    ).var()


def edge_score(face):
    
    gray = cv2.cvtColor(
        face,
        cv2.COLOR_BGR2GRAY
    )

    edges = cv2.Canny(
        gray,
        100,
        200
    )

    return np.sum(
        edges > 0
    ) / edges.size

def analyze_face_consistency(
    image_path
):

    image = cv2.imread(
        image_path
    )

    if image is None:

        return {

            "face_detected": False,

            "face_consistency_score": 0,

            "synthetic_face_suspected": False,

            "reasons": [
                "Unable to load image"
            ]
        }

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )

    if len(faces) == 0:

        return {

            "face_detected": False,

            "face_consistency_score": 0,

            "synthetic_face_suspected": False,

            "reasons": []
        }

    score = 0

    reasons = []

    for (
        x,
        y,
        w,
        h
    ) in faces:

        face = image[
            y:y+h,
            x:x+w
        ]

        symmetry = calculate_symmetry(
            face
        )

        texture = texture_score(
            face
        )

        edge_density = edge_score(
            face
        )

        # =========================
        # Symmetry
        # =========================

        if symmetry < 15:

            score += 15

            reasons.append(
                "Unnaturally symmetric face"
            )

        # =========================
        # Texture
        # =========================

        if texture < 25:

            score += 15

            reasons.append(
                "Overly smooth facial texture"
            )

        # =========================
        # Edge Consistency
        # =========================

        if edge_density < 0.03:

            score += 10

            reasons.append(
                "Low facial edge complexity"
            )

    return {

        "face_detected": True,

        "face_count": len(
            faces
        ),

        "face_consistency_score":
            score,

        "synthetic_face_suspected":
            score >= 30,

        "reasons":
            reasons
    }

