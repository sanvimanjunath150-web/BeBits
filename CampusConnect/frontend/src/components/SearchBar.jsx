import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 border-b border-gray-200">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#0070F3]"
      />
      <button type="submit" className="bg-[#0070F3] text-white px-3 py-1 rounded hover:bg-[#005bb5]">
        Search
      </button>
    </form>
  );
}
