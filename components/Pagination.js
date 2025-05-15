export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex ">
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          className="px-3 cursor-pointer py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-l-md"
        >
          Previous
        </button>
        {Array.from({ length: 3 }, (_, index) =>
          page - 2 + index > 0 ? (
            <button
              key={index}
              onClick={() => setPage(page - 3 + index)}
              className={`px-3 py-2 cursor-pointer border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100`}
            >
              {page - 2 + index}
            </button>
          ) : (
            ""
          )
        )}
        <button className="px-3 cursor-pointer py-2 border-t border-b border-gray-300 text-sm font-medium text-blue-600 bg-blue-100">
          {page + 1}
        </button>
        {Array.from({ length: 3 }, (_, index) =>
          page + 2 + index <= totalPages ? (
            <button
              key={index}
              onClick={() => setPage(page + 1 + index)}
              className={`px-3 py-2 cursor-pointer border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100`}
            >
              {page + 2 + index}
            </button>
          ) : (
            ""
          )
        )}
        <button
          onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
          className="px-3 cursor-pointer py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-r-md"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
