"use client"

export default function Table({currentPage, total_pages}){
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Blocked Sequence (Page {currentPage + 1} of {total_pages})
            </h2>
          </div>
    )
}