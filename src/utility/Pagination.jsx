import PropTypes from "prop-types";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; 

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Adjusted page for display (convert 0-based `currentPage` to 1-based for UI)
  const adjustedPage = currentPage + 1;

  const generatePages = () => {
    const pages = [];
    let maxVisibleButtons; // Total visible page buttons, excluding "..." and first/last pages
    if (window.innerWidth <= 480) {
      maxVisibleButtons = 3; // Mobile screen
    } else {
      maxVisibleButtons = 5; // Larger screens (tablet, desktop)
    }
    const halfVisible = Math.floor(maxVisibleButtons / 2);

    let startPage = Math.max(1, adjustedPage - halfVisible);
    let endPage = Math.min(totalPages, adjustedPage + halfVisible);

    if (endPage - startPage < maxVisibleButtons - 1) {
      if (adjustedPage <= halfVisible) {
        endPage = Math.min(totalPages, maxVisibleButtons);
      } else if (adjustedPage + halfVisible >= totalPages) {
        startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 0}
        className={`px-4 py-2 rounded-md ${
          currentPage === 0
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "text-primary bg-white hover:bg-primary hover:text-white"
        }`}
      >
        <AiOutlineLeft />
      </button>

      {/* First Page + Ellipses (if needed) */}
      {adjustedPage > 3 && totalPages > 5 && (
        <>
          <button
            onClick={() => onPageChange(0)} 
            className={`px-4 py-2 rounded-md ${
              currentPage === 0
                ? "bg-primary text-white"
                : "bg-white hover:bg-primary hover:text-white"
            }`}
          >
            1
          </button>
          {adjustedPage > 4 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {generatePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page - 1)} 
          className={`px-4 py-1 rounded-md ${
            page === adjustedPage
              ? "bg-primary text-white"
              : "bg-white hover:bg-primary hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page + Ellipses (if needed) */}
      {adjustedPage < totalPages - 2 && totalPages > 5 && (
        <>
          {adjustedPage < totalPages - 3 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages - 1)} 
            className={`px-4 py-1 h-max rounded-md ${
              currentPage === totalPages - 1
                ? "bg-primary text-white"
                : "bg-white hover:bg-primary hover:text-white"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages - 1}
        className={`px-3 py-2 rounded-md ${
          currentPage === totalPages - 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "text-primary bg-white hover:bg-primary hover:text-white"
        }`}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
