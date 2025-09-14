import React from "react";
import { useRecipeStore } from "./recipeStore";

const RecipeName = () => {
  const name = useRecipeStore((state) => state.name);
  const setName = useRecipeStore((state) => state.setName);

  return (
    <div className="mb-4">
      <label
        htmlFor="recipe-name"
        className="block text-sm font-medium text-gray-700"
      >
        Recipe Name
      </label>
      <input
        type="text"
        id="recipe-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your recipe name"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default RecipeName;
