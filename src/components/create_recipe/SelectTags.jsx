import React from "react";
import PillSelector from "../misc/PillSelector";
import { useRecipeStore } from "./recipeStore";

const fakeTags = [
  {
    tag_name: "breakfast",
    tag_ui_name: "Breakfast",
    tag_category_ref_ui: "meal_type",
    tag_hex: "#F59E0B",
  },
  {
    tag_name: "lunch",
    tag_ui_name: "Lunch",
    tag_category_ref_ui: "meal_type",
    tag_hex: "#10B981",
  },
  {
    tag_name: "dinner",
    tag_ui_name: "Dinner",
    tag_category_ref_ui: "meal_type",
    tag_hex: "#3B82F6",
  },
  {
    tag_name: "vegan",
    tag_ui_name: "Vegan",
    tag_category_ref_ui: "diet",
    tag_hex: "#6B7280",
  },
  {
    tag_name: "gluten_free",
    tag_ui_name: "Gluten Free",
    tag_category_ref_ui: "diet",
    tag_hex: "#EF4444",
  },
];

const categories = ["meal_type", "diet"];

export default function SelectTags() {
  const selectedTags = useRecipeStore((state) => state.tags);
  const setSelectedTags = useRecipeStore((state) => state.setTags);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-bold">Select Tags</h2>
      <PillSelector
        options={fakeTags}
        selected={selectedTags}
        onChange={setSelectedTags}
        filterCategories={categories}
      />
      <div className="mt-4">
        <strong>Selected:</strong>{" "}
        {selectedTags.map((t) => t.tag_ui_name).join(", ") || "None"}
      </div>
    </div>
  );
}
