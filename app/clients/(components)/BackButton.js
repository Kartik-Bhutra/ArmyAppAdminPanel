"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BackButton() {
  return (
    <Link href="/clients">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Dashboard
      </motion.button>
    </Link>
  );
}
