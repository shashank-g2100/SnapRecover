export default function OverviewTab({
  result,
}: {
  result: any;
}) {
  const threat =
    result.ai_detection
      ?.threat_engine;

  return (
    <div className="grid md:grid-cols-2 gap-4">

      <div className="p-4 border rounded-xl">
        <h3>Filename</h3>
        <p>{result.filename}</p>
      </div>

      <div className="p-4 border rounded-xl">
        <h3>Status</h3>
        <p>{result.status}</p>
      </div>

      <div className="p-4 border rounded-xl">
        <h3>Verdict</h3>
        <p>{threat?.verdict}</p>
      </div>

      <div className="p-4 border rounded-xl">
        <h3>Risk Level</h3>
        <p>{threat?.risk_level}</p>
      </div>

      <div className="p-4 border rounded-xl">
        <h3>Threat Score</h3>
        <p>
          {
            threat?.final_threat_score
          }
        </p>
      </div>

      <div className="p-4 border rounded-xl">
        <h3>Confidence</h3>
        <p>
          {threat?.confidence}%
        </p>
      </div>

    </div>
  );
}