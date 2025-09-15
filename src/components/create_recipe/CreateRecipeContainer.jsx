"use client";
import React from "react";
import RecipeName from "./RecipeName";
import { useRecipeStore } from "./recipeStore";
import RecipeDescription from "./RecipeDescription";
import RecipeTime from "./RecipeTime";
import InstructionsContainer from "./Instructions/InstructionsContainer";
import SelectTags from "./SelectTags";
import ImageUploadAndCrop from "./ImageUploadAndCrop";
import RecipeIngredients from "./RecipeIngredients";
const CreateRecipeContainer = () => {
  const store = useRecipeStore(); // get the entire store

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>

      {/* DEBUG: print the entire store */}
      <pre className="mb-4 p-2 bg-gray-100 rounded text-sm">
        {JSON.stringify(store, null, 2)}
      </pre>
      <ImageUploadAndCrop />

      <RecipeName />
      <RecipeDescription />
      <RecipeTime />
      <RecipeIngredients />
      <InstructionsContainer />
      <SelectTags />
    </div>
  );
};

export default CreateRecipeContainer;
