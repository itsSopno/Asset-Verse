import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../PlantsCard/Card";

const ITEMS_PER_PAGE = 10;

const PlantsGrid = ({ plants }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(plants.length / ITEMS_PER_PAGE);

  const paginatedPlants = plants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-10">
     
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="
            grid grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-8
          "
        >
          {paginatedPlants.map(plant => (
            <Card key={plant._id} plant={plant} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="
              px-4 py-2 rounded-xl border border-gray-300
              text-sm font-semibold text-gray-700
              hover:bg-black hover:text-white transition
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`
                w-10 h-10 rounded-xl text-sm font-semibold transition
                ${
                  currentPage === i + 1
                    ? "bg-indigo-400 text-white shadow-lg"
                    : "border border-gray-300 text-gray-700 hover:bg-indigo-100"
                }
              `}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="
              px-4 py-2 rounded-xl border border-gray-300
              text-sm font-semibold text-gray-700
              hover:bg-black hover:text-white transition
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PlantsGrid;
