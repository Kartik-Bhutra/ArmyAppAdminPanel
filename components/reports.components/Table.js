"use client";

import Filter from "./Filter";
import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";
// DEMO Data Inport
import reports from "./reports.json";
import Loader from "@/components/Loader";

export default function Table() {
    const total_pages = 20;
const [currentPage, setCurrentPage] = useState(0);
const [data, setData] = useState([]);
const [startingData, setStartingData] = useState([]);
const [selectedRows, setSelectedRows] = useState(new Set());
const [showFilter, setShowFilter] = useState(false);
const [filters, setFilters] = useState({
  number: "",
  reportedBy: "",
  sortByUpvotes: false,
});

useEffect(() => {
  setData([]);
  setSelectedRows(new Set()); // Clear selected rows on page change
  // For fetching delay
  // remove this during connceting it with firebase
  setTimeout(() => {
    setData(reports.slice(currentPage * 50, (currentPage + 1) * 50));
  }, [1000]);
  setStartingData(reports.slice(currentPage * 50, (currentPage + 1) * 50));
}, [currentPage]);

const onBlock = (phone_no) => {};
const onSafe = (phone_no) => {};

const toggleRow = (index) => {
  const newSelected = new Set(selectedRows);
  if (newSelected.has(index)) {
    newSelected.delete(index);
  } else {
    newSelected.add(index);
  }
  setSelectedRows(newSelected);
};

const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters((prev) => ({
    ...prev,
    [name]: value,
  }));

  let filteredData = [...startingData];

  // Apply number filter
  if (name === "number" && value) {
    filteredData = filteredData.filter((item) =>
      item.phone_no.startsWith(value)
    );
  }

  // Apply reported by filter
  if (name === "reportedBy" && value) {
    filteredData = filteredData.filter((item) =>
      item.by.some((reporter) => reporter.phone_no.startsWith(value))
    );
  }

  setData(filteredData);
};

const handleSortToggle = () => {
  setFilters((prev) => ({
    ...prev,
    sortByUpvotes: !prev.sortByUpvotes,
  }));

  setData((prev) => {
    const sorted = [...prev].sort((a, b) =>
      filters.sortByUpvotes
        ? a.by.length - b.by.length
        : b.by.length - a.by.length
    );
    return sorted;
  });
};

const resetFilters = () => {
  setFilters({
    number: "",
    reportedBy: "",
    sortByUpvotes: false,
  });
  setData(startingData);
};
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Reported Numbers (Page {currentPage + 1} of {total_pages})
        </h2>
        <Filter
          handleFilterChange={handleFilterChange}
          filters={filters}
          handleSortToggle={handleSortToggle}
          resetFilters={resetFilters}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
        />
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-white-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="w-8 px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Reported Number
              </th>
              <th scope="col" className="px-6 py-3">
                Upvote
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={item.phone_no}>
                <tr
                  className="odd:bg-gray even:bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleRow(index)}
                >
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm inline-block transform">
                      {selectedRows.has(index) ? "▼" : "▶"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.phone_no}</td>
                  <td className="px-6 py-4">{item.by.length}</td>
                  <td className="px-6 py-4">
                    <button
                      className="mr-2 text-green-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSafe(item.phone_no);
                      }}
                    >
                      Safe
                    </button>
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBlock(item.phone_no);
                      }}
                    >
                      Block
                    </button>
                  </td>
                </tr>
                {selectedRows.has(index) && (
                  <tr key={`${item.phone_no}-details`}>
                    <td className="px-6 py-4 bg-gray-50" />
                    <td colSpan="3" className="px-6 py-4 bg-gray-50">
                      <div className="text-sm">
                        <h4 className="font-semibold mb-2">Reported by:</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {item.by.map((reporter, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <div>
                                <p className="font-medium">{reporter.name}</p>
                                <p className="text-gray-500">
                                  {reporter.phone_no}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {startingData.length == 0 && (
              <tr className="odd:bg-gray even:bg-gray-50 border-b border-gray-200">
                <td
                  className="px-6 py-4 display-flex items-center justify-center"
                  colSpan={4}
                >
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={total_pages}
        page={currentPage}
        setPage={setCurrentPage}
      />
    </>
  );
}
