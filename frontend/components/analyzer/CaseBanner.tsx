interface Props {
  caseId?: string
  evidenceId?: string
  analyst?: string
  integrityVerified?: boolean
}

export default function CaseBanner({
  caseId,
  evidenceId,
  analyst,
  integrityVerified
}: Props) {

  return (

    <div
      className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-6
      mb-6
      "
    >

      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-6
        "
      >

        <div>
          <p
            className="
            text-zinc-500
            text-xs
            uppercase
            "
          >
            Investigation Case
          </p>

          <h2
            className="
            text-2xl
            font-bold
            text-cyan-400
            mt-2
            "
          >
            {caseId || "Unknown Case"}
          </h2>
        </div>

        <div>
          <p className="text-zinc-500 text-xs uppercase">
            Evidence ID
          </p>

          <h2 className="text-xl font-semibold">
            {evidenceId || "Unknown"}
          </h2>
        </div>

        <div>
          <p className="text-zinc-500 text-xs uppercase">
            Analyst
          </p>

          <h2 className="text-xl font-semibold">
            {analyst || "SnapRecover"}
          </h2>
        </div>

        <div>
          <p className="text-zinc-500 text-xs uppercase">
            Chain Integrity
          </p>

          <div
            className={`
              mt-2
              px-4
              py-2
              rounded-xl
              text-sm
              font-bold
              inline-block
              ${
                integrityVerified
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }
            `}
          >
            {
              integrityVerified
                ? "VERIFIED"
                : "FAILED"
            }
          </div>
        </div>

      </div>

    </div>

  )
}