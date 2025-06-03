export default function Header({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">
        Page {currentPage + 1} of {totalPages || "..."}
      </h2>
    </div>
  );
}
