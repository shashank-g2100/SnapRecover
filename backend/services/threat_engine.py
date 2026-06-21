def calculate_threat_score(
    classification,
    metadata_forensics,
    ai_generated_detection,
    ela_analysis,
    compression_forensics,
    corruption_forensics,
    face_forensics
):
    score = 0
    reasons = []

    # =====================================
    # METADATA
    # =====================================
    score += (
        metadata_forensics.get(
            "forensic_score",
            0
        ) * 0.5
    )
    reasons.extend(
        metadata_forensics.get(
            "reasons",
            []
        )
    )

    # =====================================
    # AI DETECTION
    # =====================================
    score += ai_generated_detection.get(
        "confidence",
        0
    ) // 2
    reasons.extend(
        ai_generated_detection.get(
            "reasons",
            []
        )
    )

    # =====================================
    # ELA
    # =====================================
    score += ela_analysis.get(
        "ela_score",
        0
    )
    reasons.extend(
        ela_analysis.get(
            "reasons",
            []
        )
    )

    # =====================================
    # COMPRESSION
    # =====================================
    score += compression_forensics.get(
        "compression_score",
        0
    ) // 2
    reasons.extend(
        compression_forensics.get(
            "reasons",
            []
        )
    )

    # =====================================
    # CORRUPTION
    # =====================================
    score += (
        corruption_forensics.get(
            "corruption_score",
            0
        ) // 4
    )
    reasons.extend(
        corruption_forensics.get(
            "reasons",
            []
        )
    )

    # =====================================
    # FACE FORENSICS
    # =====================================
    score += (
        face_forensics.get(
            "forensic_score",
            0
        ) // 2
    )
    reasons.extend(
        face_forensics.get(
            "reasons",
            []
        )
    )

    # =====================================
    # MEDIA TYPE ADJUSTMENT
    # =====================================
    media_type = classification.get(
        "media_type",
        "unknown"
    )

    if media_type in [
        "graphic_design",
        "poster",
        "digital_artwork"

    ]:
        score = max(
            score - 20,
            0
        )

    # =====================================
    # CAP SCORE
    # =====================================
    score = min(
        score,
        100
    )

    # =====================================
    # MINIMUM BASE SCORE
    # =====================================
    if (
        score == 0
        and len(reasons) > 0
    ):
        score = 5

    # =====================================
    # RISK LEVEL
    # =====================================
    if score <= 30:
        risk_level = "LOW"

    elif score <= 60:
        risk_level = "MEDIUM"

    else:
        risk_level = "HIGH"

    # =====================================
    # CONFIDENCE
    # =====================================
    confidence = min(
        100,
        50 + (len(reasons) * 2)
    )

    # =====================================
    # VERDICT
    # =====================================
    if score <= 20:
        verdict = "Likely Original"

    elif score <= 50:
        verdict = "Needs Manual Review"

    else:
        verdict = "Potentially Manipulated"

    return {
        "final_threat_score":
            score,
        "risk_level":
            risk_level,
        "confidence":
            confidence,
        "verdict":
            verdict,
        "reasons":
            list(
                set(reasons)
            )
    }