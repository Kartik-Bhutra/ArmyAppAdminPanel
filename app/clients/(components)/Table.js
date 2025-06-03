"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import clients from "@/constants/clients-demo-data.json";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

export default function Table({ showActions = true, isApproved = false }) {
  const total_pages = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    // For fetching delay
    // remove this during connceting it with firebase
    setTimeout(() => {
      setData(clients.slice(currentPage * 50, (currentPage + 1) * 50));
    }, [1000]);
  }, [currentPage]);
  const onConfirm = (user_id) => {};
  const onCancel = (user_id) => {};
  const onRemove = (uuid) => {
    // Add remove logic here
    console.log("Removing client:", uuid);
  };

  return (
    <>
      <Header
        currentPage={currentPage}
        total_pages={total_pages}
        isApproved={isApproved}
      />
      <div className="relative overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                UUID
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, key) => (
              <motion.tr
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: key * 0.05 }}
                className="bg-white hover:bg-blue-50/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{item.phone_no}</td>
                <td className="px-6 py-4 text-gray-600">{item.id}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {showActions ? (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-green-600 transition-colors"
                        onClick={() => onConfirm(item.id)}
                      >
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-red-600 transition-colors"
                        onClick={() => onCancel(item.id)}
                      >
                        Decline
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-red-600 transition-colors"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </motion.button>
                  )}
                </td>
              </motion.tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center">
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
