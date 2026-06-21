export interface AnalysisResult {
  filename: string;
  status: string;
  threat_score: number;
  risk_level: string;
  report: string;

  metadata: {
    ["File Name"]: string;
    ["File Size (KB)"]: number;
    ["Image Width"]: number;
    ["Image Height"]: number;
    ["SHA256 Hash"]: string;
    ["File Type"]: string;
  };

  ocr_text: {
    text: string;
    text_length: number;
  };

  ela_image: {
    ela_image: string;
    ela_score: number;
    ela_mean: number;
    ela_std: number;
    ela_max: number;
    ela_risk: string;
  };

  ai_detection: any;
}