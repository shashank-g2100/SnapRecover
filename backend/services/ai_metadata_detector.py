from PIL import Image
from PIL.ExifTags import TAGS


def detect_ai_metadata(image_path):

    ai_detected = False
    reasons = []
    source = "Unknown"

    try:

        image = Image.open(image_path)

        # ======================================
        # PNG Metadata
        # ======================================
        png_info = image.info
        for key, value in png_info.items():
            value = str(value).lower()

            if (
                "chatgpt" in value
                or "openai" in value
            ):
                ai_detected = True
                source = "ChatGPT"
                reasons.append(
                    "OpenAI metadata detected"
                )

            # Stable Diffusion
            if "stable diffusion" in value:
                ai_detected = True
                source = "Stable Diffusion"
                reasons.append(
                    "Stable Diffusion metadata detected"
                )

            # Automatic1111
            if "negative prompt" in value:
                ai_detected = True
                reasons.append(
                    "Automatic1111 generation metadata detected"
                )

            # ComfyUI
            if "comfyui" in value:
                ai_detected = True
                source = "ComfyUI"
                reasons.append(
                    "ComfyUI workflow metadata detected"
                )

            # Midjourney
            if "midjourney" in value:
                ai_detected = True
                source = "Midjourney"
                reasons.append(
                    "Midjourney metadata detected"
                )

            # DALL-E
            if "dall-e" in value:
                ai_detected = True
                source = "DALL-E"
                reasons.append(
                    "DALL-E metadata detected"
                )

            # Flux
            if "flux" in value:
                ai_detected = True
                source = "Flux"
                reasons.append(
                    "Flux AI metadata detected"
                )

        # ======================================
        # EXIF Metadata
        # ======================================
        exif = image.getexif()
        for tag_id, value in exif.items():
            tag = TAGS.get(
                tag_id,
                tag_id
            )
            value = str(value).lower()

            if (
                "chatgpt" in value
                or "openai" in value
            ):
                ai_detected = True
                source = "ChatGPT"
                reasons.append(
                    "OpenAI metadata detected"
                )

            if "stable diffusion" in value:
                ai_detected = True
                source = "Stable Diffusion"
                reasons.append(
                    "Stable Diffusion EXIF metadata detected"
                )

            if "midjourney" in value:
                ai_detected = True
                source = "Midjourney"
                reasons.append(
                    "Midjourney EXIF metadata detected"
                )

            if "dall-e" in value:
                ai_detected = True
                source = "DALL-E"
                reasons.append(
                    "DALL-E EXIF metadata detected"
                )

            if "comfyui" in value:
                ai_detected = True
                source = "ComfyUI"
                reasons.append(
                    "ComfyUI EXIF metadata detected"
                )
        
        confidence = 0

        if ai_detected:
            confidence = 95

        reasons = list(
            dict.fromkeys(reasons)
        )

        return {
            "detected": ai_detected,
            "confidence": confidence,
            "source": source,
            "reasons": reasons
        }

    except Exception:

        return {
            "detected": False,
            "confidence": 0,
            "source": "Unknown",
            "reasons": []
        }