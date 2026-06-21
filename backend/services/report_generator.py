import os

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    PageBreak,
    Image
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)


def safe_get(data, *keys, default="N/A"):
    try:
        for key in keys:
            data = data[key]
        return data
    except Exception:
        return default


def generate_report(
    result,
    report_path
):
    os.makedirs(
        os.path.dirname(report_path),
        exist_ok=True
    )

    doc = SimpleDocTemplate(report_path)

    styles = getSampleStyleSheet()

    elements = []

    # =====================================
    # COVER PAGE
    # =====================================

    elements.append(
        Paragraph(
            "AI Powered Digital Forensics Report",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    file_name = (
        result.get("filename")
        or result.get(
            "metadata",
            {}
        ).get(
            "File Name",
            "Unknown"
        )
    )

    elements.append(
        Paragraph(
            f"File Name: {file_name}",
            styles["Normal"]
        )
    )

    ai = result.get(
        "ai_detection",
        {}
    )

    elements.append(
        Paragraph(
            f"Verdict: {ai.get('verdict', 'Unknown')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Authenticity: {ai.get('authenticity', 'Unknown')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Risk Level: {safe_get(result, 'risk_level')}",
            styles["Normal"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    # =====================================
    # FILE METADATA
    # =====================================

    elements.append(PageBreak())

    elements.append(
        Paragraph(
            "File Metadata",
            styles["Heading1"]
        )
    )

    metadata = result.get(
        "metadata",
        {}
    )

    for key, value in metadata.items():

        elements.append(
            Paragraph(
                f"{key}: {value}",
                styles["Normal"]
            )
        )

    # =====================================
    # OCR
    # =====================================

    elements.append(PageBreak())

    elements.append(
        Paragraph(
            "OCR Analysis",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            safe_get(
                result,
                "ocr_text",
                "text"
            ),
            styles["Normal"]
        )
    )

    # =====================================
    # AI DETECTION
    # =====================================
    elements.append(PageBreak())

    elements.append(
        Paragraph(
            "AI Detection",
            styles["Heading1"]
        )
    )

    fields = [
        ("Authenticity", "authenticity"),
        ("Assessment", "ai_assessment"),
        ("Media Type", "media_type_label"),
        ("Content Type", "content_type"),
        ("Risk Level", "risk_level")
    ]

    for label, key in fields:

        elements.append(
            Paragraph(
                f"{label}: {ai.get(key, 'N/A')}",
                styles["Normal"]
            )
        )

    # =====================================
    # THREAT ENGINE
    # =====================================

    threat = ai.get(
        "threat_engine",
        {}
    )

    elements.append(PageBreak())

    elements.append(
        Paragraph(
            "Threat Assessment",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            f"Overall Threat Score: {threat.get('final_threat_score', 0)}/100",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Risk Category: {threat.get('risk_level', 'Unknown')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Investigator Confidence: {threat.get('confidence', 0)}%",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Final Assessment: {threat.get('verdict', 'Unknown').upper()}",
            styles["Normal"]
        )
    )

    elements.append(
        Spacer(1, 10)
    )

    elements.append(
        Paragraph(
            "Findings",
            styles["Heading2"]
        )
    )

    for reason in threat.get(
        "reasons",
        []
    ):
        elements.append(
            Paragraph(
                f"• {reason}",
                styles["Normal"]
            )
        )

    # =====================================
    # METADATA FORENSICS
    # =====================================

    meta = ai.get(
        "metadata_forensics",
        {}
    )

    elements.append(PageBreak())

    elements.append(
        Paragraph(
            "Metadata Forensics",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            f"Metadata Source: {meta.get('source', 'Unknown')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Confidence: {meta.get('source_confidence', 0)}%",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Integrity Score: {meta.get('integrity_score', 0)}%",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Metadata Status: {meta.get('metadata_status', 'Unknown')}",
            styles["Normal"]
        )
    )

    # =====================================
    # COMPRESSION FORENSICS
    # =====================================
    compression = ai.get(
        "compression_forensics",
        {}
    )
    elements.append(PageBreak())
    elements.append(
        Paragraph(
            "Compression Analysis",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            f"Compression Detected: {'Yes' if compression.get('compression_detected') else 'No'}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Compression Level: {compression.get('compression_level', 'Unknown')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Sharpness: {compression.get('sharpness', 'N/A')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Unique Colors: {compression.get('unique_colors', 'N/A')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Artifact Score: {compression.get('block_artifact_score',0)}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            "Assessment:",
            styles["Heading2"]
        )
    )

    for reason in compression.get(
        "reasons",
        []
    ):
        elements.append(
            Paragraph(
                f"• {reason}",
                styles["Normal"]
            )
        )

    # =====================================
    # REVERSE IMAGE SEARCH
    # =====================================
    reverse_search = ai.get(
        "reverse_image_search",
        {}
    )

    if reverse_search.get(
        "matches_found",
        False
    ):
        elements.append(PageBreak())
        elements.append(
            Paragraph(
                "Reverse Image Search",
                styles["Heading1"]
            )
        )

        for key, value in reverse_search.items():
            elements.append(
                Paragraph(
                    f"{key}: {value}",
                    styles["Normal"]
                )
            )
    
    # =====================================
    # SOURCE ATTRIBUTION
    # =====================================
    source_attr = ai.get(
        "source_attribution",
        {}
    )

    if source_attr.get(
        "source_platform",
        "Unknown"
    ) != "Unknown":
        elements.append(PageBreak())

        elements.append(
            Paragraph(
                "Source Attribution",
                styles["Heading1"]
            )
        )

        elements.append(
            Paragraph(
                f"Platform: {source_attr.get('source_platform', 'Unknown')}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Confidence: {source_attr.get('confidence', 0)}%",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                "Evidence:",
                styles["Heading2"]
            )
        )

        for reason in source_attr.get(
            "reasons",
            []
        ):
            elements.append(
                Paragraph(
                    f"• {reason}",
                    styles["Normal"]
                )
            )

    # =====================================
    # CHAIN OF CUSTODY
    # =====================================

    custody = ai.get(
        "chain_of_custody",
        {}
    )

    elements.append(PageBreak())

    elements.append(
        Paragraph(
            "Chain of Custody",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            f"Evidence ID: "
            f"{custody.get('evidence_id', 'N/A')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Acquisition Time: "
            f"{custody.get('acquisition_time', 'N/A')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"SHA256 Original: "
            f"{custody.get('sha256_original', 'N/A')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Chain Status: "
            f"{custody.get('chain_status', 'N/A')}",
            styles["Normal"]
        )
    )

    integrity_status = (
        "Verified"
        if custody.get(
            "integrity_verified",
            False
        )
        else "Failed"
    )

    elements.append(
        Paragraph(
            f"Integrity Status: {integrity_status}",
            styles["Normal"]
        )
    )

    # =====================================
    # EVIDENCE PACKAGE
    # =====================================

    elements.append(
        PageBreak()
    )

    elements.append(
        Paragraph(
            "Evidence Package",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            f"Evidence ID: "
            f"{custody.get('evidence_id','N/A')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            "All forensic artifacts "
            "have been preserved "
            "inside the evidence package.",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Package Location: "
            f"{result.get('evidence_package','N/A')}",
            styles["Normal"]
        )
    )

    elements.append(
        Spacer(1, 12)
    )

    # =====================================
    # CORRUPTION FORENSICS
    # =====================================
    corruption = ai.get(
        "corruption_forensics",
        {}
    )

    if corruption.get(
        "reasons",
        []
    ) != [
        "Corruption analysis not applicable to graphic design"
    ]:
        elements.append(PageBreak())
        elements.append(
            Paragraph(
                "Corruption Analysis",
                styles["Heading1"]
            )
        )

        elements.append(
            Paragraph(
                f"Corruption Detected: {'Yes' if corruption.get('corruption_detected') else 'No'}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Risk Level: {corruption.get('risk_level','LOW')}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Corruption Score: {corruption.get('corruption_score',0)}",
                styles["Normal"]
            )
        )

        for reason in corruption.get("reasons",[]):
            elements.append(
                Paragraph(
                    f"• {reason}",
                    styles["Normal"]
                )
            )

    # =====================================
    # FACE FORENSICS
    # =====================================
    media_type = ai.get(
        "classification",
        {}
    ).get(
        "media_type",
        "unknown"
    )

    if media_type not in [
        "graphic_design",
        "poster",
        "digital_artwork"
    ]:
        face = ai.get(
            "face_forensics",
            {}
        )
        elements.append(PageBreak())
        elements.append(
            Paragraph(
                "Face Analysis",
                styles["Heading1"]
            )
        )

        elements.append(
            Paragraph(
                f"Face Detected: {face.get('face_detected', False)}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Face Count: {face.get('face_count', 0)}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Synthetic Face Suspected: {face.get('synthetic_face_suspected', False)}",
                styles["Normal"]
            )
        )

    # =====================================
    # ADVANCED FACE CONSISTENCY
    # =====================================

    advanced_face = ai.get(
        "advanced_face_forensics",
        {}
    )

    if media_type not in [
        "graphic_design",
        "poster",
        "digital_artwork"
    ]:
        elements.append(PageBreak())
        elements.append(
            Paragraph(
                "Advanced Face Consistency Analysis",
                styles["Heading1"]
            )
        )

        elements.append(
            Paragraph(
                f"Face Detected: {advanced_face.get('face_detected', False)}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Face Count: {advanced_face.get('face_count', 0)}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Consistency Score: {advanced_face.get('face_consistency_score', 0)}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Synthetic Face Suspected: {advanced_face.get('synthetic_face_suspected', False)}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                "Reasons",
                styles["Heading2"]
            )
        )

        for reason in advanced_face.get(
            "reasons",
            []
        ):
            elements.append(
                Paragraph(
                    f"• {reason}",
                    styles["Normal"]
                )
            )

    # =====================================
    # ELA IMAGE
    # =====================================

    ela_path = safe_get(
        ai,
        "ela_analysis",
        "ela_image"
    )

    if (
        isinstance(ela_path, str)
        and os.path.exists(ela_path)
    ):
        elements.append(PageBreak())

        elements.append(
            Paragraph(
                "ELA Evidence",
                styles["Heading1"]
            )
        )

        try:

            elements.append(
                Image(
                    ela_path,
                    width=300,
                    height=300
                )
            )

        except Exception:
            pass

    elements.append(PageBreak())
    elements.append(
        Paragraph(
            "Investigator Summary",
            styles["Heading1"]
        )
    )

    notes = result.get(
        "investigation_notes",
        []
    )

    for note in notes:
        elements.append(
            Paragraph(
                f"[{note.get('timestamp','N/A')}]",
                styles["Heading3"]
            )
        )

        elements.append(
            Paragraph(
                f"Title: {note.get('title','N/A')}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Note: {note.get('note','N/A')}",
                styles["Normal"]
            )
        )

        elements.append(
            Spacer(1,10)
        )

    summary_items = [
        f"Media Type: {ai.get('media_type_label', 'Unknown')}",
        f"Authenticity: {ai.get('authenticity', 'Unknown')}",
        f"Risk Level: {threat.get('risk_level', 'Unknown')}",
        f"Threat Score: {threat.get('final_threat_score', 0)}"
    ]

    for item in summary_items:
        elements.append(
            Paragraph(
                item,
                styles["Normal"]
            )
        )

    elements.append(
        Spacer(1, 10)
    )

    if threat.get(
        "final_threat_score",
        0
    ) < 30:
        summary = (
            "No significant evidence of AI generation, "
            "metadata tampering, image corruption or "
            "manipulation was found."
        )
    elif threat.get(
        "final_threat_score",
        0
    ) < 60:
        summary = (
            "Some anomalies were detected. "
            "Manual review is recommended."
        )
    else:
        summary = (
            "Multiple forensic indicators suggest "
            "possible manipulation or synthetic content."
        )
    elements.append(
        Paragraph(
            summary,
            styles["Normal"]
        )
    )

    # =====================================
    # FINAL VERDICT
    # =====================================

    elements.append(PageBreak())

    elements.append(
        Paragraph(
            "Final Verdict",
            styles["Heading1"]
        )
    )

    elements.append(
        Paragraph(
            f"Verdict: {threat.get('verdict', 'Unknown')}",
            styles["Title"]
        )
    )

    elements.append(
        Paragraph(
            f"Risk Level: {threat.get('risk_level', 'Unknown')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Confidence: {threat.get('confidence', 0)}%",
            styles["Normal"]
        )
    )

    doc.build(elements)

    return report_path

# from reportlab.platypus import (
#     SimpleDocTemplate,
#     Paragraph,
#     Spacer
# )

# from reportlab.lib.styles import getSampleStyleSheet

# from datetime import datetime


# def generate_pdf_report(data, output_path):

#     doc = SimpleDocTemplate(output_path)

#     styles = getSampleStyleSheet()

#     elements = []

#     title = Paragraph(
#         "SnapRecover Forensic Investigation Report",
#         styles['Title']
#     )

#     elements.append(title)

#     elements.append(Spacer(1, 20))

#     elements.append(
#         Paragraph(
#             f"<b>Filename:</b> {data['filename']}",
#             styles['BodyText']
#         )
#     )

#     elements.append(
#         Paragraph(
#             f"<b>Status:</b> {data['status']}",
#             styles['BodyText']
#         )
#     )

#     elements.append(
#         Paragraph(
#             f"<b>Generated At:</b> {datetime.now()}",
#             styles['BodyText']
#         )
#     )

#     elements.append(Spacer(1, 20))

#     elements.append(
#         Paragraph(
#             "<b>Metadata Analysis</b>",
#             styles['Heading2']
#         )
#     )

#     for key, value in data["metadata"].items():

#         elements.append(
#             Paragraph(
#                 f"<b>{key}</b>: {value}",
#                 styles['BodyText']
#             )
#         )

#     doc.build(elements)