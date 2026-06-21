"use client";

import { useState } from "react";
import { uploadImage } from "@/app/services/analyzer";

export default function ImageUpload({
  onComplete,
}: {
  onComplete: (data: any) => void;
}) {
  const [loading, setLoading] =
    useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const result =
        await uploadImage(file);

      onComplete(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-6 bg-white">
      <input
        type="file"
        onChange={handleUpload}
      />

      {loading && (
        <p>
          Analyzing image...
        </p>
      )}
    </div>
  );
}