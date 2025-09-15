import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  name: "",
  description: "",
  prepTime: "",
  cookTime: "",
  ingredients: [],
  steps: [],

  // --- Basic fields ---
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setPrepTimeISO: (iso) => set({ prepTime: iso }),
  setCookTimeISO: (iso) => set({ cookTime: iso }),

  // --- Steps (instructions) ---
  setSteps: (updater) =>
    set((state) => {
      // support either array or function(prev) => newArray
      const newSteps =
        typeof updater === "function" ? updater(state.steps || []) : updater;
      return { steps: newSteps || [] };
    }),

  updateStepText: (id, newStep) =>
    set((state) => ({
      steps: (state.steps || []).map((step) =>
        step.id === id ? { ...step, ...newStep } : step
      ),
    })),

  addImageToStep: (stepId, image) =>
    set((state) => ({
      steps: (state.steps || []).map((step) =>
        step.id === stepId
          ? { ...step, images: [...(step.images || []), image] }
          : step
      ),
    })),

  // --- Ingredients ---
  setIngredients: (ingredients) => set({ ingredients: ingredients || [] }),
  updateIngredientText: (id, text) =>
    set((state) => ({
      ingredients: (state.ingredients || []).map((ingredient) =>
        ingredient.id === id ? { ...ingredient, text } : ingredient
      ),
    })),
}));
