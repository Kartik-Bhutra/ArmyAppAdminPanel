import { motion } from "framer-motion";
import { db } from "@/lib/firebaseConfig";
import {
  deleteDoc,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

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
  const onRemove = async (docId) => {
    try {
      const metaRef = doc(db, "clients", "metadata");
      await Promise.all([
        deleteDoc(doc(db, "clients", docId)),
        updateDoc(metaRef, {
          [isApproved ? "authenticated" : "requests"]: increment(-1),
          updatedAt: serverTimestamp(),
        }),
      ]);

      window.location.reload();
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const onApprove = async (docId) => {
    try {
      const clientRef = doc(db, "clients", docId);
      const metaRef = doc(db, "clients", "metadata");

      await Promise.all([
        updateDoc(clientRef, {
          authenticated: true,
          createdAt: serverTimestamp(),
        }),
        updateDoc(metaRef, {
          authenticated: increment(1),
          requests: increment(-1),
          updatedAt: serverTimestamp(),
        }),
      ]);

      window.location.reload();
    } catch (error) {
      console.error("Failed to approve client:", error);
    }
  };

  return (
    <tbody className="divide-y divide-gray-200">
      {data.map((item, key) => (
        <motion.tr
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: key * 0.05 }}
          className="bg-white hover:bg-blue-50/50 transition-colors duration-200"
        >
          <td className="px-6 py-4 text-center">{item.name}</td>
          <td className="px-6 py-4 text-gray-600 sm:table-cell text-center">
            {item.mobile}
          </td>
          <td className="px-6 py-4 text-gray-600 md:table-cell text-center">
            {item.UUID}
          </td>
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
                  onClick={() => onApprove(item.id)}
                >
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-red-600 transition-colors"
                  onClick={() => onRemove(item.id)}
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
