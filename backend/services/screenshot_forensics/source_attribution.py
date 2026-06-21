from services.screenshot_forensics.detect_source_platform import (
    detect_source_platform
)

from services.screenshot_forensics.detect_screenshot_type import (
    detect_screenshot_type
)


def attribute_source(image_path):

    screenshot_type = detect_screenshot_type(
        image_path
    )

    platform = detect_source_platform(
        image_path
    )

    confidence = 50

    if platform != "Unknown":
        confidence += 25

    if screenshot_type != "General Screenshot":
        confidence += 20

    confidence = min(
        confidence,
        100
    )

    return {

        "platform": platform,

        "screenshot_type":
            screenshot_type,

        "confidence":
            confidence
    }