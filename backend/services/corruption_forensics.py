# import cv2
# import numpy as np
# from PIL import Image

# def analyze_corruption(
#     image_path,
#     image_type
# ):
#     corruption_score = 0
#     reasons = []
#     artifact_types = []

#     # ====================================
#     # SKIP CORRUPTION ANALYSIS
#     # FOR DESIGNED MEDIA
#     # ====================================

#     if image_type in [
#         "graphic_design",
#         "poster",
#         "digital_artwork",
#         "web_ui"
#     ]:
#         return {
#             "corruption_detected": False,
#             "corruption_score": 0,
#             "risk_level": "LOW",
#             "artifact_types": [],
#             "horizontal_score": 0,
#             "vertical_score": 0,
#             "black_ratio": 0,
#             "block_damage_count": 0,
#             "reasons": [
#                 "Corruption analysis not applicable to graphic design"
#             ]
#         }

#     try:
#         # ====================================
#         # FILE INTEGRITY CHECK
#         # ====================================
#         try:
#             img = Image.open(image_path)
#             img.verify()

#         except Exception:
#             corruption_score += 50
#             reasons.append(
#                 "Image file structure corrupted"
#             )

#             artifact_types.append(
#                 "File Corruption"
#             )

#         # ====================================
#         # LOAD IMAGE
#         # ====================================
#         image = cv2.imread(image_path)
#         if image is None:
#             return {
#                 "corruption_detected": True,
#                 "corruption_score": 100,
#                 "risk_level": "HIGH",
#                 "artifact_types": [
#                     "Unreadable Image"
#                 ],

#                 "reasons": [
#                     "Image could not be decoded"
#                 ]
#             }

#         gray = cv2.cvtColor(
#             image,
#             cv2.COLOR_BGR2GRAY
#         )

#         height, width = gray.shape

#         # ====================================
#         # HORIZONTAL ARTIFACTS
#         # ====================================
#         horizontal_diff = np.mean(
#             np.abs(
#                 gray[1:, :].astype(np.float32)
#                 -
#                 gray[:-1, :].astype(np.float32)
#             )
#         )

#         if (
#             image_type == "camera_photo"
#             and horizontal_diff > 45
#         ):
#             corruption_score += 20
#             reasons.append(
#                 "Horizontal corruption artifacts detected"
#             )

#             artifact_types.append(
#                 "Horizontal Corruption"
#             )

#         # ====================================
#         # VERTICAL ARTIFACTS
#         # ====================================
#         vertical_diff = np.mean(
#             np.abs(
#                 gray[:, 1:].astype(np.float32)
#                 -
#                 gray[:, :-1].astype(np.float32)
#             )
#         )

#         if (
#             image_type == "camera_photo"
#             and vertical_diff > 45
#         ):
#             corruption_score += 20
#             reasons.append(
#                 "Vertical corruption artifacts detected"
#             )

#             artifact_types.append(
#                 "Vertical Corruption"
#             )

#         # ====================================
#         # BLACK REGION ANALYSIS
#         # ====================================
#         black_pixels = np.sum(
#             gray < 5
#         )

#         black_ratio = (
#             black_pixels
#             /
#             (height * width)
#         )

#         if (
#             image_type == "camera_photo"
#             and black_ratio > 0.25
#         ):
#             corruption_score += 15
#             reasons.append(
#                 "Large damaged black region detected"
#             )

#             artifact_types.append(
#                 "Missing Image Region"
#             )

#         # ====================================
#         # PIXEL BLOCK ANALYSIS
#         # ====================================
#         block_damage_count = 0
#         block_size = 16
#         for y in range(
#             0,
#             height - block_size,
#             block_size
#         ):
#             for x in range(
#                 0,
#                 width - block_size,
#                 block_size
#             ):
#                 block = gray[
#                     y:y + block_size,
#                     x:x + block_size
#                 ]

#                 std = np.std(block)

#                 if std < 2:
#                     block_damage_count += 1

#         if (
#             image_type == "camera_photo"
#             and block_damage_count > 5000
#         ):
#             corruption_score += 25
#             reasons.append(
#                 "Pixel block corruption detected"
#             )
#             artifact_types.append(
#                 "Block Corruption"
#             )

#         # ====================================
#         # CAMERA PHOTO NORMALIZATION
#         # ====================================
#         if image_type == "camera_photo":
#             corruption_score *= 0.5
#             corruption_score = int(
#                 corruption_score
#             )

#         # ====================================
#         # FINAL RISK
#         # ====================================
#         if corruption_score >= 60:
#             risk = "HIGH"

#         elif corruption_score >= 30:
#             risk = "MEDIUM"

#         else:
#             risk = "LOW"

