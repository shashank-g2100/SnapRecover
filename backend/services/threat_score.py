# import os

# def calculate_threat_score(file_path, metadata):
#     score = 0
#     reasons = []
#     filename = file_path.lower()
#     file_size = metadata.get("File Size (KB)", 0)
#     width = metadata.get("Image Width", 0)
#     height = metadata.get("Image Height", 0)

#     # PNG SCREENSHOT

#     if filename.endswith(".png"):
#         score += 25
#         reasons.append("PNG Screenshot")

#     # LOW FILE SIZE

#     if file_size < 100:
#         score += 20
#         reasons.append("Compressed Image")

#     # LOW RESOLUTION

#     if width < 500 or height < 500:
#         score += 20
#         reasons.append("Low Resolution")

#     # MISSING CAMERA INFO

#     if "Camera" not in str(metadata):
#         score += 10
#         reasons.append("No Camera Metadata")

#     # VERY LARGE FILES

#     if file_size > 5000:
#         score += 15
#         reasons.append("Unusual File Size")

#     # FINAL RISK LEVEL

#     if score >= 70:
#         level = "HIGH"

#     elif score >= 40:
#         level = "MEDIUM"

#     else:
#         level = "LOW"

#     return {
#         "score": score,
#         "level": level,
#         "reasons": reasons
#     }

import os

def calculate_threat_score(file_path, metadata):
    score = 0
    reasons = []
    filename = os.path.basename(
        file_path
    ).lower()
    file_size = metadata.get(
        "File Size (KB)",
        0
    )
    width = metadata.get(
        "Image Width",
        0
    )
    height = metadata.get(
        "Image Height",
        0
    )
    file_type = str(
        metadata.get(
            "File Type",
            ""
        )
    ).lower()

    # ==========================================
    # CORRUPTED / INVALID IMAGE
    # ==========================================
    if "Error" in metadata:
        return {
            "score": 100,
            "level": "HIGH",
            "reasons": [
                "Corrupted Image File",
                "Potential Malicious File"
            ]
        }

    # ==========================================
    # DETECT SCREENSHOTS
    # ==========================================
    is_screenshot = (
        "screenshot" in filename
        or "screen shot" in filename
        or filename.endswith(".png")
    )

    # ==========================================
    # PNG FORMAT
    # INFORMATIONAL ONLY
    # ==========================================
    if filename.endswith(".png"):
        reasons.append(
            "PNG Format"
        )

    # ==========================================
    # SCREENSHOT DETECTED
    # INFORMATIONAL ONLY
    # ==========================================
    if (
        "screenshot" in filename
        or "screen shot" in filename
    ):
        reasons.append(
            "Desktop Screenshot Detected"
        )

    # ==========================================
    # LOW FILE SIZE
    # ==========================================
    if file_size < 150:
        score += 20
        reasons.append(
            "Compressed Image"
        )

    # ==========================================
    # LOW RESOLUTION
    # ==========================================
    if width < 500 or height < 500:
        score += 20
        reasons.append(
            "Low Resolution"
        )

    # ==========================================
    # CAMERA METADATA CHECK
    # ONLY FOR NON-SCREENSHOTS
    # ==========================================
    if not is_screenshot:
        if "camera" not in str(metadata).lower():
            score += 10
            reasons.append(
                "No Camera Metadata"
            )

    # ==========================================
    # WHATSAPP IMAGE
    # ==========================================
    if "whatsapp" in filename:
        score += 10
        reasons.append(
            "WhatsApp Compressed Image"
        )

    # ==========================================
    # EDITING SOFTWARE DETECTION
    # ==========================================
    suspicious_keywords = [
        "photoshop",
        "canva",
        "edited",
        "pixlr",
        "removebg",
        "adobe",
        "gimp",
        "photopea"
    ]

    for word in suspicious_keywords:
        if word in filename:
            score += 20
            reasons.append(
                "Possible Edited Image"
            )
            break

    # ==========================================
    # SCREENSHOT SAFETY CAP
    # ==========================================
    if is_screenshot:
        score = max(score, 15)
        score = min(score, 25)

    # ==========================================
    # NORMALIZE SCORE
    # ==========================================
    score = max(
        0,
        min(score, 100)
    )

    # ==========================================
    # REMOVE DUPLICATES
    # ==========================================
    reasons = list(
        dict.fromkeys(reasons)
    )

    # ==========================================
    # RISK LEVEL
    # ==========================================
    if score >= 70:
        level = "HIGH"

    elif score >= 40:
        level = "MEDIUM"

    else:
        level = "LOW"

    # ==========================================
    # RETURN
    # ==========================================
    return {
        "score": score,
        "level": level,
        "reasons": reasons
    }