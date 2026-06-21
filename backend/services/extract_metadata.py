import exifread

def extract_metadata(image_path):
    metadata = {}
    try:
        with open(
            image_path,
            "rb"
        ) as image_file:

            tags = exifread.process_file(
                image_file
            )

            for tag, value in tags.items():

                if tag not in [

                    "JPEGThumbnail",
                    "TIFFThumbnail",
                    "Filename"

                ]:

                    metadata[tag] = str(
                        value
                    )

        # =====================================
        # Phase 3 Important Fields
        # =====================================

        metadata_summary = {

            "camera_make":
                metadata.get(
                    "Image Make",
                    "Unknown"
                ),

            "camera_model":
                metadata.get(
                    "Image Model",
                    "Unknown"
                ),

            "software":
                metadata.get(
                    "Image Software",
                    "Unknown"
                ),

            "datetime":
                metadata.get(
                    "Image DateTime",
                    "Unknown"
                ),

            "datetime_original":
                metadata.get(
                    "EXIF DateTimeOriginal",
                    "Unknown"
                ),

            "lens_model":
                metadata.get(
                    "EXIF LensModel",
                    "Unknown"
                ),

            "exposure_time":
                metadata.get(
                    "EXIF ExposureTime",
                    "Unknown"
                ),

            "f_number":
                metadata.get(
                    "EXIF FNumber",
                    "Unknown"
                ),

            "focal_length":
                metadata.get(
                    "EXIF FocalLength",
                    "Unknown"
                ),

            "gps_latitude":
                metadata.get(
                    "GPS GPSLatitude",
                    "Unknown"
                ),

            "gps_longitude":
                metadata.get(
                    "GPS GPSLongitude",
                    "Unknown"
                ),

            "artist":
                metadata.get(
                    "Image Artist",
                    "Unknown"
                ),

            "copyright":
                metadata.get(
                    "Image Copyright",
                    "Unknown"
                )
        }

        return {

            "raw_metadata":
                metadata,

            "summary":
                metadata_summary
        }

    except Exception as e:

        return {

            "raw_metadata": {},

            "summary": {},

            "error": str(e)
        }