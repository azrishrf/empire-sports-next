"use client";

import CategoryClient from "./[category]/CategoryClient";

export default function CollectionsPage() {
  const config = {
    title: "All Collections",
    filters: ["categories", "brands", "gender", "price"],
    genderFilter: null,
  };

  return (
    <div className="min-h-screen bg-white">
      <CategoryClient config={config} />
    </div>
  );
}
