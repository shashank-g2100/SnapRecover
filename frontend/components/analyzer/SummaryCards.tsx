interface Props {
  threatScore: number
  riskLevel: string
  confidence: number
  mediaType: string
  verdict: string
}

export default function SummaryCards({
  threatScore,
  riskLevel,
  confidence,
  mediaType,
  verdict
}: Props) {

  const riskColor =
    riskLevel === "HIGH"
      ? "text-red-400"
      : riskLevel === "MEDIUM"
      ? "text-yellow-400"
      : "text-green-400"

  return (

    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-5
      gap-4
      mb-8
      "
    >

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-xs uppercase">
          Threat Score
        </p>

        <h2 className="text-4xl font-bold text-red-400 mt-2">
          {threatScore}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-xs uppercase">
          Risk Level
        </p>

        <h2 className={`text-4xl font-bold mt-2 ${riskColor}`}>
          {riskLevel}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-xs uppercase">
          Confidence
        </p>

        <h2 className="text-4xl font-bold text-cyan-400 mt-2">
          {confidence}%
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-xs uppercase">
          Media Category
        </p>

        <h2 className="text-xl font-bold text-blue-400 mt-2">
          {mediaType}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-xs uppercase">
          Verdict
        </p>

        <h2 className="text-2xl font-bold text-green-400 mt-2">
          {verdict}
        </h2>
      </div>

    </div>
  )
}