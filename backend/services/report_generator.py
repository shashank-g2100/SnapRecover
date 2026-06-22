# import os
# from datetime import datetime
# from xml.sax.saxutils import escape

# from reportlab.lib import colors
# from reportlab.lib.enums import TA_CENTER
# from reportlab.lib.pagesizes import A4
# from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
# from reportlab.lib.units import inch
# from reportlab.platypus import (
#     SimpleDocTemplate,
#     Paragraph,
#     Spacer,
#     Table,
#     TableStyle,
#     PageBreak,
#     Image,
# )


# # ==========================================================
# # SNAPRECOVER PDF THEME
# # ==========================================================

# DARK = colors.HexColor("#111827")
# DARK_2 = colors.HexColor("#1B2434")
# DARK_3 = colors.HexColor("#202A3B")

# TEAL = colors.HexColor("#12E6CE")
# TEXT = colors.HexColor("#F8FAFC")
# MUTED = colors.HexColor("#AAB4C8")

# YELLOW = colors.HexColor("#F4C542")
# RED = colors.HexColor("#EF4444")
# GREEN = colors.HexColor("#10B981")

# BORDER = colors.HexColor("#D7DEE9")


# # ==========================================================
# # SAFE HELPERS
# # ==========================================================

# def get_value(data, *keys, default="N/A"):
#     """
#     Safely get nested values.

#     Example:
#     get_value(result, "threat_engine", "final_threat_score", default=0)
#     """
#     current = data

#     for key in keys:
#         if not isinstance(current, dict):
#             return default

#         current = current.get(key)

#         if current is None:
#             return default

#     return current


# def yes_no(value):
#     return "Yes" if value else "No"


# def clean_value(value, default="N/A"):
#     if value is None or value == "":
#         return default

#     if isinstance(value, bool):
#         return "Yes" if value else "No"

#     if isinstance(value, list):
#         return ", ".join(str(item) for item in value) if value else default

#     if isinstance(value, dict):
#         return str(value) if value else default

#     return str(value)


# def safe_text(value):
#     return escape(clean_value(value))


# def safe_int(value, default=0):
#     try:
#         return int(float(value))
#     except Exception:
#         return default
    
# def first_available(*values, default=0):
#     """
#     Returns the first value that is not None and not empty.
#     Keeps valid values like 0.
#     """
#     for value in values:
#         if value is not None and value != "":
#             return value
#     return default


# # ==========================================================
# # PDF FOOTER
# # ==========================================================

# def add_page_number(canvas, doc):
#     canvas.saveState()

#     canvas.setStrokeColor(BORDER)
#     canvas.setLineWidth(0.5)

#     canvas.line(
#         0.55 * inch,
#         0.45 * inch,
#         A4[0] - 0.55 * inch,
#         0.45 * inch
#     )

#     canvas.setFont("Helvetica", 8)
#     canvas.setFillColor(colors.HexColor("#6B7280"))

#     canvas.drawString(
#         0.55 * inch,
#         0.27 * inch,
#         "SnapRecover — Digital Forensics Tool | For investigative use only"
#     )

#     canvas.drawRightString(
#         A4[0] - 0.55 * inch,
#         0.27 * inch,
#         f"Page {doc.page}"
#     )

#     canvas.restoreState()


# # ==========================================================
# # TABLE DESIGN
# # ==========================================================

# def make_table(rows, col_widths=None):
#     table = Table(
#         rows,
#         colWidths=col_widths,
#         repeatRows=0,
#         hAlign="LEFT"
#     )

#     table.setStyle(
#         TableStyle(
#             [
#                 ("BACKGROUND", (0, 0), (-1, -1), DARK),
#                 ("TEXTCOLOR", (0, 0), (-1, -1), TEXT),

#                 ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
#                 ("FONTNAME", (1, 0), (-1, -1), "Helvetica"),

#                 ("FONTSIZE", (0, 0), (-1, -1), 9),
#                 ("LEADING", (0, 0), (-1, -1), 13),

#                 ("GRID", (0, 0), (-1, -1), 0.35, DARK_3),

#                 ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),

#                 ("LEFTPADDING", (0, 0), (-1, -1), 10),
#                 ("RIGHTPADDING", (0, 0), (-1, -1), 10),

#                 ("TOPPADDING", (0, 0), (-1, -1), 8),
#                 ("BOTTOMPADDING", (0, 0), (-1, -1), 8),

#                 ("ROWBACKGROUNDS", (0, 0), (-1, -1), [DARK, DARK_2]),
#             ]
#         )
#     )

#     return table


# def section_title(title, styles):
#     return [
#         Spacer(1, 16),
#         Paragraph(
#             f'<font color="#12E6CE">■</font> {escape(title)}',
#             styles["section"]
#         ),
#         Spacer(1, 7),
#     ]


# def bullet_list(items, styles):
#     output = []

#     if not items:
#         output.append(
#             Paragraph(
#                 "• No significant findings recorded.",
#                 styles["body"]
#             )
#         )
#         return output

#     for item in items:
#         output.append(
#             Paragraph(
#                 f"• {safe_text(item)}",
#                 styles["body"]
#             )
#         )

#     return output


# # ==========================================================
# # MAIN REPORT FUNCTION
# # ==========================================================

# def generate_report(result, report_path):

#     folder = os.path.dirname(report_path)

#     if folder:
#         os.makedirs(folder, exist_ok=True)

#     doc = SimpleDocTemplate(
#         report_path,
#         pagesize=A4,
#         rightMargin=0.55 * inch,
#         leftMargin=0.55 * inch,
#         topMargin=0.45 * inch,
#         bottomMargin=0.65 * inch,
#         title="SnapRecover Digital Forensics Report",
#         author="SnapRecover"
#     )

#     styles = getSampleStyleSheet()

#     styles.add(
#         ParagraphStyle(
#             name="brand",
#             parent=styles["Title"],
#             fontName="Helvetica-Bold",
#             fontSize=25,
#             leading=28,
#             alignment=TA_CENTER,
#             textColor=TEAL,
#             spaceAfter=0,
#         )
#     )

#     styles.add(
#         ParagraphStyle(
#             name="subtitle",
#             parent=styles["Normal"],
#             fontName="Helvetica",
#             fontSize=10,
#             leading=13,
#             alignment=TA_CENTER,
#             textColor=colors.HexColor("#6B7280"),
#             spaceAfter=16,
#         )
#     )

#     styles.add(
#         ParagraphStyle(
#             name="section",
#             parent=styles["Heading2"],
#             fontName="Helvetica-Bold",
#             fontSize=14,
#             leading=18,
#             textColor=TEAL,
#             spaceBefore=0,
#             spaceAfter=0,
#         )
#     )

#     styles.add(
#         ParagraphStyle(
#             name="body",
#             parent=styles["Normal"],
#             fontName="Helvetica",
#             fontSize=9.5,
#             leading=14,
#             textColor=DARK,
#             spaceAfter=5,
#         )
#     )

