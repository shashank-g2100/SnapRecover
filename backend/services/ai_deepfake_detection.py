import os

import cv2
import numpy as np

from PIL import Image
from PIL.ExifTags import TAGS
import pytesseract

from services.utils import (
    sanitize_for_mongo
)
from services.classify_image_type import (
    classify_image_type
)
from services.ai_art_detector import detect_ai_artifacts
from services.ai_metadata_detector import (
    detect_ai_metadata
)
from services.ai_screenshot_detector import detect_ai_screenshot
from services.sensor_noise_analysis import analyze_sensor_noise
from services.screenshot_forensics.source_attribution import (
    attribute_source
)
from services.screenshot_forensics.detect_ui_elements import (
    detect_ui_elements
)
from services.screenshot_forensics.detect_editing_signs import (
    detect_editing_signs
)

from services.ai_generated_detector import (
    detect_ai_generated as detect_ai_generated_model
)

from services.extract_metadata import extract_metadata
from services.metadata_analysis import analyze_metadata
from services.ela_analysis import generate_ela_image

from services.face_forensics import analyze_faces

from services.compression_forensics import (
    analyze_compression
)

from services.corruption_forensics import (
    analyze_corruption
)

from services.threat_engine import (
    calculate_threat_score
)

from services.report_generator import generate_report

from services.reverse_image_search import (
    reverse_image_search
)

from services.source_attribution import (
    analyze_source
)

from services.advanced_face_forensics import (
    analyze_face_consistency
)

from services.chain_of_custody import (
    generate_chain_of_custody,
    create_evidence_package
)

from services.case_management import (
    generate_case_id,
    create_case,
    initialize_case_summary,
    save_case_summary,
    case_exists,
    get_case_evidence_count
)

from services.case_repository import (
    create_case_repository,
    create_evidence_folder,
    store_original_image,
    store_ela_image,
    store_report,
    store_evidence_json
)

from services.timeline_manager import (
    add_timeline_event,
    add_audit_log
)

from services.case_summary import (
    generate_case_summary,
    save_case_summary as save_case_report
)

from services.investigation_notes import (
    initialize_notes,
    add_note,
    get_notes
)

from services.evidence_registry import (
    register_evidence
)

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)

