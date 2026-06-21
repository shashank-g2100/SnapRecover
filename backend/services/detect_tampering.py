# from PIL import Image
# import os

# def detect_tampering(image_path):

#     image = Image.open(image_path)

#     width, height = image.size

#     size = os.path.getsize(image_path)

#     suspicious = False

#     reasons = []

#     # VERY LOW RESOLUTION

#     if width < 300 or height < 300:

#         suspicious = True

#         reasons.append("Low Resolution")

#     # VERY SMALL FILE SIZE

#     if size < 50 * 1024:

#         suspicious = True

#         reasons.append("Compressed/Low File Size")

#     # PNG SCREENSHOTS

#     if image_path.lower().endswith(".png"):

#         suspicious = True

#         reasons.append("Screenshot or Edited PNG")

#     if suspicious:

#         return f"Suspicious ({', '.join(reasons)})"

#     return "Likely Original"

from PIL import Image
from PIL import UnidentifiedImageError


def detect_tampering(image_path):

    try:

        image = Image.open(image_path)

        width, height = image.size

        # SIMPLE FORENSIC CHECKS

        if width < 300 or height < 300:

            return "Suspicious Image"

        if image.format == "PNG":

            return "Potential Screenshot / Edited Image"

        return "Likely Original"

    except UnidentifiedImageError:

        return "Corrupted / Invalid Image"

    except Exception as e:

        return f"Analysis Error: {str(e)}"