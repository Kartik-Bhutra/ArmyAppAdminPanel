import Link from "next/link";

export default function Pagination({ currentPage, totalPages, baseUrl }) {
  const page = Number(currentPage);

  const prevPages = [];
  for (let i = Math.max(1, page - 3); i < page; i++) {
    prevPages.push(i);
  }

  const nextPages = [];
  for (let i = page + 1; i <= Math.min(totalPages, page + 3); i++) {
    nextPages.push(i);
  }

  // Convert numbers to strings for href
  const formattedPage = String(currentPage);
  const formattedTotal = String(totalPages);

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex">
        <Link
          href={`${baseUrl}?page=${Math.max(1, page - 1)}`}
          className="px-3 cursor-pointer py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-l-md"
        >
          Previous
        </Link>

        {/* Previous pages */}
        {prevPages.map((num) => (
          <Link
            key={num}
            href={`${baseUrl}?page=${String(num)}`}
            className="px-3 py-2 cursor-pointer border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {num}
          </Link>
        ))}

        {/* Current page */}
        <span className="px-3 py-2 border-t border-b border-gray-300 text-sm font-medium text-blue-600 bg-blue-100">
          {page}
        </span>

        {/* Next pages */}
        {nextPages.map((num) => (
          <Link
            key={num}
            href={`${baseUrl}?page=${String(num)}`}
            className="px-3 py-2 cursor-pointer border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {num}
          </Link>
        ))}

        <Link
          href={`${baseUrl}?page=${Math.min(totalPages, page + 1)}`}
          className="px-3 cursor-pointer py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-r-md"
        >
          Next
        </Link>
      </nav>
    </div>
  );
}