#     styles.add(
#         ParagraphStyle(
#             name="ocr",
#             parent=styles["Normal"],
#             fontName="Courier",
#             fontSize=8.5,
#             leading=12,
#             textColor=TEXT,
#         )
#     )

#     # ==========================================================
#     # GET DATA FROM BACKEND RESULT
#     # ==========================================================

#     ai = result.get("ai_detection", {}) or {}

#     # Important: threat_engine can be in root OR inside ai_detection
#     threat = (
#         result.get("threat_engine", {})
#         or ai.get("threat_engine", {})
#         or {}
#     )

#     metadata = result.get("metadata", {}) or {}

#     ocr = result.get("ocr", {}) or {}

#     custody = (
#         result.get("chain_of_custody", {})
#         or ai.get("chain_of_custody", {})
#         or {}
#     )

#     compression = (
#         result.get("compression_forensics", {})
#         or ai.get("compression_forensics", {})
#         or {}
#     )

#     meta_forensics = (
#         result.get("metadata_forensics", {})
#         or ai.get("metadata_forensics", {})
#         or {}
#     )

#     corruption = (
#         result.get("corruption_forensics", {})
#         or ai.get("corruption_forensics", {})
#         or {}
#     )

#     ela = (
#         result.get("ela_analysis", {})
#         or ai.get("ela_analysis", {})
#         or {}
#     )

#     # ==========================================================
#     # BASIC VALUES
#     # ==========================================================

#     filename = (
#         result.get("filename")
#         or metadata.get("File Name")
#         or metadata.get("file_name")
#         or "Unknown File"
#     )

#     timestamp = (
#         result.get("timestamp")
#         or get_value(result, "case_summary", "opened_at", default=None)
#         or custody.get("acquisition_time")
#         or datetime.now().strftime("%Y-%m-%d %H:%M:%S")
#     )

#     verdict = (
#         result.get("verdict")
#         or threat.get("verdict")
#         or result.get("status")
#         or ai.get("verdict")
#         or "Unknown"
#     )

#     authenticity = (
#         result.get("authenticity")
#         or ai.get("authenticity")
#         or "Unknown"
#     )

#     # Use the exact same final values used by Analyzer UI.
#     # threat_engine is the main source of truth.

#     threat_score = first_available(
#         threat.get("final_threat_score"),
#         threat.get("threat_score"),
#         result.get("threat_score"),
#         default=0
#     )

#     risk_level = first_available(
#         threat.get("risk_level"),
#         result.get("risk_level"),
#         ai.get("risk_level"),
#         default="LOW"
#     )

#     confidence = (
#         result.get("confidence")
#         or threat.get("confidence")
#         or ai.get("confidence")
#         or 0
#     )

#     ocr_text = (
#         result.get("ocr_text")
#         or ocr.get("text")
#         or "No readable text detected."
#     )

#     risk_reasons = (
#         result.get("risk_reasons")
#         or result.get("reasons")
#         or threat.get("reasons")
#         or []
#     )

#     if not isinstance(risk_reasons, list):
#         risk_reasons = [str(risk_reasons)]

#     # ==========================================================
#     # RISK COLOR
#     # ==========================================================

#     risk_color = GREEN

#     if str(risk_level).upper() == "MEDIUM":
#         risk_color = YELLOW

#     elif str(risk_level).upper() == "HIGH":
#         risk_color = RED

#     elements = []

#     # ==========================================================
#     # HEADER
#     # ==========================================================

#     elements.append(
#         Paragraph(
#             '<font color="#111827">Snap</font><font color="#12E6CE">Recover</font>',
#             styles["brand"]
#         )
#     )

#     elements.append(
#         Paragraph(
#             "Image Metadata & Screenshot Forensics Analyzer — Investigation Report",
#             styles["subtitle"]
#         )
#     )

#     # ==========================================================
#     # VERDICT BANNER
#     # ==========================================================

#     banner_left = Paragraph(
#         f'<font color="#FFFFFF"><b>VERDICT: {safe_text(risk_level)} RISK</b><br/>'
#         f'<font size="16"><b>{safe_text(threat_score)}/100</b></font></font>',
#         ParagraphStyle(
#             "banner_left",
#             fontName="Helvetica-Bold",
#             fontSize=13,
#             leading=17,
#             textColor=TEXT,
#         )
#     )

#     banner_middle = Paragraph(
#         f'<font color="#FFFFFF"><b>Threat Score:</b><br/>'
#         f'<font size="16"><b>{safe_text(threat_score)}/100</b></font></font>',
#         ParagraphStyle(
#             "banner_mid",
#             fontName="Helvetica",
#             fontSize=11,
#             leading=17,
#             textColor=TEXT,
#         )
#     )

#     banner_right = Paragraph(
#         f'<font color="#AAB4C8">Status: {safe_text(verdict)}<br/>'
#         f'Authenticity: {safe_text(authenticity)}</font>',
#         ParagraphStyle(
#             "banner_right",
#             fontName="Helvetica",
#             fontSize=10,
#             leading=14,
#             textColor=MUTED,
#         )
#     )

#     banner = Table(
#         [[banner_left, banner_middle, banner_right]],
#         colWidths=[2.15 * inch, 1.55 * inch, 3.0 * inch],
#     )

#     banner.setStyle(
#         TableStyle(
#             [
#                 ("BACKGROUND", (0, 0), (-1, -1), DARK),
#                 ("BOX", (0, 0), (-1, -1), 1.5, risk_color),
#                 ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),

#                 ("LEFTPADDING", (0, 0), (-1, -1), 14),
#                 ("RIGHTPADDING", (0, 0), (-1, -1), 14),

#                 ("TOPPADDING", (0, 0), (-1, -1), 13),
#                 ("BOTTOMPADDING", (0, 0), (-1, -1), 13),
#             ]
#         )
#     )

#     elements.append(banner)

#     # ==========================================================
#     # CASE INFORMATION
#     # ==========================================================

#     elements.extend(section_title("Case Information", styles))

#     case_rows = [
#         ["Filename", safe_text(filename)],
#         ["Analyzed At", safe_text(timestamp)],
#         ["Risk Level", safe_text(risk_level)],
#         ["Threat Score", f"{safe_text(threat_score)} / 100"],
#         ["Verdict", safe_text(verdict)],
#         ["Authenticity", safe_text(authenticity)],
#         ["Investigator Confidence", f"{safe_text(confidence)}%"],
#     ]

#     elements.append(
#         make_table(
#             case_rows,
#             [2.15 * inch, 4.55 * inch]
#         )
#     )

#     # ==========================================================
#     # FILE METADATA
#     # ==========================================================

#     elements.extend(section_title("File Metadata", styles))

#     file_size = (
#         metadata.get("File Size (KB)")
#         or metadata.get("file_size")
#         or metadata.get("file_size_kb")
#         or "N/A"
#     )

