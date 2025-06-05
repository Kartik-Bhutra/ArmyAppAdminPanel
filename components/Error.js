import FetchError from "@/icons/FetchError";
import Link from "next/link";

export default function Error({ message = "Something went wrong!", retry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="text-red-500 mb-4">
        <FetchError />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      <div className="flex gap-4">
        {retry && (
          <button
            onClick={retry}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        )}
        <Link
          href="/"
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
