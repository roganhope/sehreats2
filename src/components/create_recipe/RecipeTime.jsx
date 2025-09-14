import React, { useState, useEffect } from "react";
import { useRecipeStore } from "./recipeStore";

const toISO8601 = (hours, minutes) => {
  if (!hours && !minutes) return "";
  return `PT${hours ? hours + "H" : ""}${minutes ? minutes + "M" : ""}`;
};

const RecipeTime = () => {
  const setPrepTimeISO = useRecipeStore((state) => state.setPrepTimeISO);
  const setCookTimeISO = useRecipeStore((state) => state.setCookTimeISO);

  const [prepHours, setPrepHours] = useState(0);
  const [prepMinutes, setPrepMinutes] = useState(0);
  const [cookHours, setCookHours] = useState(0);
  const [cookMinutes, setCookMinutes] = useState(0);

  useEffect(() => {
    setPrepTimeISO(toISO8601(prepHours, prepMinutes));
  }, [prepHours, prepMinutes]);

  useEffect(() => {
    setCookTimeISO(toISO8601(cookHours, cookMinutes));
  }, [cookHours, cookMinutes]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium mb-2">Times</h2>

      {/* Prep Time */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Prep Time
        </label>
        <div className="flex gap-2 mt-1">
          <div className="flex flex-col">
            <input
              type="number"
              min={0}
              value={prepHours}
              onChange={(e) => setPrepHours(Number(e.target.value))}
              placeholder="0"
              className="w-20 border-gray-300 rounded-md"
            />
            <span className="text-xs text-gray-500 text-center">Hours</span>
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              min={0}
              max={59}
              value={prepMinutes}
              onChange={(e) => setPrepMinutes(Number(e.target.value))}
              placeholder="0"
              className="w-20 border-gray-300 rounded-md"
            />
            <span className="text-xs text-gray-500 text-center">Minutes</span>
          </div>
        </div>
      </div>

      {/* Cook Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cook Time
        </label>
        <div className="flex gap-2 mt-1">
          <div className="flex flex-col">
            <input
              type="number"
              min={0}
              value={cookHours}
              onChange={(e) => setCookHours(Number(e.target.value))}
              placeholder="0"
              className="w-20 border-gray-300 rounded-md"
            />
            <span className="text-xs text-gray-500 text-center">Hours</span>
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              min={0}
              max={59}
              value={cookMinutes}
              onChange={(e) => setCookMinutes(Number(e.target.value))}
              placeholder="0"
              className="w-20 border-gray-300 rounded-md"
            />
            <span className="text-xs text-gray-500 text-center">Minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeTime;
