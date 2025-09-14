"use client";
import React from "react";
import DropZone from "../DragAndDrop/DropZone";
import { useRecipeStore } from "./recipeStore";

const RecipeIngredients = () => {
  const ingredients = useRecipeStore((state) => state.ingredients);
  const setIngredients = useRecipeStore((state) => state.setIngredients);
  const updateIngredientText = useRecipeStore(
    (state) => state.updateIngredientText
  );

  // Generic add function, supports type
  const addItem = (type = "ingredient") =>
    setIngredients([
      ...ingredients,
      { id: Date.now().toString(), text: "", type },
    ]);

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Ingredients</h2>
      <DropZone
        items={ingredients}
        setItems={setIngredients}
        childrenRenderer={(item) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateIngredientText(item.id, e.target.value)}
              placeholder={
                item.type === "subtitle" ? "Subtitle..." : "Ingredient..."
              }
              style={{
                flex: 1,
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontWeight: item.type === "subtitle" ? "bold" : "normal",
              }}
            />
          </div>
        )}
      />

      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
        <button
          onClick={() => addItem("ingredient")}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #888",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
          }}
        >
          + Ingredient
        </button>
        <button
          onClick={() => addItem("subtitle")}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #888",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
          }}
        >
          + Subtitle
        </button>
      </div>
    </div>
  );
};

export default RecipeIngredients;
