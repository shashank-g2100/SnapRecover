from PIL import Image
import cv2
import numpy as np

from services.ai_metadata_detector import detect_ai_metadata

def detect_ai_generated(image_path, image_type="camera_photo"):
    score = 0
    reasons = []
    try:
        # =====================================
        # Metadata Analysis
        # =====================================
        image = Image.open(image_path)

        if image_type in [
            "screenshot",
            "web_ui",
            "mobile_app",
            "document_scan"
        ]:
            return {
                "detected": False,
                "confidence": 0,
                "verdict": "Not Applicable",
                "source": "N/A",
                "reasons": [
                    "AI image detection not applicable"
                ]
            }
        
        metadata_result = detect_ai_metadata(
            image_path
        )
        if metadata_result["detected"]:
            score += 80
            reasons.extend(
                metadata_result["reasons"]
            )
            ai_source = metadata_result["source"]
        else:
            ai_source = "Unknown"

        # =====================================
        # Visual Analysis
        # =====================================
        image_cv = cv2.imread(image_path)
        gray = cv2.cvtColor(
            image_cv,
            cv2.COLOR_BGR2GRAY
        )

        # Ensure image was loaded
        if image_cv is None:
            raise ValueError("Unable to read image")

        # Compute saturation and unique colors early for later checks
        hsv = cv2.cvtColor(
            image_cv,
            cv2.COLOR_BGR2HSV
        )
        saturation = np.mean(
            hsv[:, :, 1]
        )

        # Count unique colors (approximate)
        try:
            small = cv2.resize(
                image_cv,
                (200, 200)
            )
            unique_colors = len(
                np.unique(
                    small.reshape(-1, 3),
                    axis=0
                )
            )
        except Exception:
            unique_colors = 0

        # Sharpness
        sharpness = cv2.Laplacian(
            gray,
            cv2.CV_64F
        ).var()

        if (
            image_type == "camera_photo"
            and sharpness > 1500
        ):
            score += 15
            reasons.append(
                "Unnaturally sharp image"
            )

        if (
            saturation > 150
            and sharpness > 700
        ):
            score += 10
            reasons.append(
                "Highly stylized digital artwork"
            )

        if (
            image_type == "camera_photo"
            and unique_colors < 2000
            and saturation > 100
        ):
            score += 10
            reasons.append(
                "Synthetic color distribution"
            )

        # Sensor Noise
        blur = cv2.GaussianBlur(
            gray,
            (5, 5),
            0
        )
        noise = (
            gray.astype(np.float32)
            - blur.astype(np.float32)
        )
        noise_std = np.std(
            noise
        )
        sensor_noise_score = round(
            float(noise_std),
            2
        )

        if (
            image_type == "camera_photo"
            and noise_std < 1.5
        ):
            score += 20
            reasons.append(
                "Missing natural sensor noise"
            )

        # =====================================
        # FFT Analysis
        # =====================================
        fft = np.fft.fft2(gray)
        fft_shift = np.fft.fftshift(fft)
        magnitude = np.log(
            np.abs(fft_shift) + 1
        )
        frequency_std = np.std(
            magnitude
        )
        frequency_score = round(
            float(frequency_std),
            2
        )

        if frequency_std < 25:
            score += 10
            reasons.append(
                "Synthetic frequency distribution"
            )

        # =====================================
        # Texture Consistency
        # =====================================
        texture_std = np.std(
            cv2.Laplacian(
                gray,
                cv2.CV_64F
            )
        )
        texture_score = round(
            float(texture_std),
            2
        )

        if (
            image_type == "camera_photo"
            and texture_std < 10
        ):
            score += 5
            reasons.append(
                "Overly smooth texture regions"
            )

        # Saturation
        if (
            image_type == "camera_photo"
            and saturation > 140
        ):
            score += 10
            reasons.append(
                "Artificial color enhancement"
            )

        if image_type == "digital_artwork":
            if saturation > 120:
                score += 10
            if frequency_std < 20:
                score += 10

        if (
            image_type == "camera_photo"
            and noise_std > 2
            and texture_std > 25
        ):
            score = max(
                score - 20,
                0
            )
            reasons.append(
                "Natural camera characteristics detected"
            )

        evidence_summary = {
            "metadata_evidence":
                ai_source != "Unknown",

            "noise_anomaly":
                noise_std < 1.5,

            "frequency_anomaly":
                frequency_std < 25,

            "texture_anomaly":
                texture_std < 20
        }

        # =====================================
        # AI EVIDENCE CORRELATION
        # =====================================
        evidence_count = 0

        if metadata_result["detected"]:
            evidence_count += 1

        if noise_std < 1.5:
            evidence_count += 1

        if frequency_std < 25:
            evidence_count += 1

        if texture_std < 20:
            evidence_count += 1

        if (
            image_type == "camera_photo"
            and sharpness > 1500
        ):
            evidence_count += 1

        confidence = min(
            score,
            100
        )

        detected = (
            confidence >= 60
            and evidence_count >= 3
        )

        # =====================================
        # Verdict
        # =====================================
        if detected:
            if confidence >= 80:
                verdict = (
                    "High Confidence AI Generated"
                )
            else:
                verdict = (
                    "Likely AI Generated"
                )
        elif confidence >= 40:
            verdict = (
                "Possible AI Indicators"
            )
        else:
            verdict = (
                "Likely Authentic"
            )

        # =====================================
        # Confidence
        # =====================================

        if confidence >= 80:
            verdict = "High Confidence AI Generated"
        elif confidence >= 60:
            verdict = "Likely AI Generated"
        elif confidence >= 40:
            verdict = "Possibly AI Generated"
        else:
            verdict = "Likely Authentic"

        return {
            "detected": detected,
            "confidence": confidence,
            "evidence_count": evidence_count,
            "verdict": verdict,
            "source": ai_source,
            "sensor_noise_score":
                sensor_noise_score,
            "frequency_score":
                frequency_score,
            "texture_score":
                texture_score,
            "evidence":
                evidence_summary,
            "reasons": reasons
        }

    except Exception as e:
        return {
            "detected": False,
            "confidence": 0,
            "verdict": "Analysis Failed",
            "source": "Unknown",
            "sensor_noise_score": 0,
            "frequency_score": 0,
            "texture_score": 0,
            "evidence": {},
            "reasons": [
                str(e)
            ]
        }