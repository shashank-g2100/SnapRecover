def analyze_metadata(
    metadata,
    media_type="unknown"
):
    score = 0
    reasons = []
    source = "Unknown"
    source_confidence = 0
    raw_metadata = metadata.get(
        "raw_metadata",
        {}
    )
    summary = metadata.get(
        "summary",
        {}
    )
    software = str(
        raw_metadata.get(
            "Image Software",
            ""
        )
    ).lower()

    if software in [
        "",
        "unknown"
    ]:
        reasons.append(
            "Software information unavailable"
        )

    # =====================================
    # AI TOOLS
    # =====================================
    ai_sources = {
        "midjourney": "Midjourney",
        "stable diffusion": "Stable Diffusion",
        "dall-e": "DALL-E",
        "chatgpt": "ChatGPT",
        "comfyui": "ComfyUI",
        "automatic1111": "Automatic1111",
        "flux": "Flux"
    }

    for keyword, name in ai_sources.items():
        if keyword in software:
            source = name
            source_confidence = 95
            score += 50
            reasons.append(
                f"{name} metadata detected"
            )

    # =====================================
    # EDITING SOFTWARE
    # =====================================
    editing_tools = {
        "photoshop": "Adobe Photoshop",
        "adobe": "Adobe Software",
        "lightroom": "Adobe Lightroom",
        "gimp": "GIMP",
        "canva": "Canva",
        "pixlr": "Pixlr",
        "snapseed": "Snapseed"
    }

    social_sources = {
        "instagram": "Instagram",
        "whatsapp": "WhatsApp",
        "facebook": "Facebook",
        "snapchat": "Snapchat",
        "telegram": "Telegram",
        "twitter": "Twitter/X",
        "xiaomi": "Xiaomi Camera",
        "samsung": "Samsung Camera",
        "iphone": "Apple iPhone",
        "oppo": "OPPO Camera",
        "vivo": "Vivo Camera",
        "oneplus": "OnePlus Camera"
    }

    for keyword, name in social_sources.items():
        if keyword in software:
            source = name
            source_confidence = 90
            reasons.append(
                f"Shared via {name}"
            )

    for keyword, name in editing_tools.items():
        if keyword in software:
            source = name
            source_confidence = 80
            score += 25
            reasons.append(
                f"{name} metadata detected"
            )

    # =====================================
    # MISSING METADATA
    # =====================================
    camera_make = summary.get(
        "camera_make"
    )

    camera_model = summary.get(
        "camera_model"
    )

    lens_model = summary.get(
        "lens_model"
    )

    shared_platform = any(
        platform in software
        for platform in [
            "instagram",
            "facebook",
            "whatsapp",
            "telegram",
            "snapchat",
            "twitter"
        ]
    )

    if (
        media_type == "camera_photo"
        and not shared_platform
        and camera_make in [
            None,
            "",
            "Unknown"
        ]
    ):
        score += 5
        reasons.append(
            "Camera make unavailable"
        )

    if (
        media_type == "camera_photo"
        and not shared_platform
        and camera_model in [
            None,
            "",
            "Unknown"
        ]
    ):
        score += 5
        reasons.append(
            "Camera model unavailable"
        )

    if (
        media_type == "camera_photo"
        and not shared_platform
        and lens_model in [
            None,
            "",
            "Unknown"
        ]
    ):
        score += 3
        reasons.append(
            "Lens model unavailable"
        )

    # =====================================
    # TIMESTAMP CHECK
    # =====================================
    datetime_original = summary.get(
        "datetime_original"
    )

    datetime_modified = summary.get(
        "datetime"
    )

    if (
        datetime_original
        and datetime_modified
        and datetime_original != datetime_modified
    ):
        reasons.append(
            "Image modified after capture"
        )

    metadata_present = not (
        camera_make == "Unknown"
        and camera_model == "Unknown"
    )

    metadata_status = (
        "Available"
        if metadata_present
        else "Unavailable"
    )

    integrity_score = 100 - score

    if integrity_score < 0:
        integrity_score = 0

    # =====================================
    # FINAL
    # =====================================

    return {
        "source": source,
        "source_confidence": source_confidence,
        "forensic_score": score,
        "integrity_score": integrity_score,
        "metadata_status": metadata_status,
        "editing_detected":
            score >= 25,
        "ai_metadata_detected":
            score >= 50,
        "reasons": reasons
    }