import React from "react";
import { useRecipeStore } from "./recipeStore";

const RecipeDescription = () => {
  const description = useRecipeStore((state) => state.description);
  const setDescription = useRecipeStore((state) => state.setDescription);

  return (
    <div className="mb-4">
      <label
        htmlFor="recipe-description"
        className="block text-sm font-medium text-gray-700"
      >
        Recipe Description
      </label>
      <textarea
        id="recipe-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a short description of your recipe"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        rows={4}
      />
    </div>
  );
};

export default RecipeDescription;
