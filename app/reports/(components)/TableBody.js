import { motion } from "framer-motion";
import ChevronIcon from "@/icons/ChevronIcon";
import React from "react";

function formatTimestamp(timestamp) {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function TableBody({ data, selectedRows, toggleRow }) {
  const onBlock = (mobile, e) => {
    e.stopPropagation();

    console.log("Blocking:", mobile);
  };

  const onSafe = (mobile, e) => {
    e.stopPropagation();

    console.log("Marking as safe:", mobile);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          <motion.tr
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="hover:bg-blue-50/50 transition-colors duration-200 cursor-pointer text-center"
            onClick={() => toggleRow(index)}
          >
            <td className="p-4">
              <motion.div
                animate={{ rotate: selectedRows.has(index) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-600"
              >
                <ChevronIcon />
              </motion.div>
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 text-center">
              {item.mobile}
            </td>
            <td className="px-6 py-4 text-center">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {item.by.length}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => onSafe(item.mobile, e)}
                  className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-sm"
                >
                  Safe
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => onBlock(item.mobile, e)}
                  className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm"
                >
                  Block
                </motion.button>
              </div>
            </td>
          </motion.tr>
          {selectedRows.has(index) && (
            <motion.tr
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <td className="bg-gray-50/80" />
              <td colSpan="3" className="px-6 py-4 bg-gray-50/80">
                <div className="text-sm text-center">
                  <h4 className="font-semibold mb-3 text-gray-700">
                    Reported by:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {item.by.map((reporter, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {reporter.name || "Anonymous"}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {reporter.mobile}
                          </p>
                          {reporter.reportedAt && (
                            <p className="text-gray-400 text-xs mt-1">
                              {formatTimestamp(reporter.reportedAt)}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </td>
            </motion.tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  );
}
