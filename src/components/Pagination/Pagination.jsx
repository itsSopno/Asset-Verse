const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
      {/* Prev */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm rounded-lg border border-white/15
        text-white hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition
            ${
              currentPage === page
                ? 'bg-indigo-500/30 text-white border border-indigo-400'
                : 'border border-white/15 text-slate-300 hover:bg-white/5'
            }`}
          >
            {page}
          </button>
        )
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm rounded-lg border border-white/15
        text-white hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
