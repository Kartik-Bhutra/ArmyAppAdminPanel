import { motion } from "framer-motion";
import TableBody from "./TableBody";
import Loader from "@/components/Loader";
import React, { useState } from "react";

export default function Table({ data = [], isLoading = false }) {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const toggleRow = (index) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm mx-auto max-w-[100vw]">
      <div className="px-2 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Reported Numbers{" "}
            <span className="text-xs sm:text-sm text-gray-500"></span>
          </h2>
        </motion.div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead className="text-[10px] sm:text-xs font-medium text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="w-8 p-4"></th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Reported Number
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Upvotes
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan="4" className="p-0">
                  <Loader />
                </td>
              </tr>
            </tbody>
          ) : (
            <TableBody
              data={data}
              selectedRows={selectedRows}
              toggleRow={toggleRow}
            />
          )}
        </table>
      </div>
    </div>
  );
}