#     image_width = (
#         metadata.get("Image Width")
#         or metadata.get("image_width")
#         or metadata.get("width")
#         or "N/A"
#     )

#     image_height = (
#         metadata.get("Image Height")
#         or metadata.get("image_height")
#         or metadata.get("height")
#         or "N/A"
#     )

#     file_type = (
#         metadata.get("File Type")
#         or metadata.get("file_type")
#         or metadata.get("mime_type")
#         or "N/A"
#     )

#     sha256 = (
#         metadata.get("SHA256 Hash")
#         or metadata.get("sha256")
#         or custody.get("sha256_original")
#         or "N/A"
#     )

#     metadata_rows = [
#         ["File Name", safe_text(filename)],
#         ["File Size (KB)", safe_text(file_size)],
#         ["Image Width", safe_text(image_width)],
#         ["Image Height", safe_text(image_height)],
#         [
#             "Color Mode",
#             safe_text(
#                 metadata.get("Color Mode")
#                 or metadata.get("color_mode")
#             )
#         ],
#         [
#             "Image Format",
#             safe_text(
#                 metadata.get("Image Format")
#                 or metadata.get("format")
#             )
#         ],
#         ["File Type", safe_text(file_type)],
#         ["SHA256 Hash", safe_text(sha256)],
#     ]

#     elements.append(
#         make_table(
#             metadata_rows,
#             [2.15 * inch, 4.55 * inch]
#         )
#     )

#     # ==========================================================
#     # THREAT INDICATORS
#     # ==========================================================

#     elements.extend(section_title("Threat Indicators", styles))
#     elements.extend(bullet_list(risk_reasons, styles))

#     # ==========================================================
#     # AI / DEEPFAKE DETECTION
#     # ==========================================================

#     elements.extend(section_title("AI / Deepfake Detection", styles))

#     ai_score = (
#         ai.get("score")
#         or ai.get("ai_score")
#         or ai.get("confidence")
#         or 0
#     )

#     ai_rows = [
#         ["Result", safe_text(ai.get("verdict") or verdict)],
#         ["Authenticity", safe_text(authenticity)],
#         ["AI Score", f"{safe_text(ai_score)} / 100"],
#         [
#             "Media Type",
#             safe_text(
#                 ai.get("media_type_label")
#                 or result.get("media_type_label")
#             )
#         ],
#         [
#             "Content Type",
#             safe_text(
#                 ai.get("content_type")
#                 or result.get("content_type")
#             )
#         ],
#         [
#             "Detected",
#             yes_no(
#                 ai.get(
#                     "detected",
#                     result.get("detected", False)
#                 )
#             )
#         ],
#     ]

#     elements.append(
#         make_table(
#             ai_rows,
#             [2.15 * inch, 4.55 * inch]
#         )
#     )

#     ai_reasons = ai.get("reasons") or result.get("ai_assessment")

#     if isinstance(ai_reasons, str):
#         ai_reasons = [ai_reasons]

#     if ai_reasons:
#         elements.append(Spacer(1, 7))
#         elements.extend(bullet_list(ai_reasons, styles))

#     # ==========================================================
#     # OCR PAGE
#     # ==========================================================

#     elements.append(PageBreak())

#     elements.extend(section_title("OCR Text Extracted", styles))

#     ocr_html = safe_text(ocr_text).replace("\n", "<br/>")

#     ocr_table = Table(
#         [[Paragraph(ocr_html, styles["ocr"])]],
#         colWidths=[6.7 * inch]
#     )

#     ocr_table.setStyle(
#         TableStyle(
#             [
#                 ("BACKGROUND", (0, 0), (-1, -1), DARK),
#                 ("BOX", (0, 0), (-1, -1), 0.6, DARK_3),

#                 ("LEFTPADDING", (0, 0), (-1, -1), 12),
#                 ("RIGHTPADDING", (0, 0), (-1, -1), 12),

#                 ("TOPPADDING", (0, 0), (-1, -1), 12),
#                 ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
#             ]
#         )
#     )

#     elements.append(ocr_table)

#     # ==========================================================
#     # FORENSIC FINDINGS
#     # ==========================================================

#     elements.extend(section_title("Forensic Findings", styles))

#     forensic_rows = [
#         [
#             "Metadata Source",
#             safe_text(meta_forensics.get("source", "Unknown"))
#         ],
#         [
#             "Metadata Integrity",
#             f"{safe_text(meta_forensics.get('integrity_score', 0))}%"
#         ],
#         [
#             "Metadata Status",
#             safe_text(meta_forensics.get("metadata_status", "Unknown"))
#         ],
#         [
#             "Compression Detected",
#             yes_no(compression.get("compression_detected", False))
#         ],
#         [
#             "Compression Level",
#             safe_text(compression.get("compression_level", "Unknown"))
#         ],
#         [
#             "Artifact Score",
#             safe_text(compression.get("block_artifact_score", 0))
#         ],
#         [
#             "ELA Risk",
#             safe_text(ela.get("ela_risk", "N/A"))
#         ],
#         [
#             "ELA Score",
#             safe_text(ela.get("ela_score", "N/A"))
#         ],
#         [
#             "Corruption Detected",
#             yes_no(corruption.get("corruption_detected", False))
#         ],
#         [
#             "Corruption Score",
#             safe_text(corruption.get("corruption_score", 0))
#         ],
#     ]

#     elements.append(
#         make_table(
#             forensic_rows,
#             [2.15 * inch, 4.55 * inch]
#         )
#     )

#     forensic_reasons = []

#     forensic_reasons.extend(
#         meta_forensics.get("reasons", []) or []
#     )

#     forensic_reasons.extend(
#         compression.get("reasons", []) or []
#     )

#     forensic_reasons.extend(
#         corruption.get("reasons", []) or []
#     )

#     if forensic_reasons:
#         elements.append(Spacer(1, 8))
#         elements.extend(bullet_list(forensic_reasons, styles))

#     # ==========================================================
#     # CHAIN OF CUSTODY
#     # ==========================================================

#     elements.extend(section_title("Chain of Custody", styles))

#     custody_rows = [
#         [
#             "Case ID",
#             safe_text(
#                 result.get("case_id")
#                 or get_value(
#                     result,
#                     "case_summary",
#                     "case_id"
#                 )
#             )
#         ],
#         [
#             "Evidence ID",
#             safe_text(custody.get("evidence_id"))
#         ],
#         [
#             "Acquisition Time",
#             safe_text(custody.get("acquisition_time"))
#         ],
#         [
#             "SHA256 Original",
#             safe_text(
#                 custody.get("sha256_original")
#                 or sha256
#             )
#         ],
#         [
#             "Chain Status",
#             safe_text(custody.get("chain_status"))
#         ],
#         [
#             "Integrity Status",
#             "Verified"
#             if custody.get("integrity_verified")
#             else "Not Verified"
#         ],
#         [
#             "Evidence Package",
#             safe_text(
#                 result.get("evidence_package")
#                 or get_value(
#                     result,
#                     "case_repository",
#                     "repository_path"
#                 )
#             )
#         ],
#     ]

