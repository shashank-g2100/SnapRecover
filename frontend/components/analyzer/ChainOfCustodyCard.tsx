"use client";

import {
  BadgeCheck,
  CalendarClock,
  FileKey2,
  Fingerprint,
  ShieldCheck,
  UserRound,
  CircleCheck,
  CircleAlert,
} from "lucide-react";

interface Props {
  custody: any;
}

function CustodyMetric({
  label,
  value,
  icon,
  tone = "cyan",
  small = false,
}: {
  label: string;
  value: any;
  icon: React.ReactNode;
  tone?: "cyan" | "green" | "red" | "yellow" | "purple";
  small?: boolean;
}) {
  const tones = {
    cyan: {
      icon: "text-[#19e6d2]",
      value: "text-[#19e6d2]",
      border: "border-[#19e6d2]/15",
    },
    green: {
      icon: "text-emerald-400",
      value: "text-emerald-400",
      border: "border-emerald-400/15",
    },
    red: {
      icon: "text-red-400",
      value: "text-red-400",
      border: "border-red-400/15",
    },
    yellow: {
      icon: "text-yellow-400",
      value: "text-yellow-400",
      border: "border-yellow-400/15",
    },
    purple: {
      icon: "text-violet-400",
      value: "text-violet-400",
      border: "border-violet-400/15",
    },
  };

  const style = tones[tone];

  return (
    <div
      className={`
        bg-[#08111f]
        border
        ${style.border}
        rounded-xl
        p-5
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:bg-[#0b1628]
        hover:border-[#19e6d2]/30
      `}
    >
      <div className="flex items-center gap-2">
        <span className={style.icon}>{icon}</span>
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#8191b1]">
          {label}
        </p>
      </div>

      <p
        className={`
          mt-2
          font-semibold
          break-words
          ${style.value}
          ${small ? "text-3sm font-mono" : "text-xl"}
        `}
      >
        {value || "—"}
      </p>
    </div>
  );
}

export default function ChainOfCustodyCard({
  custody,
}: Props) {
  const chainStatus = String(
    custody?.chain_status || "UNKNOWN"
  ).toUpperCase();

  const isIntact = chainStatus === "INTACT";

  const integrityVerified = Boolean(
    custody?.integrity_verified
  );

  const overallValid =
    isIntact && integrityVerified;

  return (
    <div>
      {/* TOP ACCENT */}
      <div>
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`
                w-11 h-11
                rounded-xl
                flex
                items-center
                justify-center
                border
                ${
                  overallValid
                    ? "bg-[#19e6d2]/10 border-[#19e6d2]/20"
                    : "bg-red-400/10 border-red-400/20"
                }
              `}
            >
              <Fingerprint
                size={21}
                className={
                  overallValid
                    ? "text-[#19e6d2]"
                    : "text-red-400"
                }
              />
            </div>

            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#8191b1]">
                Evidence Integrity System
              </p>

              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                Chain of Custody
              </h2>
            </div>
          </div>

          {/* STATUS BADGE */}
          <div
            className={`
              px-3 py-2
              rounded-lg
              border
              text-xs
              font-semibold
              flex
              items-center
              gap-2
              ${
                overallValid
                  ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
                  : "bg-red-400/10 border-red-400/30 text-red-400"
              }
            `}
          >
            {overallValid ? (
              <CircleCheck size={15} />
            ) : (
              <CircleAlert size={15} />
            )}

            {overallValid
              ? "CHAIN VERIFIED"
              : "CHAIN REVIEW REQUIRED"}
          </div>
        </div>

        {/* INTEGRITY STATUS */}
        <div className="bg-[#08111f] border border-[#1b2a41] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-[#8191b1]">
                Evidence Integrity Status
              </p>
              <p
                className={`mt-2 text-lg font-semibold ${
                  overallValid
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {overallValid
                  ? "Cryptographic integrity verified"
                  : "Integrity verification requires review"}
              </p>
            </div>

            <div
              className={`
                w-12 h-12
                rounded-full
                flex
                items-center
                justify-center
                border
                ${
                  overallValid
                    ? "border-emerald-400/40 bg-emerald-400/10"
                    : "border-red-400/40 bg-red-400/10"
                }
              `}
            >
              <ShieldCheck
                size={25}
                className={
                  overallValid
                    ? "text-emerald-400"
                    : "text-red-400"
                }
              />
            </div>
          </div>

          {/* Integrity bar */}
          <div className="mt-4 h-2 bg-[#111d31] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                overallValid
                  ? "bg-[#19e6d2]"
                  : "bg-red-400"
              }`}
              style={{
                width: overallValid ? "100%" : "45%",
              }}
            />
          </div>
        </div>

        {/* METRICS */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <CustodyMetric
            label="Evidence ID"
            value={custody?.evidence_id || "N/A"}
            icon={<FileKey2 size={20} />}
            tone="cyan"
            small
          />
          <CustodyMetric
            label="Chain Status"
            value={chainStatus}
            icon={<BadgeCheck size={20} />}
            tone={isIntact ? "green" : "red"}
          />
          <CustodyMetric
            label="Integrity Verified"
            value={integrityVerified ? "Yes" : "No"}
            icon={<ShieldCheck size={20} />}
            tone={integrityVerified ? "green" : "red"}
          />
          <CustodyMetric
            label="Acquisition Time"
            value={custody?.acquisition_time || "N/A"}
            icon={<CalendarClock size={20} />}
            tone="purple"
            small
          />
          <CustodyMetric
            label="Assigned Analyst"
            value={custody?.analyst || "Unknown"}
            icon={<UserRound size={20} />}
            tone="yellow"
          />
        </div>

        {/* CUSTODY TIMELINE */}
        <div className="mt-4 bg-[#08111f] border border-[#1b2a41] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1b2a41]">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#8191b1]">
              Custody Timeline
            </p>

            <h3 className="text-2sm font-semibold text-white mt-1">
              Evidence Handling Record
            </h3>
          </div>

          <div className="p-4">
            <div className="relative border-l border-[#243554] ml-2 space-y-6">
              {/* EVENT 1 */}
              <div className="relative pl-6">
                <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[#19e6d2]" />
                <p className="text-sm text-white font-medium">
                  Evidence Acquired
                </p>
                <p className="text-sm text-[#8191b1] mt-1">
                  {custody?.acquisition_time || "Acquisition timestamp unavailable"}
                </p>
              </div>

              {/* EVENT 2 */}
              <div className="relative pl-6">
                <span
                  className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${
                    integrityVerified
                      ? "bg-emerald-400"
                      : "bg-red-400"
                  }`}
                />
                <p className="text-sm text-white font-medium">
                  Integrity Validation
                </p>
                <p
                  className={`text-sm mt-1 ${
                    integrityVerified
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {integrityVerified
                    ? "Hash and chain validation completed successfully"
                    : "Integrity validation could not be confirmed"}
                </p>
              </div>

              {/* EVENT 3 */}
              <div className="relative pl-6">
                <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-violet-400" />

                <p className="text-sm text-white font-medium">
                  Analyst Assignment
                </p>

                <p className="text-sm text-[#8191b1] mt-1">
                  {custody?.analyst
                    ? `Evidence assigned to ${custody.analyst}`
                    : "No analyst assignment recorded"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}