def detect_ai_generated(image_path):
    reasons = []
    score = 0
    authenticity = "Unknown"
    message = "Unknown Media"
    content_type = "Unknown Media"

    metadata_available = False
    metadata_status = "Unknown"

    face_detected = False
    face_count = 0
    face_status = "Unknown"

    classification_confidence = 0
    image_type = "unknown"

    # =====================================================
    # MEDIA TYPE DETECTION
    # =====================================================
    raw_classification = classify_image_type(image_path)

    if isinstance(raw_classification, dict):
        classification = raw_classification
    else:
        classification = {
            "media_type": str(raw_classification or "unknown"),
            "confidence": 0,
        }

    image_type = classification.get("media_type", "unknown")
    classification_confidence = classification.get("confidence", 0)

    # =====================================
    # CASE MANAGEMENT
    # =====================================
    case_id = generate_case_id()
    if not case_exists(case_id):
        create_case(
            case_id
        )
        create_case_repository(
            case_id
        )

    case_summary = (
        initialize_case_summary(
            case_id
        )
    )

    initialize_notes(
        case_id
    )

    add_timeline_event(
        case_id,
        "Case Created"
    )

    add_audit_log(
        case_id,
        "CREATE_CASE"
    )

    # =====================================
    # MEDIA TYPE BYPASS RULES
    # =====================================
    skip_face_forensics = False
    skip_ai_image_detection = False
    skip_corruption_analysis = False

    if image_type in [
        "web_ui",
        "screenshot",
        "document_scan",
        "presentation_slide"
    ]:
        skip_face_forensics = True
        skip_ai_image_detection = True
        skip_corruption_analysis = True

    # =====================================
    # MEDIA STATUS
    # =====================================
    if image_type == "graphic_design":
        status = (
            "Designed Digital Media"
        )

    elif image_type == "digital_artwork":
        status = (
            "Digital Artwork"
        )

    elif image_type in [
            "screenshot",
            "web_ui",
            "mobile_app"
    ]:
        status = (
            "Screenshot / User Interface"
        )

    elif image_type == "document_scan":
        status = (
            "Document Scan"
        )

    elif image_type == "camera_photo":
        status = (
            "Camera Photograph"
        )

    elif image_type == "ai_generated":
        status = (
            "AI Generated Content"
        )

    else:
        status = (
            "Unknown Media Type"
        )

    classification_confidence = classification.get("confidence", 0)

    # =====================================================
    # PHASE 3 METADATA FORENSICS
    # =====================================================
    metadata = extract_metadata(
        image_path
    )

    metadata_forensics = analyze_metadata(
        metadata,
        image_type
    )

    add_timeline_event(
        case_id,
        "Metadata Analysis Completed"
    )
    add_audit_log(
        case_id,
        "METADATA_ANALYSIS"
    )

    reasons.extend(
        metadata_forensics["reasons"]
    )

    reverse_search = reverse_image_search(
        image_path
    )

    source_attribution = analyze_source(
        metadata
    )

    custody_result = (
        generate_chain_of_custody(
            image_path
        )
    )
    filename = os.path.basename(
        image_path
    )

    register_evidence(
        case_id,
        custody_result[
            "evidence_id"
        ],
        filename
    )

    evidence_folder = (
        create_evidence_folder(
            case_id,
            custody_result[
                "evidence_id"
            ]
        )
    )

    add_timeline_event(
        case_id,
        "Image Uploaded",
        image_path
    )
    add_audit_log(
        case_id,
        "UPLOAD_IMAGE"
    )

    # =====================================================
    # COMPRESSION FORENSICS
    # =====================================================
    compression_result = (
        analyze_compression(
            image_path
        )
    )
    add_timeline_event(
        case_id,
        "Compression Analysis Completed"
    )
    add_audit_log(
        case_id,
        "COMPRESSION_ANALYSIS"
    )

    reasons.extend(
        compression_result.get(
            "reasons",
            []
        )
    )

    # =====================================================
    # CORRUPTION FORENSICS
    # =====================================================
    if skip_corruption_analysis:    
        corruption_analysis = {
            "corruption_detected": False,
            "corruption_score": 0,
            "risk_level": "LOW",
            "artifact_types": [],
            "reasons": [
                "Corruption analysis not applicable"
            ]
        }

    else:
        corruption_analysis = analyze_corruption(
            image_path,
            image_type
        )
    add_timeline_event(
        case_id,
        "Corruption Analysis Completed"
    )
    add_audit_log(
        case_id,
        "CORRUPTION_ANALYSIS"
    )

    reasons.extend(
        corruption_analysis.get(
            "reasons",
            []
        )
    )

    source_data = {
        "platform": "Unknown",
        "screenshot_type": "Unknown",
        "confidence": 0
    }

    ui_elements = []
    editing_findings = []

    if image_type in [
        "screenshot",
        "web_ui",
        "mobile_app",
        "document_scan"
    ]:
        source_data = attribute_source(
            image_path
        )

        ui_elements = detect_ui_elements(
            image_path
        )

        editing_findings = detect_editing_signs(
            image_path
        )

    if skip_ai_image_detection:    
        ai_result = {
            "detected": False,
            "confidence": 0,
            "verdict": "Not Applicable",
            "reasons": [
                "AI image analysis not applicable"
            ]
        }

    else:
        ai_result = detect_ai_generated_model(
            image_path,
            image_type
        )

    # =====================================================
    # ELA ANALYSIS
    # =====================================================
    try:
        ela_result = generate_ela_image(
            image_path
        )

    except Exception:
        ela_result = {
            "ela_image": None,
            "ela_score": 0,
            "reasons": []
        }

    add_timeline_event(
        case_id,
        "ELA Analysis Completed"
    )
    add_audit_log(
        case_id,
        "ELA_ANALYSIS"
    )

    ela_image = ela_result[
        "ela_image"
    ]
    reasons.extend(
        ela_result[
            "reasons"
        ]
    )

    face_forensics = {
        "face_detected": False,
        "face_count": 0,
        "forensic_score": 0,
        "synthetic_face_suspected": False,
        "reasons": []
    }
    
    if skip_ai_image_detection:    
        metadata_result = {
            "detected": False,
            "source": "Not Applicable",
            "confidence": 0,
            "reasons": []
        }

    else:
        metadata_result = detect_ai_metadata(
            image_path
        )
    ai_metadata_detected = (
        metadata_result["detected"]
    )
    metadata_reasons = (
        metadata_result["reasons"]
    )

    add_note(
        case_id,
        "Metadata Analysis",
        ", ".join(
            metadata_reasons
        )
        if metadata_reasons
        else
        "No metadata findings"
    )
    ai_metadata_source = (
        metadata_result["source"]
    )
    ai_metadata_confidence = (
        metadata_result["confidence"]
    )
        
    if skip_ai_image_detection:    
        is_ai_art = False
        ai_reasons = []

    else:
        is_ai_art, ai_reasons = detect_ai_artifacts(
            image_path
        )

    if skip_ai_image_detection:
        ai_screenshot_detected = False
        screenshot_reasons = []
    else:
        ai_screenshot_detected, screenshot_reasons = (
            detect_ai_screenshot(
                image_path
            )
        )

    sensor_noise_valid, noise_reasons = (
        analyze_sensor_noise(
            image_path
        )
    )

    try:
        image = cv2.imread(image_path)
        if image is None:
            return {
                "detected": True,
                "score": 100,
                "risk_level": "HIGH",
                "message": "Corrupted or Invalid Image",
                "authenticity": "Invalid",
                "media_type": "unknown",
                "media_type_label": "Corrupted File",
                "content_type": "Invalid Media",
                "reasons": [
                    "Invalid image structure"
                ]
            }
        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )
        height, width, _ = image.shape

        # =====================================================
        # OCR ANALYSIS
        # =====================================================
        ocr_text = pytesseract.image_to_string(
            gray
        )
        text_length = len(
            ocr_text.strip()
        )
        add_timeline_event(
            case_id,
            "OCR Analysis Completed"
        )

        add_audit_log(
            case_id,
            "OCR_ANALYSIS"
        )

        text_lower = ocr_text.lower()
        gps_overlay_detected = False
        if (
            "lat" in text_lower
            and "long" in text_lower
        ):
            gps_overlay_detected = True
            reasons.append(
                "GPS camera overlay detected"
            )

        # =====================================================
        # DIGITAL ARTIFACT DETECTION
        # =====================================================
        horizontal_band_score = 0
        for y in range(1, gray.shape[0]):
            row_diff = np.mean(
                np.abs(
                    gray[y].astype(np.float32)
                    - gray[y - 1].astype(np.float32)
                )
            )
            if row_diff > 40:
                horizontal_band_score += 1
        band_ratio = horizontal_band_score / gray.shape[0]
        line_count = 0
        for y in range(2, gray.shape[0]):
            diff = np.mean(
                np.abs(
                    gray[y].astype(np.float32)
                    - gray[y - 1].astype(np.float32)
                )
            )
            if diff > 70:
                line_count += 1

        # approximate overall glitchiness by mean row differences normalized
        try:
            mean_row_diff = np.mean(
                np.abs(np.diff(gray.astype(np.float32), axis=0))
            )
            glitch_ratio = mean_row_diff / 255.0
        except Exception:
            glitch_ratio = 0.0

        if image_type == "camera_photo":
            if line_count > 3:
                score += 25
                reasons.append(
                    "Severe horizontal signal corruption detected"
                )

            if band_ratio > 0.02:
                score += 35
                reasons.append(
                    "Horizontal corruption artifacts detected"
                )

            if glitch_ratio > 0.03:
                score += 25
                reasons.append(
                    "Abnormal digital artifact patterns detected"
                )

        # =====================================================
        # OVEREXPOSURE DETECTION
        # =====================================================
        overexposed_pixels = np.sum(gray > 245)
        overexposed_ratio = (
            overexposed_pixels / gray.size
        )
        if overexposed_ratio > 0.10:
            score += 15
            reasons.append(
                "Large overexposed regions detected"
            )
        elif overexposed_ratio > 0.05:
            score += 8
            reasons.append(
                "Moderate overexposed regions detected"
            )

        # =====================================================
        # JPEG BLOCK ARTIFACT DETECTION
        # =====================================================
        block_diff = 0
        for y in range(8, gray.shape[0], 8):
            block_diff += np.mean(
                np.abs(
                    gray[y, :].astype(np.float32)
                    - gray[y - 1, :].astype(np.float32)
                )
            )
        block_score = block_diff / max(
            1,
            gray.shape[0] // 8
        )
        if (
            image_type == "camera_photo"
            and block_score > 8
        ):
            score += 20
            reasons.append(
                "Strong JPEG compression artifacts detected"
            )

        # =====================================================
        # BASE MEDIA TYPE LOGIC
        # =====================================================
        if image_type == "graphic_design":
            image_type = "graphic_design"
            content_type = (
                "Designed Digital Media"
            )

        elif image_type == "poster":
            content_type = (
                "Poster Media"
            )
            
        elif image_type == "web_ui":
            reasons.append(
                "Dashboard interface detected"
            )
            content_type = (
                "Web Application Interface"
            )

        elif image_type == "screenshot":
            reasons.append(
                "Screenshot captured from desktop"
            )
            content_type = (
                "Screen Captured Media"
            )
            
        elif image_type == "digital_artwork":
            content_type = "Digital Artwork"

        elif image_type == "camera_photo":
            content_type = "Authentic Camera Media"

        else:
            content_type = "Unknown Media"

        # =====================================================
        # 1. FACE DETECTION
        # =====================================================
        face_detected = False
        face_count = 0
        face_status = "Not Applicable"

        gray_face = cv2.equalizeHist(
            gray
        )

        if image_type == "camera_photo":

            faces = face_cascade.detectMultiScale(
                gray_face,
                scaleFactor=1.1,
                minNeighbors=5,
                minSize=(30, 30)
            )

            valid_faces = []
            for (x, y, w, h) in faces:
                area = w * h
                if area > 2500:
                    valid_faces.append(
                        (x, y, w, h)
                    )

            face_count = len(
                valid_faces
            )

            # face_count = len(faces)

            # Retry with relaxed settings
            if face_count == 0:

                faces = face_cascade.detectMultiScale(
                    gray_face,
                    scaleFactor=1.05,
                    minNeighbors=3,
                    minSize=(20, 20)
                )

                valid_faces = []
                for (x, y, w, h) in faces:
                    area = w * h
                    if area > 2500:
                        valid_faces.append(
                            (x, y, w, h)
                        )
                face_count = len(
                    valid_faces
                )

            face_detected = (
                face_count > 0
            )

            print(
                f"Faces detected: {face_count}"
            )

            face_status = (
                "Detected"
                if face_detected
                else "Not Detected"
            )

            if not face_detected:
                reasons.append(
                    "No human face detected (non-human subject)"
                )

            if skip_face_forensics:            
                face_forensics = {
                    "face_detected": False,
                    "face_count": 0,
                    "forensic_score": 0,
                    "synthetic_face_suspected": False,
                    "reasons": [
                        "Face analysis not applicable"
                    ]
                }
            else:
                face_forensics = analyze_faces(
                    image_path,
                    face_detected,
                    face_count
                )

            face_forensics[
                "face_detected"
            ] = face_detected

            face_forensics[
                "face_count"
            ] = face_count

        elif image_type in [
            "graphic_design",
            "poster",
            "web_ui",
            "screenshot",
            "digital_artwork"
        ]:

            face_status = "Not Applicable"

            if image_type != "web_ui":
                reasons.append(
                    "Designed digital content detected"
                )

        if skip_face_forensics:
            advanced_face = {
                "face_detected": False,
                "face_count": 0,
                "consistency_score": 0,
                "synthetic_face_suspected": False,
                "reasons": [
                    "Face analysis not applicable"
                ]
            }

        else:
            advanced_face = analyze_face_consistency(
                image_path
            )

        # =====================================================
        # 2. SHARPNESS ANALYSIS
        # =====================================================
        variance = cv2.Laplacian(
            gray,
            cv2.CV_64F
        ).var()
        if image_type == "camera_photo":
            if variance < 20:
                score += 10
                reasons.append(
                    "Extremely smooth textures detected"
                )

        # =====================================================
        # 3. BRIGHTNESS ANALYSIS
        # =====================================================
        brightness = np.mean(gray)
        if image_type == "camera_photo":
            if brightness > 210 or brightness < 35:
                score += 10
                reasons.append(
                    "Unnatural brightness levels"
                )

        # =====================================================
        # 4. EXIF METADATA CHECK
        # =====================================================
        metadata_available = False
        metadata_status = "Unknown"
        try:
            pil_image = Image.open(image_path)
            exif_data = pil_image.getexif()
            exif = {
                TAGS.get(tag): value
                for tag, value in exif_data.items()
            }
            camera = exif.get("Model")
            iso = exif.get("ISOSpeedRatings")
            filename = os.path.basename(
                image_path
            ).lower()
            metadata_available = len(exif) > 0
            metadata_status = (
                "Available"
                if metadata_available
                else "Unavailable"
            )
            if image_type == "camera_photo":
                if not camera:
                    shared_platform = any(
                        x in filename
                        for x in [
                            "whatsapp",
                            "fb_img",
                            "telegram",
                            "messenger",
                            "instagram",
                            "facebook"
                        ]
                    )

                    if shared_platform:
                        reasons.append(
                            "Metadata removed by sharing platform"
                        )
                        metadata_status = (
                            "Removed by Sharing Platform"
                        )

                    else:
                        reasons.append(
                            "Camera metadata unavailable"
                        )
                        metadata_status = (
                            "Camera Metadata Missing"
                        )
                        score += 5
                if not iso:
                    reasons.append(
                        "ISO information unavailable"
                    )
                    score += 2
            elif image_type == "ai_generated":
                reasons.append(
                    "Synthetic image characteristics detected"
                )
            elif image_type == "digital_artwork":
                reasons.append(
                    "Artwork contains no physical camera metadata"
                )
            elif image_type == "graphic_design":
                reasons.append(
                    "Designed digital media metadata pattern"
                )
            elif image_type in [
                "screenshot",
                "web_ui",
                "mobile_app"
            ]:
                reasons.append(
                    "Desktop screenshot detected"
                )

        except Exception:
            filename = os.path.basename(
                image_path
            ).lower()
            metadata_available = False
            if image_type == "camera_photo":
                if any(
                    x in filename
                    for x in [
                        "whatsapp",
                        "img_",
                        "fb_img",
                        "messenger",
                        "telegram",
                        "instagram",
                        "facebook"
                    ]
                ):
                    reasons.append(
                        "Metadata removed by sharing platform"
                    )
                    metadata_status = (
                        "Removed by Sharing Platform"
                    )
                else:
                    reasons.append(
                        "Metadata extraction unavailable"
                    )
                    metadata_status = (
                        "Extraction Failed"
                    )
                score += 5

        # =====================================================
        # 5. SENSOR NOISE ANALYSIS
        # =====================================================
        noise = gray.astype(np.float32) - cv2.GaussianBlur(
            gray,
            (5, 5),
            0
        )
        noise_std = np.std(noise)
        if image_type == "camera_photo":
            if noise_std < 5:
                score += 5
                reasons.append(
                    "Very low sensor noise"
                )

        # =====================================================
        # 6. TEXTURE COMPLEXITY
        # =====================================================
        edges = cv2.Canny(gray, 100, 200)
        edge_density = np.sum(edges > 0) / edges.size
        if image_type == "camera_photo":
            if edge_density < 0.02:
                score += 5
                reasons.append(
                    "Low texture complexity"
                )

        if is_ai_art:
            image_type = "ai_generated"
            reasons.extend(ai_reasons)
            content_type = "AI Generated Media"
            score += 30

        if ai_metadata_detected:
            image_type = "ai_generated"
            content_type = (
                "AI Generated Media"
            )
            reasons.extend(
                metadata_reasons
            )
            reasons.append(
                f"AI source: {ai_metadata_source}"
            )
            score = max(
                score,
                95
            )

        # =====================================================
        # FACE FORENSICS CORRELATION
        # =====================================================
        if (
            face_forensics.get(
                "synthetic_face_suspected",
                False
            )
            and face_forensics.get(
                "face_count",
                0
            ) <= 2
        ):
            score += 20
            reasons.extend(
                face_forensics.get(
                    "reasons",
                    []
                )
            )

        # =====================================================
        # AI CORRELATION ENGINE
        # =====================================================
        ai_evidence_count = 0

        if ai_metadata_detected:
            ai_evidence_count += 1

        if ai_result["detected"]:
            ai_evidence_count += 1

        if is_ai_art:
            ai_evidence_count += 1

        if face_forensics.get(
            "synthetic_face_suspected",
            False
        ):
            ai_evidence_count += 1

        if ai_evidence_count >= 2:
            image_type = "ai_generated"
            content_type = (
                "AI Generated Media"
            )
            score = max(
                score,
                85
            )
            reasons.append(
                "Multiple AI indicators correlated"
            )

        if ai_result["detected"]:
            image_type = "ai_generated"
            content_type = (
                "AI Generated Media"
            )
            reasons.extend(
                ai_result["reasons"]
            )
            score = max(
                score,
                ai_result["confidence"]
            )
        
        # =====================================================
        # AI SCREENSHOT DETECTION
        # =====================================================
        if ai_screenshot_detected:
            reasons.extend(
                screenshot_reasons
            )

            if editing_findings:
                score += 10
                reasons.append(
                    "Screenshot editing indicators detected"
                )

            if source_data.get("confidence", 0) > 80:
                reasons.append(
                    f"Attributed to {source_data.get('platform', 'unknown')}"
                )

        # =====================================================
        # SENSOR NOISE VALIDATION
        # =====================================================
        if (
            image_type == "camera_photo"
            and not sensor_noise_valid
        ):
            score += 10
            reasons.extend(
                noise_reasons
            )

        if (
            image_type == "camera_photo"
            and gps_overlay_detected
            and face_count > 0
        ):
            score = max(
                score - 10,
                0
            )

            reasons.append(
                "GPS overlay and face evidence support authenticity"
            )

        # =====================================================
        # MEDIA TYPE SCORE NORMALIZATION
        # =====================================================
        if image_type in [
            "graphic_design",
            "poster",
            "digital_artwork"
        ]:
            score = min(score, 35)

        elif image_type in [
            "screenshot",
            "web_ui"
        ]:
            score = min(score, 25)

        if image_type in [
            "screenshot",
            "web_ui"
        ]:
            if score <= 25:
                message = "Original Screenshot"
                authenticity = (
                    "Likely Authentic"
                )
            elif score <= 50:
                message = (
                    "Screenshot - Review Recommended"
                )
                authenticity = (
                    "Needs Manual Review"
                )
            else:
                message = (
                    "Suspicious Screenshot"
                )
        # =====================================================
        # PROFESSIONAL CLASSIFICATION
        # =====================================================
        if image_type == "camera_photo":
            if score <= 20:
                message = "Authentic Camera Media"
                authenticity = "Likely Original"
            elif score <= 50:
                message = "Camera Media - Review Recommended"
                authenticity = "Needs Manual Review"
            else:
                message = "Suspicious Camera Media"
                authenticity = "Suspicious"
        elif image_type in [
			"screenshot",
			"web_ui",
			"graphic_design",
			"poster",
		]:
            if score <= 40:
                message = "Authentic Digital Content"
                authenticity = "Likely Authentic"
            elif score <= 70:
                message = "Edited Digital Content"
                authenticity = "Needs Manual Review"
            else:
                message = "Manipulated Digital Content"
                authenticity = "Suspicious"
        else:
            if score <= 40:
                message = "Digital Graphic Content"
                authenticity = "Likely Authentic"
            elif score <= 60:
                message = "Synthetic Styled Media"
                authenticity = "Needs Manual Review"
            elif score <= 80:
                message = "Suspicious AI Content"
                authenticity = "Suspicious"
            else:
                message = "Highly Suspicious AI Media"
                authenticity = "High Risk"

        # =====================================================
        # MEDIA LABELS
        # =====================================================
        media_labels = {
            "camera_photo": "Camera Photograph",
            "screenshot": "Screenshot",
            "web_ui": "Web Application Screenshot",
            "mobile_app": "Mobile Application Screenshot",
            "graphic_design": "Graphic Design / Infographic",
            "digital_artwork": "Digital Artwork",
            "document_scan": "Scanned Document",
            "ai_generated": "AI Generated Image",
            "unknown": "Unknown Media"
        }
        media_type_label = media_labels.get(
            image_type,
            "Unknown Media"
        )

        # =====================================================
        # DETECTION LOGIC
        # =====================================================
        critical_flags = 0
        if "Horizontal corruption artifacts detected" in reasons:
            critical_flags += 1
        if "Severe horizontal signal corruption detected" in reasons:
            critical_flags += 1
        if "Abnormal digital artifact patterns detected" in reasons:
            critical_flags += 1
        if "Strong JPEG compression artifacts detected" in reasons:
            critical_flags += 1
        if image_type in [
            "screenshot",
            "web_ui"
        ]:
            critical_flags = 0

        if critical_flags >= 3:
            score = max(score, 85)
            authenticity = "Suspicious"
            message = "Severely Corrupted Camera Media"

        if image_type in [
            "screenshot",
            "web_ui"
        ]:
            score = min(score, 25)
        score = max(0, min(score, 100))

        ai_generated_detection = {
            "detected":
                ai_result.get(
                    "detected",
                    False
                ),
            "confidence":
                ai_result.get(
                    "confidence",
                    0
                ),
            "verdict":
                ai_result.get(
                    "verdict",
                    "Unknown"
                ),
            "reasons":
                ai_result.get(
                    "reasons",
                    []
                )
        }

        # =====================================
        # SKIP AI ANALYSIS FOR GRAPHIC DESIGN
        # =====================================
        if image_type in [
            "graphic_design",
            "poster",
            "digital_artwork",
            "web_ui"
        ]:
            ai_generated_detection = {
                "detected": False,
                "confidence": 0,
                "verdict": "Not Applicable",
                "reasons": [
                    "AI image analysis not applicable to graphic design"
                ]
            }

        threat_engine = (
            calculate_threat_score(
                classification,
                metadata_forensics,
                ai_generated_detection,
                ela_result,
                compression_result,
                corruption_analysis,
                face_forensics
            )
        )
        add_timeline_event(
            case_id,
            "Threat Assessment Completed"
        )
        add_audit_log(
            case_id,
            "THREAT_ENGINE"
        )

        # =====================================================
        # THREAT SCORE
        # =====================================================
        threat_score = threat_engine[
            "final_threat_score"
        ]

        if not custody_result.get(
            "integrity_verified",
            True
        ):
            threat_score += 50
            reasons.append(
                "Chain of custody verification failed"
            )

        if advanced_face.get(
            "synthetic_face_suspected",
            False
        ):
            threat_score += 20
            reasons.extend(
                advanced_face.get(
                    "reasons",
                    []
                )
            )

            threat_engine[
                "final_threat_score"
            ] = min(
                threat_score,
                100
            )

        # ==========================================
        # AI GENERATED RISK LEVELS
        # ==========================================
        risk_level = threat_engine[
            "risk_level"
        ]

        add_note(
            case_id,
            "Initial Assessment",
            (
                f"Verdict: "
                f"{threat_engine['verdict']} | "
                f"Risk: "
                f"{threat_engine['risk_level']} | "
                f"Threat Score: "
                f"{threat_engine['final_threat_score']}"
            )
        )

        reasons = list(
            dict.fromkeys(reasons)
        )

        case_summary[
            "evidence_count"
        ] = get_case_evidence_count(
            case_id
        )
        if risk_level == "HIGH":
            case_summary[
                "high_risk"
            ] += 1
        elif risk_level == "MEDIUM":
            case_summary[
                "medium_risk"
            ] += 1
        else:
            case_summary[
                "low_risk"
            ] += 1

        if image_type == "ai_generated":        
            detected = (
                score >= 60
                and ai_evidence_count >= 2
            )
        elif image_type in [
            "camera_photo",
            "graphic_design",
            "digital_artwork"
        ]:
            detected = score >= 60
        else:
            detected = False

        # ==========================================
        # FINAL AI ASSESSMENT
        # ==========================================
        if (
            image_type == "ai_generated"
            and score >= 80
        ):
            final_ai_assessment = (
                "High confidence AI generated content"
            )

        elif (
            image_type == "ai_generated"
            and score >= 60
        ):
            final_ai_assessment = (
                "Likely AI generated content"
            )

        elif ai_result.get(
            "confidence",
            0
        ) >= 40:
            final_ai_assessment = (
                "Possible AI involvement"
            )

        else:
            final_ai_assessment = (
                "No significant AI indicators"
            )

        add_note(
            case_id,
            "AI Analysis",
            final_ai_assessment
        )

        result = {
            "case_id": case_id,
            "detected": detected,
            "score": score,
            "threat_score":
                threat_score,
            "verdict":
                threat_engine[
                    "verdict"
                ],
            "confidence":
                threat_engine[
                    "confidence"
                ],
            "ocr": {
                "text": ocr_text,
                "text_length": text_length
            },
            "sensor_noise_status":
                "Natural"
                if sensor_noise_valid
                else "Absent",
            "message": message,
            "authenticity": authenticity,
            "risk_level": risk_level,
            "status": status,
            "classification": {
                "media_type": image_type,
                "confidence": classification_confidence,
                "status": status
            },
            "media_type_label": media_type_label,

            "content_type": content_type,
            
            "face_detected": face_detected,
            "face_count": face_count,
            "face_status": face_status,

            "face_forensics": {
                "face_detected": face_forensics.get(
                    "face_detected",
                    False
                ),
                "face_count": face_forensics.get(
                    "face_count",
                    0
                ),
                "forensic_score": face_forensics.get(
                    "forensic_score",
                    0
                ),
                "synthetic_face_suspected": face_forensics.get(
                    "synthetic_face_suspected",
                    False
                ),
                "reasons": face_forensics.get(
                    "reasons",
                    []
                )
            },
            "advanced_face_forensics": advanced_face,
                    
            "ai_metadata_detected": ai_metadata_detected,
            "ai_source": (
                ai_metadata_source
                if ai_metadata_detected
                else ai_result.get(
                    "source",
                    "Unknown"
                )
            ),
            "ai_metadata_confidence":ai_metadata_confidence,
            "ai_assessment":final_ai_assessment,
            "ai_generated_detection": ai_generated_detection,

            "ai_forensics": {
                "sensor_noise_score":
                    float(
                        ai_result.get(
                            "sensor_noise_score",
                            0
                        )
                    ),
                "frequency_score":
                    float(
                        ai_result.get(
                            "frequency_score",
                            0
                        )
                    ),
                "texture_score":
                    float(
                        ai_result.get(
                            "texture_score",
                            0
                        )
                    ),
            },

            "ela_analysis":
                sanitize_for_mongo(
                    ela_result
                ),

            "screenshot_forensics": {
                "platform": source_data.get(
                    "platform",
                    "Unknown"
                ),
                "screenshot_type": source_data.get(
                    "screenshot_type",
                    "Unknown"
                ),
                "confidence": source_data.get(
                    "confidence",
                    0
                ),
                "ui_elements": ui_elements,
                "editing_findings": editing_findings
            },

            "reasons": reasons,

            "metadata_available": metadata_available,
            "metadata_status": metadata_status,
            "metadata_forensics": metadata_forensics,
            "compression_forensics": compression_result,
            "corruption_forensics": corruption_analysis,
            "threat_engine": threat_engine,
            "reverse_image_search": reverse_search,
            "source_attribution": source_attribution,
            "chain_of_custody": custody_result,
            "case_repository": {
                "case_id": case_id,
                "evidence_id":
                    custody_result[
                        "evidence_id"
                    ],
                "repository_path":
                    evidence_folder
            },
            "case_statistics": {
                "case_id":
                    case_id,
                "evidence_count":
                    get_case_evidence_count(
                        case_id
                    )
            },
            "investigation": {
                "case_id": case_id,
                "timeline":
                    f"cases/{case_id}/timeline/timeline.json",
                "audit_log":
                    f"cases/{case_id}/logs/audit_log.json"
            },
            "investigation_notes":
                get_notes(
                    case_id
                ),
            "timeline_events": [
                "Case Created",
                "Image Uploaded",
                "Metadata Analysis Completed",
                "OCR Analysis Completed",
                "ELA Analysis Completed",
                "Compression Analysis Completed",
                "Corruption Analysis Completed",
                "Threat Assessment Completed",
                "PDF Report Generated",
                "Evidence Package Created"
            ],
        }

        case_summary_report = (
            generate_case_summary(
                case_id,
                custody_result[
                    "evidence_id"
                ],
                threat_engine
            )
        )

        save_case_report(
            case_id,
            case_summary_report
        )

        result["case_summary"] = (
            case_summary_report
        )

        filename = os.path.splitext(
            os.path.basename(image_path)
        )[0]
        report_path = (
            f"reports/{filename}.pdf"
        )
        os.makedirs(
            "reports",
            exist_ok=True
        )
        try:
            generate_report(
                result,
                report_path
            )
            result["report"] = report_path

            add_timeline_event(
                case_id,
                "PDF Report Generated"
            )
            add_audit_log(
                case_id,
                "GENERATE_REPORT"
            )

            store_original_image(
                image_path,
                evidence_folder
            )
            store_ela_image(
                ela_result.get(
                    "ela_image"
                ),
                evidence_folder
            )
            store_report(
                report_path,
                evidence_folder
            )
            store_evidence_json(
                evidence_folder,
                result
            )

            add_timeline_event(
                case_id,
                "Evidence Package Created"
            )
            add_audit_log(
                case_id,
                "PACKAGE_EVIDENCE"
            )

            # create_evidence_package(
            #     evidence_id=
            #         custody_result[
            #             "evidence_id"
            #         ],
            #     image_path=
            #         image_path,
            #     report_path=
            #         report_path,
            #     ela_path=
            #         ela_result.get(
            #             "ela_image"
            #         ),
            #     forensic_result=
            #         result
            # )

            case_summary[
                "evidence_list"
            ].append(
                {
                    "filename":
                        os.path.basename(
                            image_path
                        ),
                    "risk_level":
                        risk_level,
                    "threat_score":
                        threat_score,
                    "evidence_id":
                        custody_result[
                            "evidence_id"
                        ]
                }
            )

        except Exception as pdf_error:
            result["report"] = None
            print(
                "PDF Generation Error:",
                pdf_error
            )
        
        result["evidence_package"] = (evidence_folder)

        save_case_summary(
                case_id,
                case_summary
            )
        
        return result

    except Exception as e:
        result = {
            "detected": False,
            "score": 0,
            "ocr": {
                "text": "",
                "text_length": 0
            },
            "message": "Analysis Failed",
            "authenticity": "Unknown",
            "risk_level": "UNKNOWN",
            "classification": {
                "media_type": image_type,
                "confidence":
                    classification_confidence
            },
            "media_type_label": "Unknown Media",
            "content_type": "Unknown Media",
            "threat_score": 0,
			"face_detected": False,
        	"face_status": "Unknown",
            "face_count": 0,
            "sensor_noise_status": "Unknown",

            "ai_metadata_detected": False,
            "ai_source": "Unknown",
            "ai_metadata_confidence": 0,
            "ai_assessment":"Unknown",

            "ela_analysis": {
                "ela_image": None,
                "ela_score": 0,
                "reasons": []
            },

			"screenshot_forensics": {
                "platform": "Unknown",
				"screenshot_type": "Unknown",
				"confidence": 0,
			    "ui_elements": [],
				"editing_findings": []
            },

            "metadata_forensics": {
                "source": "Unknown",
                "source_confidence": 0,
                "forensic_score": 0,
                "integrity_score": 0,
                "metadata_status": "Unknown",
                "editing_detected": False,
                "ai_metadata_detected": False,
                "reasons": []
            },

            "compression_forensics": {
                "compression_detected": False,
                "compression_score": 0,
                "block_artifact_score": 0,
                "sharpness": 0,
                "unique_colors": 0,
                "reasons": []
            },

            "corruption_forensics": {
                "corruption_detected": False,
                "corruption_score": 0,
                "reasons": []
            },
            
            "chain_of_custody": {
                "integrity_verified": False,
                "hash_sha256": "Unknown",
                "timestamp": "Unknown",
                "reasons": []
            },

            "reasons": [str(e)],
            "metadata_available": metadata_available,
            "metadata_status": metadata_status
        }

        return result