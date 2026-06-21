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