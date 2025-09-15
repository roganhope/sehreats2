// src/store/useRecipeStore.js
import { create } from "zustand";

// Simple global counter for stable IDs
let idCounter = 0;
const generateId = () => `item-${++idCounter}`;

export const useRecipeStore = create((set) => ({
  // --- Basic fields ---
  name: "",
  description: "",
  prepTime: "",
  cookTime: "",

  // --- Tags ---
  tags: [],

  // --- Ingredients (initialize with two) ---
  ingredients: [
    { id: generateId(), text: "", type: "ingredient" },
    { id: generateId(), text: "", type: "ingredient" },
  ],

  // --- Steps (instructions, initialize with one) ---
  steps: [{ id: generateId(), type: "step", name: "", text: "", images: [] }],

  // --- Setters for basic fields ---
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setPrepTimeISO: (iso) => set({ prepTime: iso }),
  setCookTimeISO: (iso) => set({ cookTime: iso }),

  // --- Tags ---
  setTags: (tags) => set({ tags: tags || [] }),

  // --- Ingredients ---
  setIngredients: (ingredients) => set({ ingredients: ingredients || [] }),

  updateIngredientText: (id, text) =>
    set((state) => ({
      ingredients: (state.ingredients || []).map((ingredient) =>
        ingredient.id === id ? { ...ingredient, text } : ingredient
      ),
    })),

  addIngredient: (type = "ingredient") =>
    set((state) => ({
      ingredients: [
        ...(state.ingredients || []),
        { id: generateId(), text: "", type },
      ],
    })),

  // --- Steps ---
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

  addStep: (stepData = {}) =>
    set((state) => ({
      steps: [
        ...(state.steps || []),
        {
          id: generateId(),
          type: "step",
          name: "",
          text: "",
          images: [],
          ...stepData,
        },
      ],
    })),

  addImageToStep: (stepId, image) =>
    set((state) => ({
      steps: (state.steps || []).map((step) =>
        step.id === stepId
          ? { ...step, images: [...(step.images || []), image] }
          : step
      ),
    })),
}));
