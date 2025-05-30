"use client";

export default function Filter({
    showFilter,
    setShowFilter,
    filters,
    handleFilterChange,
    resetFilters,
    handleSortToggle}) {
  return (
    <div className="relative">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
      >
        <span>Filter</span>
        <span className="text-sm">{showFilter ? "▼" : "▶"}</span>
      </button>

      {showFilter && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-4 z-10 border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Number
              </label>
              <input
                type="text"
                name="number"
                value={filters.number}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reported By Number
              </label>
              <input
                type="text"
                name="reportedBy"
                value={filters.reportedBy}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search reporter's number"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center text-sm text-gray-700 gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.sortByUpvotes}
                  onChange={handleSortToggle}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                Sort by most reported
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={resetFilters}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
