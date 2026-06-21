export default function ThreatEngineTab({
  threat,
}: {
  threat: any;
}) {
  return (
    <div className="space-y-4">

      <div className="border p-4 rounded-xl">
        <h3>
          Threat Score
        </h3>

        <p>
          {
            threat.final_threat_score
          }
        </p>
      </div>

      <div className="border p-4 rounded-xl">
        <h3>
          Risk Level
        </h3>

        <p>
          {threat.risk_level}
        </p>
      </div>

      <div className="border p-4 rounded-xl">
        <h3>
          Verdict
        </h3>

        <p>
          {threat.verdict}
        </p>
      </div>

    </div>
  );
}