#         return {
#             "corruption_detected":
#                 corruption_score > 0,
#             "corruption_score":
#                 corruption_score,
#             "risk_level":
#                 risk,
#             "artifact_types":
#                 artifact_types,
#             "horizontal_score":
#                 round(horizontal_diff, 2),
#             "vertical_score":
#                 round(vertical_diff, 2),
#             "black_ratio":
#                 round(black_ratio, 4),
#             "block_damage_count":
#                 block_damage_count,
#             "reasons":
#                 reasons
#         }

#     except Exception as e:
#         return {
#             "corruption_detected": False,
#             "corruption_score": 0,
#             "risk_level": "UNKNOWN",
#             "artifact_types": [],
#             "reasons": [
#                 str(e)
#             ]
#         }


import cv2
import numpy as np


def analyze_corruption(image_path: str, image_type: str = "unknown"):
    image = cv2.imread(image_path)

    if image is None:
        return {
            "corruption_detected": True,
            "corruption_score": 100,
            "risk_level": "HIGH",
            "artifact_types": ["Image decoding failed"],
            "horizontal_score": 100,
            "vertical_score": 0,
            "block_damage_count": 0,
            "color_distortion_score": 0,
            "glitch_pixel_ratio": 0,
            "region_difference": 0,
            "reasons": [
                "The image could not be decoded correctly."
            ]
        }

    height, width = image.shape[:2]
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 1. Horizontal scanline / glitch detection
    row_means = np.mean(gray, axis=1)
    row_differences = np.abs(np.diff(row_means))

    horizontal_score = float(np.mean(row_differences) * 2.5)

    # 2. RGB color-channel distortion
    blue, green, red = cv2.split(image)

    channel_difference = (
        np.mean(np.abs(red.astype(np.float32) - green.astype(np.float32)))
        + np.mean(np.abs(green.astype(np.float32) - blue.astype(np.float32)))
        + np.mean(np.abs(red.astype(np.float32) - blue.astype(np.float32)))
    ) / 3

    color_distortion_score = float(channel_difference)

    # 3. Top and bottom region difference
    top_half = image[: height // 2]
    bottom_half = image[height // 2 :]

    top_std = float(np.std(top_half))
    bottom_std = float(np.std(bottom_half))

    region_difference = abs(bottom_std - top_std)

    # 4. High-saturation glitch pixels
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    saturation = hsv[:, :, 1]
    value = hsv[:, :, 2]

    glitch_mask = (
        (saturation > 180) &
        (value > 120)
    )

    glitch_pixel_ratio = float(
        np.sum(glitch_mask) / glitch_mask.size
    )

    glitch_pixel_score = glitch_pixel_ratio * 100

    # 5. Pixel block damage
    edges = cv2.Canny(gray, 80, 180)
    horizontal_edges = np.sum(edges, axis=1)

    abnormal_rows = np.sum(
        horizontal_edges > np.mean(horizontal_edges) * 2
    )

    block_damage_count = int(abnormal_rows)

    # Final corruption score
    corruption_score = (
        min(horizontal_score, 35)
        + min(color_distortion_score / 3, 25)
        + min(region_difference / 2, 20)
        + min(glitch_pixel_score, 20)
    )

    corruption_score = min(round(corruption_score, 2), 100)

    artifact_types = []
    reasons = []

    if horizontal_score > 12:
        artifact_types.append("Horizontal scanline corruption")
        reasons.append(
            "Strong horizontal scanline patterns detected."
        )

    if color_distortion_score > 45:
        artifact_types.append("Color channel distortion")
        reasons.append(
            "Abnormal RGB color-channel separation detected."
        )

    if region_difference > 20:
        artifact_types.append("Abrupt image region distortion")
        reasons.append(
            "Large visual difference detected between image regions."
        )

    if glitch_pixel_ratio > 0.12:
        artifact_types.append("High saturation glitch artifacts")
        reasons.append(
            "Large area contains abnormal saturated pixel patterns."
        )

    if block_damage_count > 20:
        artifact_types.append("Pixel block damage")
        reasons.append(
            "Repeated abnormal horizontal pixel blocks detected."
        )

    corruption_detected = corruption_score >= 35

    if corruption_score >= 70:
        risk_level = "HIGH"
    elif corruption_score >= 35:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    if not reasons:
        reasons.append(
            "No significant visual corruption artifacts detected."
        )

    return {
        "corruption_detected": corruption_detected,
        "corruption_score": corruption_score,
        "risk_level": risk_level,
        "artifact_types": artifact_types,
        "horizontal_score": round(horizontal_score, 2),
        "vertical_score": 0,
        "block_damage_count": block_damage_count,
        "color_distortion_score": round(
            color_distortion_score,
            2
        ),
        "glitch_pixel_ratio": round(
            glitch_pixel_ratio,
            4
        ),
        "region_difference": round(
            region_difference,
            2
        ),
        "reasons": reasons
    }