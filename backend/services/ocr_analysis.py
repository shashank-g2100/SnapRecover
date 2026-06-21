import pytesseract

from PIL import Image


def extract_text(image_path):

    try:

        image = Image.open(image_path)

        ocr_text = pytesseract.image_to_string(
            image
        )

        return {
            "text": ocr_text.strip(),
            "text_length": len(
                ocr_text.strip()
            )
        }

    except Exception as e:

        return {
            "text": "",
            "text_length": 0,
            "error": str(e)
        }