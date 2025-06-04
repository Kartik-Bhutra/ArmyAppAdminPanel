"use client";
import { motion } from "framer-motion";
import { decrypt } from "@/hooks/useDecrypt";
import Loader from "@/components/Loader";

function formatTimestamp(isoString) {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function TableBody({ data, isApproved = false }) {
  const decryptData = (item) => {
    try {
      return {
        ...item,
        phoneNo: decrypt(item.phoneNo, item.iv),
        UUID: decrypt(item.UUID, item.iv),
      };
    } catch (error) {
      console.error("Decryption error:", error);
      return item;
    }
  };

  const decryptedData = data?.map(decryptData) || [];

  const onConfirm = (user_id) => {};
  const onCancel = (user_id) => {};
  const onRemove = (uuid) => {};

  if (!data) {
    return (
      <tr>
        <td colSpan={5}>
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tbody className="divide-y divide-gray-200">
      {decryptedData.map((item, key) => (
        <motion.tr
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: key * 0.05 }}
          className="bg-white hover:bg-blue-50/50 transition-colors duration-200"
        >
          <td className="px-6 py-4 text-center">{item.name}</td>
          <td className="px-6 py-4 text-gray-600 sm:table-cell text-center">
            {item.phoneNo}
          </td>
          <td className="px-6 py-4 text-gray-600 md:table-cell text-center">{item.UUID}</td>
          <td className="px-6 py-4 text-gray-600 sm:table-cell text-center">
            {formatTimestamp(item.createdAt)}
          </td>
          <td className="px-6 py-4 flex justify-center">
            {isApproved ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-red-600 transition-colors"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </motion.button>
            ) : (
              <div className="flex flex-row max-[900px]:flex-col gap-2 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-green-600 transition-colors"
                  onClick={() => onConfirm(item.id)}
                >
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-red-600 transition-colors"
                  onClick={() => onCancel(item.id)}
                >
                  Decline
                </motion.button>
              </div>
            )}
          </td>
        </motion.tr>
      ))}
    </tbody>
  );
}