#     elements.append(
#         make_table(
#             custody_rows,
#             [2.15 * inch, 4.55 * inch]
#         )
#     )

#     # ==========================================================
#     # OPTIONAL ELA IMAGE
#     # ==========================================================

#     ela_path = ela.get("ela_image")

#     if isinstance(ela_path, str) and os.path.exists(ela_path):

#         elements.append(PageBreak())

#         elements.extend(
#             section_title(
#                 "ELA Evidence Image",
#                 styles
#             )
#         )

#         try:
#             elements.append(
#                 Image(
#                     ela_path,
#                     width=5.8 * inch,
#                     height=4.2 * inch,
#                     kind="proportional"
#                 )
#             )
#         except Exception:
#             pass

#     # ==========================================================
#     # INVESTIGATOR SUMMARY
#     # ==========================================================

#     elements.append(PageBreak())

#     elements.extend(section_title("Investigator Summary", styles))

#     score_number = safe_int(threat_score)

#     if score_number < 30:
#         summary = (
#             "No significant evidence of AI generation, metadata tampering, "
#             "image corruption, or manipulation was identified during the "
#             "automated forensic assessment."
#         )

#     elif score_number < 60:
#         summary = (
#             "Some anomalies were identified during the automated forensic "
#             "assessment. Manual analyst review is recommended before making "
#             "a final investigative decision."
#         )

#     else:
#         summary = (
#             "Multiple forensic indicators suggest possible manipulation, "
#             "synthetic generation, metadata tampering, or image corruption. "
#             "Immediate manual investigation is recommended."
#         )

#     elements.append(
#         Paragraph(
#             safe_text(summary),
#             styles["body"]
#         )
#     )

#     # ==========================================================
#     # FINAL VERDICT
#     # ==========================================================

#     elements.extend(section_title("Final Verdict", styles))

#     final_banner = Table(
#         [[
#             Paragraph(
#                 f'<font color="#FFFFFF"><b>{safe_text(verdict)}</b></font>',
#                 ParagraphStyle(
#                     "final_verdict",
#                     fontName="Helvetica-Bold",
#                     fontSize=20,
#                     alignment=TA_CENTER,
#                     textColor=TEXT,
#                     leading=25,
#                 )
#             )
#         ]],
#         colWidths=[6.7 * inch]
#     )

#     final_banner.setStyle(
#         TableStyle(
#             [
#                 ("BACKGROUND", (0, 0), (-1, -1), DARK),
#                 ("BOX", (0, 0), (-1, -1), 1.5, risk_color),

#                 ("TOPPADDING", (0, 0), (-1, -1), 16),
#                 ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
#             ]
#         )
#     )

#     elements.append(final_banner)

#     elements.append(Spacer(1, 12))

#     final_rows = [
#         ["Risk Level", safe_text(risk_level)],
#         ["Threat Score", f"{safe_text(threat_score)} / 100"],
#         ["Confidence", f"{safe_text(confidence)}%"],
#         ["Authenticity", safe_text(authenticity)],
#     ]

#     elements.append(
#         make_table(
#             final_rows,
#             [2.15 * inch, 4.55 * inch]
#         )
#     )

#     # ==========================================================
#     # BUILD PDF
#     # ==========================================================

#     doc.build(
#         elements,
#         onFirstPage=add_page_number,
#         onLaterPages=add_page_number
#     )

#     return report_path


from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    PageBreak,
    Flowable,
)
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.colors import HexColor
from datetime import datetime
import os


# ==========================================================
# COLORS — matching the professional incident-report example
# ==========================================================
NAVY = HexColor("#111827")
NAVY_2 = HexColor("#1F2937")
NAVY_3 = HexColor("#0F172A")
SLATE = HexColor("#4B5563")
GRAY = HexColor("#6B7280")
LIGHT_GRAY = HexColor("#E5E7EB")
VERY_LIGHT_GRAY = HexColor("#F8FAFC")
GREEN = HexColor("#15803D")
GREEN_LIGHT = HexColor("#DCFCE7")
RED = HexColor("#B91C1C")
RED_LIGHT = HexColor("#FEE2E2")
AMBER = HexColor("#B45309")
AMBER_LIGHT = HexColor("#FEF3C7")
BLUE = HexColor("#1D4ED8")
WHITE = colors.white


# ==========================================================
# SAFE DATA HELPERS
# ==========================================================
def value(data, key, default="N/A"):
    if not isinstance(data, dict):
        return default

    item = data.get(key, default)

    if item is None or item == "":
        return default

    return str(item)


def nested(data, *keys, default="N/A"):
    current = data

    for key in keys:
        if not isinstance(current, dict):
            return default

        current = current.get(key)

    if current is None or current == "":
        return default

    return current


def first_available(*items, default="N/A"):
    for item in items:
        if item is not None and item != "":
            return item
    return default


def bool_text(item):
    return "Yes" if bool(item) else "No"


def score_number(score):
    try:
        return float(score)
    except Exception:
        return 0.0


def score_display(score):
    try:
        score = float(score)

        if score.is_integer():
            return str(int(score))

        return f"{score:.1f}"
    except Exception:
        return "0"


def risk_color(risk_level):
    risk = str(risk_level).upper()

    if risk == "HIGH":
        return RED

    if risk == "MEDIUM":
        return AMBER

    return GREEN


def risk_background(risk_level):
    risk = str(risk_level).upper()

    if risk == "HIGH":
        return RED_LIGHT

    if risk == "MEDIUM":
        return AMBER_LIGHT

    return GREEN_LIGHT


def safe_list(items):
    if isinstance(items, list):
        return [str(item) for item in items if item]

    if isinstance(items, str) and items.strip():
        return [items.strip()]

    return []


def format_timestamp(timestamp):
    if not timestamp or timestamp == "N/A":
        return "N/A"

    if isinstance(timestamp, datetime):
        return timestamp.strftime("%a, %d %b %Y %H:%M:%S")

    return str(timestamp)


# ==========================================================
# PDF FOOTER
# ==========================================================
def footer(canvas, doc):
    canvas.saveState()

    width, _ = A4

    canvas.setStrokeColor(LIGHT_GRAY)
    canvas.setLineWidth(0.5)
    canvas.line(18 * mm, 14 * mm, width - 18 * mm, 14 * mm)

    canvas.setFillColor(GRAY)
    canvas.setFont("Helvetica", 8)

    canvas.drawString(
        18 * mm,
        9 * mm,
        "SnapRecover Pro — Digital Forensics Tool | For investigative use only",
    )

    canvas.drawRightString(
        width - 18 * mm,
        9 * mm,
        f"Page {doc.page}",
    )

    canvas.restoreState()

