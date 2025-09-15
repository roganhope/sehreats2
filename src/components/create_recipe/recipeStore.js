import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  name: "",
  description: "",
  prepTime: "",
  cookTime: "",

  // Tags

  // Initialize with two ingredients
  ingredients: [
    { id: Date.now().toString() + "-1", text: "", type: "ingredient" },
    { id: Date.now().toString() + "-2", text: "", type: "ingredient" },
  ],

  // Initialize with one step
  steps: [
    {
      id: Date.now().toString() + "-step1",
      type: "step",
      name: "",
      text: "",
      images: [],
    },
  ],

  // --- Basic fields ---
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setPrepTimeISO: (iso) => set({ prepTime: iso }),
  setCookTimeISO: (iso) => set({ cookTime: iso }),

  // --- Tags ---
  setTags: (tags) => set({ tags: tags || [] }),

  // --- Steps (instructions) ---
  setSteps: (updater) =>
    set((state) => {
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

  tags: [], // <-- selected tags
}));
