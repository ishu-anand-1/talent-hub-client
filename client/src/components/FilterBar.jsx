import React from "react";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-md flex flex-wrap gap-4 justify-between items-center">
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/3"
      >
        <option value="All">All Categories</option>
        <option value="Dance">Dance</option>
        <option value="Singing">Singing</option>
        <option value="Instrument">Instrument</option>
      </select>

      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/3"
      >
        <option value="All">All Genres</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="Classical">Classical</option>
        <option value="Bollywood">Bollywood</option>
        <option value="Rock">Rock</option>
        <option value="Pop">Pop</option>
      </select>

      <select
        name="level"
        value={filters.level}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/3"
      >
        <option value="All">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
};

export default FilterBar;
