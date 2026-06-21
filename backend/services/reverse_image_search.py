import hashlib


def image_hash(image_path):

    with open(image_path, "rb") as f:

        return hashlib.sha256(
            f.read()
        ).hexdigest()


def reverse_image_search(image_path):

    sha256 = image_hash(
        image_path
    )

    return {

        "image_hash": sha256,

        "matches_found": False,

        "source_platform": "Unknown",

        "confidence": 0,

        "reasons": [
            "Local reverse search only"
        ]
    }