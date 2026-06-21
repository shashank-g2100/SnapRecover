"use client";

import ELATab from "./ELATab";

interface ELAAnalysisCardProps {
  ela: any;
  originalImage?: string;
}

export default function ELAAnalysisCard({
  ela,
  originalImage,
}: ELAAnalysisCardProps) {
  return (
    <section>
      <ELATab
        ela={ela}
        originalImage={originalImage}
      />
    </section>
  );
}