# import os
# import hashlib
# from PIL import Image
# from datetime import datetime
# import magic


# def calculate_hash(file_path):

#     sha256 = hashlib.sha256()

#     with open(file_path, "rb") as f:

#         while chunk := f.read(4096):

#             sha256.update(chunk)

#     return sha256.hexdigest()


# def analyze_image(file_path):

#     image = Image.open(file_path)

#     width, height = image.size

#     stat = os.stat(file_path)

#     evidence = {

#         "File Name": os.path.basename(file_path),

#         "File Size (KB)": round(stat.st_size / 1024, 2),

#         "Image Width": width,

#         "Image Height": height,

#         "File Type": magic.from_file(file_path),

#         "Created Time": datetime.fromtimestamp(
#             stat.st_ctime
#         ).strftime("%Y-%m-%d %H:%M:%S"),

#         "Modified Time": datetime.fromtimestamp(
#             stat.st_mtime
#         ).strftime("%Y-%m-%d %H:%M:%S"),

#         "SHA256 Hash": calculate_hash(file_path)
#     }

#     return evidence


from PIL import Image
from PIL import UnidentifiedImageError

import os
import hashlib
import magic

from services.compression_forensics import (
    analyze_compression
)

def analyze_image(file_path):
    try:
        image = Image.open(file_path)
        metadata = {
            "File Name":
                os.path.basename(file_path),
            "File Size (KB)":
                round(
                    os.path.getsize(file_path) / 1024,
                    2
                ),
            "Image Width":
                image.width,
            "Image Height":
                image.height,
            "File Type":
                magic.from_file(file_path),
            "SHA256 Hash":
                hashlib.sha256(
                    open(file_path, "rb").read()
                ).hexdigest()
        }
        return metadata

    except UnidentifiedImageError:
        return {
            "File Name":
                os.path.basename(file_path),
            "Error":
                "Corrupted or Invalid Image",
            "Threat":
                "Potentially Malicious File",
            "File Size (KB)":
                round(
                    os.path.getsize(file_path) / 1024,
                    2
                )
        }

    except Exception as e:
        return {
            "Error":
                str(e)
        }