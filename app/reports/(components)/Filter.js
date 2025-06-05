import { motion, AnimatePresence } from "framer-motion";
import FilterIcon from "@/icons/FilterIcon";
import SearchIcon from "@/icons/SearchIcon";
import Cross from "@/icons/Cross";

export default function Filter({
  showFilter,
  setShowFilter,
  filters,
  handleFilterChange,
  resetFilters,
  handleSortToggle,
}) {
  return (
    <div className="relative z-50 overflow-visible">
      {!showFilter && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilter(true)}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 gap-2 text-sm shadow-sm"
        >
          <FilterIcon className="w-4 h-4" />
          <span>Filters</span>
        </motion.button>
      )}

      <AnimatePresence>
        {showFilter && (
          <motion.div
            key="filter-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 text-sm z-50"
          >
            <div className="p-3 space-y-4 text-gray-800">
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-1">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
                  <FilterIcon className="w-4 h-4" />
                  Filter Reports
                </h3>
                <button
                  onClick={() => setShowFilter(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                  aria-label="Close filter"
                >
                  <Cross className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-1">
                    <SearchIcon className="left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      name="number"
                      value={filters.number}
                      onChange={handleFilterChange}
                      className="w-full pl-8 pr-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm"
                      placeholder="Search..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporter's Number
                  </label>
                  <div className="flex items-center gap-1">
                    <SearchIcon className="left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      name="reportedBy"
                      value={filters.reportedBy}
                      onChange={handleFilterChange}
                      className="w-full pl-8 pr-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm"
                      placeholder="Search..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm pt-1">
                <input
                  type="checkbox"
                  checked={filters.sortByUpvotes}
                  onChange={handleSortToggle}
                  className="rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">Sort by most reported</span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1 text-sm text-gray-600 rounded-md hover:text-gray-800 hover:bg-gray-100 transition"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilter(false)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
