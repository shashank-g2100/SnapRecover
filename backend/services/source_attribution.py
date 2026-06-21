def analyze_source(metadata):
    
    source = "Unknown"

    confidence = 0

    reasons = []

    software = str(
        metadata.get(
            "Image Software",
            ""
        )
    ).lower()

    if "instagram" in software:

        source = "Instagram"

        confidence = 90

        reasons.append(
            "Shared via Instagram"
        )

    elif "whatsapp" in software:

        source = "WhatsApp"

        confidence = 90

        reasons.append(
            "Shared via WhatsApp"
        )

    elif "snapchat" in software:

        source = "Snapchat"

        confidence = 90

        reasons.append(
            "Shared via Snapchat"
        )

    elif "facebook" in software:

        source = "Facebook"

        confidence = 90

        reasons.append(
            "Shared via Facebook"
        )

    return {

        "source_platform": source,

        "confidence": confidence,

        "reasons": reasons
    }