import React, { useState, useMemo } from "react";

export default function PillSelector({
  options = [],
  selected = [],
  onChange,
  filterCategories = [],
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Compute the available pool (options not selected)
  const poolOptions = useMemo(() => {
    return options.filter(
      (tag) => !selected.find((s) => s.tag_name === tag.tag_name)
    );
  }, [options, selected]);

  // Filter pool by search and category
  const filteredPool = useMemo(() => {
    return poolOptions.filter((tag) => {
      const matchesSearch = tag.tag_ui_name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        !categoryFilter || tag.tag_category_ref_ui === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [poolOptions, search, categoryFilter]);

  // Add tag to selected (remove from pool automatically)
  const addTag = (tag) => {
    onChange([...selected, tag]);
  };

  // Remove tag from selected (returns to pool)
  const removeTag = (tag) => {
    onChange(selected.filter((t) => t.tag_name !== tag.tag_name));
  };

  return (
    <div className="w-full max-w-md">
      {/* Selected Tags Section */}
      <div
        className={`mb-2 p-2 rounded min-h-[60px] ${
          selected.length === 0
            ? "border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400"
            : "flex flex-wrap gap-2"
        }`}
      >
        {selected.length === 0 ? (
          <span>Selected tags empty for now</span>
        ) : (
          selected.map((tag) => (
            <div
              key={tag.tag_name}
              className="flex items-center px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: tag.tag_hex || "#ccc" }}
            >
              {tag.tag_ui_name}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 font-bold text-white"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tags..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-2 px-3 py-1 border rounded"
      />

      {/* Category Filter */}
      {filterCategories.length > 0 && (
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full mb-2 px-3 py-1 border rounded"
        >
          <option value="">All Categories</option>
          {filterCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}

      {/* Pool Pills */}
      <div className="flex flex-wrap gap-2">
        {filteredPool.map((tag) => (
          <button
            key={tag.tag_name}
            onClick={() => addTag(tag)}
            style={{ backgroundColor: tag.tag_hex || "#ccc" }}
            className="px-3 py-1 rounded-full text-white"
          >
            {tag.tag_ui_name}
          </button>
        ))}
      </div>
    </div>
  );
}