# ==========================================================
# MAIN REPORT FUNCTION
# ==========================================================
def generate_report(result: dict, output_path: str):
    report_folder = os.path.dirname(output_path)

    if report_folder:
        os.makedirs(report_folder, exist_ok=True)

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=22 * mm,
        title="SnapRecover Pro Incident Intelligence Report",
        author="SnapRecover",
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "TitleStyle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=19,
        leading=23,
        textColor=NAVY,
        spaceAfter=3,
    )

    subtitle_style = ParagraphStyle(
        "SubtitleStyle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11,
        textColor=NAVY_2,
        spaceAfter=5,
        tracking=1.1,
    )

    compliance_style = ParagraphStyle(
        "ComplianceStyle",
        parent=styles["Normal"],
        fontName="Courier",
        fontSize=8,
        leading=10,
        textColor=SLATE,
        spaceAfter=10,
    )

    section_style = ParagraphStyle(
        "SectionStyle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=NAVY_2,
        spaceBefore=12,
        spaceAfter=7,
    )

    label_style = ParagraphStyle(
        "LabelStyle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8,
        leading=10,
        textColor=SLATE,
    )

    value_style = ParagraphStyle(
        "ValueStyle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.5,
        leading=12,
        textColor=NAVY,
    )

    normal_style = ParagraphStyle(
        "NormalStyle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=14,
        textColor=NAVY_2,
    )

    mono_style = ParagraphStyle(
        "MonoStyle",
        parent=styles["Normal"],
        fontName="Courier",
        fontSize=8,
        leading=11,
        textColor=NAVY,
        wordWrap="CJK",
    )

    quote_style = ParagraphStyle(
        "QuoteStyle",
        parent=styles["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=10,
        leading=15,
        textColor=SLATE,
        leftIndent=8,
    )

    red_bullet_style = ParagraphStyle(
        "RedBulletStyle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=14,
        textColor=RED,
        leftIndent=14,
        firstLineIndent=-9,
    )

    story = []

    # ======================================================
    # NORMALIZE BACKEND DATA
    # ======================================================

    # Your upload.py sends the full AI result inside:
    # result["ai_detection"]
    ai_root = result.get("ai_detection", {}) or {}

    # Support both structures:
    # 1. PDF receives full ai_detection object directly
    # 2. PDF receives investigation object with ai_detection nested
    source = ai_root if ai_root else result

    metadata = result.get("metadata", {}) or source.get("metadata", {}) or {}
    ocr = result.get("ocr", {}) or source.get("ocr", {}) or {}
    threat = (
        result.get("threat_engine", {})
        or source.get("threat_engine", {})
        or {}
    )

    custody = (
        result.get("chain_of_custody", {})
        or source.get("chain_of_custody", {})
        or {}
    )

    compression = (
        source.get("compression_forensics", {})
        or result.get("compression_forensics", {})
        or {}
    )

    corruption = (
        source.get("corruption_forensics", {})
        or result.get("corruption_forensics", {})
        or {}
    )

    metadata_forensics = (
        source.get("metadata_forensics", {})
        or result.get("metadata_forensics", {})
        or {}
    )

    classification = (
        source.get("classification", {})
        or result.get("classification", {})
        or {}
    )

    ela_analysis = (
        source.get("ela_analysis", {})
        or result.get("ela_analysis", {})
        or {}
    )

    face_forensics = (
        source.get("face_forensics", {})
        or result.get("face_forensics", {})
        or {}
    )

    advanced_face = (
        source.get("advanced_face_forensics", {})
        or result.get("advanced_face_forensics", {})
        or {}
    )

    # ======================================================
    # ADVANCED FACE FORENSICS VALUES
    # ======================================================
    face_detected = advanced_face.get("face_detected", False)

    face_count = advanced_face.get("face_count", 0)

    face_consistency_score = advanced_face.get(
        "face_consistency_score",
        0
    )

    synthetic_face_suspected = advanced_face.get(
        "synthetic_face_suspected",
        False
    )

    face_reasons = advanced_face.get("reasons", []) or []

    # Display-friendly values
    face_detected_text = "Yes" if face_detected else "No"

    face_count_text = str(face_count) if face_detected else "0"

    synthetic_face_text = (
        "Not Applicable"
        if not face_detected
        else "Yes"
        if synthetic_face_suspected
        else "No"
    )

    face_consistency_text = (
        f"{face_consistency_score} / 40"
        if face_detected
        else "Not Applicable"
    )

    case_repository = (
        source.get("case_repository", {})
        or result.get("case_repository", {})
        or {}
    )

    # AI detection block may be named differently in different files
    ai_detection = (
        source.get("ai_generated_detection", {})
        or result.get("ai_generated_detection", {})
        or {}
    )

    if not ai_detection:
        ai_detection = source.get("classification", {}) or {}

    # ------------------------------------------------------
    # OCR TEXT
    # ------------------------------------------------------
    raw_ocr = (
        result.get("ocr_text")
        or source.get("ocr_text")
        or ocr.get("text")
        or ""
    )

    if isinstance(raw_ocr, dict):
        ocr_text = raw_ocr.get("text") or raw_ocr.get("ocr_text") or ""
    else:
        ocr_text = str(raw_ocr or "")

    # ------------------------------------------------------
    # CASE / CHAIN-OF-CUSTODY VALUES
    # ------------------------------------------------------
    case_id = first_available(
        result.get("case_id"),
        source.get("case_id"),
        custody.get("case_id"),
        custody.get("evidence_id"),
        default="N/A",
    )

    evidence_id = first_available(
        custody.get("evidence_id"),
        custody.get("evidence_filename"),
        result.get("filename"),
        result.get("original_filename"),
        default="N/A",
    )

    acquisition_time = first_available(
        custody.get("acquisition_time"),
        custody.get("acquired_at"),
        result.get("timestamp"),
        default="N/A",
    )

    sha256 = first_available(
        custody.get("sha256_original"),
        custody.get("sha256"),
        metadata.get("sha256"),
        result.get("sha256"),
        default="N/A",
    )

    # ------------------------------------------------------
    # FINAL SCORE / RISK / VERDICT
    # Use the same values as Analyzer and MongoDB
    # ------------------------------------------------------
    threat_score = first_available(
        threat.get("final_threat_score"),
        threat.get("threat_score"),
        result.get("threat_score"),
        default=0,
    )

    risk_level = str(
        first_available(
            threat.get("risk_level"),
            result.get("risk_level"),
            default="LOW",
        )
    ).upper()

    verdict = first_available(
        threat.get("verdict"),
        result.get("status"),
        source.get("verdict"),
        default="Likely Original",
    )

    confidence = first_available(
        threat.get("confidence"),
        classification.get("confidence"),
        ai_detection.get("confidence"),
        default=0,
    )

    # ------------------------------------------------------
    # FILE / MEDIA METADATA
    # ------------------------------------------------------
    # filename = first_available(
    #     result.get("filename"),
    #     result.get("original_filename"),
    #     metadata.get("filename"),
    #     metadata.get("file_name"),
    #     default="Unknown Evidence File",
    # )

    # file_size_bytes = first_available(
    #     custody.get("file_size"),
    #     metadata.get("file_size"),
    #     metadata.get("file_size_bytes"),
    #     result.get("file_size"),
    #     default=None,
    # )

    # if file_size_bytes not in [None, "N/A"]:
    #     try:
    #         file_size = f"{round(float(file_size_bytes) / 1024, 2)}"
    #     except Exception:
    #         file_size = str(file_size_bytes)
    # else:
    #     file_size = "N/A"

    filename = first_available(
        metadata.get("File Name"),
        metadata.get("filename"),
        metadata.get("file_name"),
        result.get("filename"),
        default="Unknown Evidence File",
    )

    file_size = first_available(
        metadata.get("File Size (KB)"),
        metadata.get("file_size"),
        result.get("file_size"),
        default="N/A",
    )

    file_type = first_available(
        metadata.get("File Type"),
        metadata.get("file_type"),
        metadata.get("format"),
        result.get("file_type"),
        default="N/A",
    )

    sha256_hash = first_available(
        metadata.get("SHA256 Hash"),
        metadata.get("sha256_hash"),
        metadata.get("hash"),
        result.get("sha256_hash"),
        default="N/A",
    )

    # Get dimensions from all possible Analyzer response locations
    dimensions = metadata.get("dimensions", {}) or {}
    image_info = metadata.get("image_info", {}) or {}
    technical = metadata.get("technical", {}) or {}

    image_width = first_available(
        metadata.get("Image Width"),      # Your actual backend key
        metadata.get("image_width"),
        metadata.get("width"),
        dimensions.get("width"),
        dimensions.get("image_width"),
        image_info.get("width"),
        technical.get("width"),
        result.get("image_width"),
        result.get("width"),
        default="N/A",
    )

    image_height = first_available(
        metadata.get("Image Height"),     # Your actual backend key
        metadata.get("image_height"),
        metadata.get("height"),
        dimensions.get("height"),
        dimensions.get("image_height"),
        image_info.get("height"),
        technical.get("height"),
        result.get("image_height"),
        result.get("height"),
        default="N/A",
    )

    file_type = first_available(
        metadata.get("file_type"),
        metadata.get("format"),
        result.get("file_type"),
        default="JPEG Image",
    )

    media_type = first_available(
        result.get("media_type_label"),
        classification.get("status"),
        classification.get("media_type"),
        result.get("content_type"),
        default="Unknown",
    )

    media_type = str(media_type).replace("_", " ").title()

    authenticity = first_available(
        result.get("authenticity"),
        threat.get("verdict"),
        classification.get("status"),
        ai_detection.get("verdict"),
        result.get("status"),
        default="Unknown",
    )

    metadata_source = first_available(
        metadata_forensics.get("source"),
        result.get("metadata_status"),
        default="Unknown",
    )

    metadata_integrity = first_available(
        metadata_forensics.get("integrity_score"),
        default=0,
    )

    metadata_status = first_available(
        result.get("metadata_status"),
        metadata_forensics.get("metadata_status"),
        default="Unknown",
    )

    compression_level = first_available(
        compression.get("compression_level"),
        default="Unknown",
    )

    artifact_score = first_available(
        compression.get("block_artifact_score"),
        default=0,
    )

    ela_risk = first_available(
        ela_analysis.get("ela_risk"),
        default="Unknown",
    )

    ela_score = first_available(
        ela_analysis.get("ela_score"),
        default=0,
    )

    corruption_score = first_available(
        corruption.get("corruption_score"),
        default=0,
    )

    evidence_package = first_available(
        case_repository.get("repository_path"),
        result.get("evidence_package"),
        default="N/A",
    )

    reasons = safe_list(
        first_available(
            result.get("risk_reasons"),
            threat.get("reasons"),
            source.get("reasons"),
            default=[],
        )
    )

    if not reasons:
        reasons = [
            "No critical forensic anomalies were identified during automated assessment."
        ]

    # ======================================================
    # HEADER
    # ======================================================
    story.append(Paragraph("SNAPRECOVER PRO INCIDENT INTELLIGENCE", title_style))
    story.append(
        Paragraph(
            "ELECTRONIC RECORD CUSTODY SERVICES  •  CYBER INCIDENT DIVISION",
            subtitle_style,
        )
    )
    story.append(
        Paragraph("ISO/IEC 27037:2012 GUIDELINES COMPLIANT", compliance_style)
    )

    seal_table = Table(
        [[
            Paragraph(
                '<para align="center"><b>DIGITAL DECREE</b><br/>'
                '<font color="#15803D"><b>✓ GRP-SEALED</b></font></para>',
                ParagraphStyle(
                    "Seal",
                    parent=normal_style,
                    alignment=TA_CENTER,
                    fontSize=9,
                    leading=12,
                ),
            )
        ]],
        colWidths=[174 * mm],
    )

    seal_table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.8, HexColor("#94A3B8")),
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    story.append(seal_table)
    story.append(Spacer(1, 9 * mm))

    # divider
    divider = Table([[""]], colWidths=[174 * mm], rowHeights=[1.2])
    divider.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), NAVY)]))
    story.append(divider)
    story.append(Spacer(1, 7 * mm))

    # ======================================================
    # INCIDENT DETAILS
    # ======================================================
    story.append(Paragraph("I. INCIDENT DESCRIPTION &amp; DETAILS", section_style))

    incident_rows = [
        [
            Paragraph("CASE IDENTIFIER:", label_style),
            Paragraph(f"<b>{case_id}</b>", value_style),
        ],
        [
            Paragraph("LEAD EXAMINER:", label_style),
            Paragraph("SnapRecover Automated Forensics Engine", value_style),
        ],
        [
            Paragraph("JURISDICTION CODE:", label_style),
            Paragraph("Digital Evidence &amp; Cyber Incident Division", normal_style),
        ],
        [
            Paragraph("CUSTODY INTAKE TIME:", label_style),
            Paragraph(format_timestamp(acquisition_time), value_style),
        ],
    ]

    incident_table = Table(
        incident_rows,
        colWidths=[65 * mm, 109 * mm],
        hAlign="LEFT",
    )

    incident_table.setStyle(
        TableStyle(
            [
                ("LINEBELOW", (0, 0), (-1, 0), 0.5, LIGHT_GRAY),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("ALIGN", (1, 0), (1, -1), "RIGHT"),
            ]
        )
    )

    story.append(incident_table)
    story.append(Spacer(1, 4 * mm))

    summary_text = (
        f'"Automated forensic investigation of submitted digital evidence '
        f'file <b>{filename}</b>. The evidence was processed for metadata, '
        f'compression, OCR, AI-generation indicators, corruption patterns, '
        f'and chain-of-custody integrity."'
    )

    context_table = Table(
        [[Paragraph("CASE CONTEXT SUMMARY:", label_style)],
         [Paragraph(summary_text, quote_style)]],
        colWidths=[174 * mm],
    )

    context_table.setStyle(
        TableStyle(
            [
                ("LINEBEFORE", (0, 1), (0, 1), 2, HexColor("#CBD5E1")),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )

    story.append(context_table)
    story.append(Spacer(1, 8 * mm))

    # ======================================================
    # EVIDENCE IDENTIFIERS
    # ======================================================
    story.append(
        Paragraph(
            "II. EVIDENCE IDENTIFIERS &amp; SECURE SEALS",
            section_style
        )
    )

    story.append(Spacer(1, 4 * mm))


    # ======================================================
    # EVIDENCE HEADER
    # ======================================================
    evidence_header = Table(
        [[
            Paragraph(
                f"""
                <b>01. SEALED EVIDENCE FILE</b><br/>
                <font color="#1D4ED8"><b>{filename}</b></font>
                """,
                value_style,
            ),
            Paragraph(
                "PRIMARY<br/>EVIDENCE",
                ParagraphStyle(
                    "EvidenceTag",
                    parent=label_style,
                    alignment=TA_CENTER,
                    fontSize=7.5,
                    leading=10,
                    textColor=NAVY_2,
                ),
            ),
        ]],
        colWidths=[120 * mm, 44 * mm],   # Total = 164 mm
    )

    evidence_header.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), VERY_LIGHT_GRAY),
                ("BOX", (1, 0), (1, 0), 0.8, SLATE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (1, 0), (1, 0), "CENTER"),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )


    # ======================================================
    # EVIDENCE DETAILS
    # ======================================================
    hash_style = ParagraphStyle(
        "HashStyle",
        parent=mono_style,
        fontSize=7.5,
        leading=11,
        textColor=NAVY_2,
        wordWrap="CJK",
    )

    detail_label_style = ParagraphStyle(
        "DetailLabelStyle",
        parent=label_style,
        fontSize=7.5,
        leading=10,
        textColor=SLATE,
    )

    detail_value_style = ParagraphStyle(
        "DetailValueStyle",
        parent=normal_style,
        fontSize=9,
        leading=13,
        textColor=NAVY,
    )

    evidence_details = [
        [
            Paragraph("SHA-256 HASH SEAL", detail_label_style),
            Paragraph(str(sha256), hash_style),
        ],
        [
            Paragraph("EVIDENCE IDENTIFIER", detail_label_style),
            Paragraph(str(evidence_id), hash_style),
        ],
        [
            Paragraph("FILE SIZE &amp; FORMAT", detail_label_style),
            Paragraph(
                f"<b>{file_size} KB</b><br/>{file_type}",
                detail_value_style,
            ),
        ],
        [
            Paragraph("TRUST COEFFICIENT", detail_label_style),
            Paragraph(
                f"<b>{score_display(threat_score)} / 100</b>",
                detail_value_style,
            ),
        ],
    ]

    evidence_details_table = Table(
        evidence_details,
        colWidths=[55 * mm, 109 * mm],   # Total = 164 mm
    )

    evidence_details_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.35, LIGHT_GRAY),
                ("BACKGROUND", (0, 0), (0, -1), VERY_LIGHT_GRAY),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )


    # ======================================================
    # FORENSIC DIAGNOSTICS
    # ======================================================
    diagnostic_title_style = ParagraphStyle(
        "DiagnosticTitle",
        parent=label_style,
        fontSize=8,
        leading=11,
        textColor=NAVY_2,
    )

    diagnostic_quote_style = ParagraphStyle(
        "DiagnosticQuote",
        parent=quote_style,
        fontSize=9,
        leading=14,
        leftIndent=4,
        textColor=NAVY,
    )

    diagnostic_rows = [
        [
            Paragraph(
                "FORENSIC DIAGNOSTICS SUMMARY",
                diagnostic_title_style,
            )
        ],
        [
            Paragraph(
                f"Threat index evaluates to <b>{risk_level} Risk</b> intensity levels.",
                diagnostic_quote_style,
            )
        ],
        [Spacer(1, 2.5 * mm)],
        [
            Paragraph(
                "FLAGGED ANOMALIES",
                diagnostic_title_style,
            )
        ],
    ]

    for reason in reasons[:8]:
        diagnostic_rows.append(
            [
                Paragraph(
                    f"• &nbsp;{reason}",
                    red_bullet_style
                    if risk_level in ["HIGH", "MEDIUM"]
                    else normal_style,
                )
            ]
        )

    diagnostics_table = Table(
        diagnostic_rows,
        colWidths=[164 * mm],
    )

    diagnostics_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("LINEABOVE", (0, 0), (-1, 0), 0.6, LIGHT_GRAY),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )


    # ======================================================
    # FINAL EVIDENCE CARD
    # ======================================================
    evidence_card = Table(
        [
            [evidence_header],
            [evidence_details_table],
            [diagnostics_table],
        ],
        colWidths=[174 * mm],
    )

    evidence_card.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.8, LIGHT_GRAY),
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),

                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),

                ("TOPPADDING", (0, 0), (-1, 0), 5 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 4 * mm),

                ("TOPPADDING", (0, 1), (-1, 1), 3 * mm),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 4 * mm),

                ("TOPPADDING", (0, 2), (-1, 2), 4 * mm),
                ("BOTTOMPADDING", (0, 2), (-1, 2), 5 * mm),
            ]
        )
    )

    story.append(evidence_card)
    story.append(Spacer(1, 7 * mm))

    # ======================================================
    # PAGE 2 — FORENSIC ANALYSIS
    # ======================================================
    story.append(Paragraph("III. FORENSIC ANALYSIS RESULTS", section_style))

    analysis_rows = [
        ["VERDICT", verdict],
        ["RISK LEVEL", risk_level],
        ["THREAT SCORE", f"{score_display(threat_score)} / 100"],
        ["INVESTIGATOR CONFIDENCE", f"{confidence}%"],
        ["AUTHENTICITY ASSESSMENT", authenticity],
        ["AI GENERATED DETECTED", bool_text(ai_detection.get("detected", False))],
        ["AI DETECTION CONFIDENCE", f"{first_available(ai_detection.get('confidence'), default=0)}%"],
        ["MEDIA TYPE", media_type],
        [
            "CONTENT TYPE",
            first_available(
                result.get("content_type"),
                source.get("content_type"),
                classification.get("content_type"),
                default="Unknown",
            ),
        ],
        ["IMAGE DIMENSIONS", f"{image_width} × {image_height} px"],
    ]

    analysis_table_data = []

    for label, data in analysis_rows:
        analysis_table_data.append(
            [
                Paragraph(f"<b>{label}</b>", label_style),
                Paragraph(str(data), value_style),
            ]
        )

    analysis_table = Table(
        analysis_table_data,
        colWidths=[60 * mm, 114 * mm],
    )

    analysis_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), VERY_LIGHT_GRAY),
                ("GRID", (0, 0), (-1, -1), 0.4, LIGHT_GRAY),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    story.append(analysis_table)
    story.append(Spacer(1, 7 * mm))

    # ======================================================
    # ADVANCED FACE FORENSICS
    # ======================================================
    story.append(
        Paragraph(
            "IV. ADVANCED FACE FORENSICS",
            section_style
        )
    )

    face_rows = [
        ["FACE DETECTED", face_detected_text],
        ["FACE COUNT", face_count_text],
        ["FACE CONSISTENCY SCORE", face_consistency_text],
        ["SYNTHETIC FACE SUSPECTED", synthetic_face_text],
    ]

    face_table_data = []

    for label, data in face_rows:
        face_table_data.append(
            [
                Paragraph(f"<b>{label}</b>", label_style),
                Paragraph(str(data), value_style),
            ]
        )

    face_table = Table(
        face_table_data,
        colWidths=[60 * mm, 114 * mm],
    )

    face_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), VERY_LIGHT_GRAY),
                ("GRID", (0, 0), (-1, -1), 0.4, LIGHT_GRAY),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    story.append(face_table)

    if face_detected and face_reasons:
        story.append(Spacer(1, 3 * mm))

        story.append(
            Paragraph(
                "<b>FACE ANALYSIS OBSERVATIONS</b>",
                label_style
            )
        )

        for reason in face_reasons:
            story.append(
                Paragraph(
                    f"• &nbsp;{reason}",
                    red_bullet_style
                    if synthetic_face_suspected
                    else normal_style,
                )
            )

    story.append(Spacer(1, 7 * mm))

    # ======================================================
    # V. EXTRACTED OCR TRANSCRIPTION
    # ======================================================
    story.append(
        Paragraph(
            "V. EXTRACTED OCR TRANSCRIPTION",
            section_style
        )
    )

    story.append(
        Spacer(
            1,
            7 * mm
        )
    )

    ocr_display_text = str(ocr_text).strip()

    if not ocr_display_text or ocr_display_text == "N/A":
        ocr_display_text = "No readable text was detected in this evidence."

    ocr_display_text = (
        ocr_display_text
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\n", "<br/>")
    )

    # Important:
    # Do NOT use Table or KeepTogether here.
    # OCR paragraph can automatically split across multiple pages
    ocr_text_style = ParagraphStyle(
        "OCRTextStyle",
        parent=styles["Normal"],
        fontName="Courier",
        fontSize=8,
        leading=10,
        textColor=WHITE,
        backColor=NAVY_3,
        borderColor=NAVY_2,
        borderWidth=0.8,
        borderPadding=10,
        borderRadius=6,
        wordWrap="CJK",
    )

    story.append(
        Paragraph(
            ocr_display_text,
            ocr_text_style
        )
    )

    story.append(
        Spacer(
            1,
            7 * mm
        )
    )

    # ======================================================
    # CHAIN OF CUSTODY
    # ======================================================
    story.append(Paragraph("VI. CHAIN OF CUSTODY &amp; INTEGRITY", section_style))

    chain_rows = [
        ["CASE ID", case_id],
        ["EVIDENCE ID", evidence_id],
        ["ACQUISITION TIME", format_timestamp(acquisition_time)],
        ["SHA256 ORIGINAL", sha256],
        ["CHAIN STATUS", value(custody, "chain_status")],
        ["INTEGRITY STATUS", "Verified" if custody.get("integrity_verified") else "Not Verified"],
        ["EVIDENCE PACKAGE", evidence_package],
    ]

    chain_table_data = []

    for label, data in chain_rows:
        style = mono_style if "SHA" in label or "PACKAGE" in label else normal_style

        chain_table_data.append(
            [
                Paragraph(f"<b>{label}</b>", label_style),
                Paragraph(str(data), style),
            ]
        )

    chain_table = Table(
        chain_table_data,
        colWidths=[60 * mm, 114 * mm],
    )

    chain_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), VERY_LIGHT_GRAY),
                ("GRID", (0, 0), (-1, -1), 0.4, LIGHT_GRAY),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )

    story.append(chain_table)

    # ======================================================
    # FINAL VERDICT PAGE
    # ======================================================
    story.append(Paragraph("VII. INVESTIGATOR SUMMARY", section_style))

    if risk_level == "HIGH":
        summary = (
            "High-risk anomalies were identified during automated forensic analysis. "
            "Manual analyst review is strongly recommended before using this evidence "
            "for investigative, legal, or compliance decisions."
        )
    elif risk_level == "MEDIUM":
        summary = (
            "Some anomalies were identified during the automated forensic assessment. "
            "Manual analyst review is recommended before making a final investigative decision."
        )
    else:
        summary = (
            "No high-risk forensic anomalies were identified during automated analysis. "
            "The evidence should still be reviewed in the context of the complete investigation."
        )

    story.append(Paragraph(summary, normal_style))
    story.append(Spacer(1, 9 * mm))

    story.append(Paragraph("VIII. FINAL VERDICT", section_style))

    verdict_box = Table(
        [[Paragraph(
            str(verdict),
            ParagraphStyle(
                "Verdict",
                parent=styles["Normal"],
                alignment=TA_CENTER,
                fontName="Helvetica-Bold",
                fontSize=22,
                leading=28,
                textColor=WHITE,
            ),
        )]],
        colWidths=[174 * mm],
        rowHeights=[29 * mm],
    )

    verdict_box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NAVY),
                ("BOX", (0, 0), (-1, -1), 1.2, risk_color(risk_level)),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )

    story.append(verdict_box)
    story.append(Spacer(1, 5 * mm))

    final_rows = [
        ["RISK LEVEL", risk_level],
        ["THREAT SCORE", f"{score_display(threat_score)} / 100"],
        ["CONFIDENCE", f"{confidence}%"],
        ["AUTHENTICITY", authenticity],
        ["EVIDENCE INTEGRITY", "Verified" if custody.get("integrity_verified") else "Not Verified"],
    ]

    final_table_data = []

    for label, data in final_rows:
        final_table_data.append(
            [
                Paragraph(f"<b>{label}</b>", label_style),
                Paragraph(str(data), value_style),
            ]
        )

    final_table = Table(
        final_table_data,
        colWidths=[60 * mm, 114 * mm],
    )

    final_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), VERY_LIGHT_GRAY),
                ("GRID", (0, 0), (-1, -1), 0.4, LIGHT_GRAY),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    story.append(final_table)

    # ======================================================
    # BUILD PDF
    # ======================================================
    doc.build(
        story,
        onFirstPage=footer,
        onLaterPages=footer,
    )

    return output_path