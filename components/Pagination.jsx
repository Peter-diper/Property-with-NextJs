"use client";
const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        disabled={page === 1} 
        onClick={() => handlePage(page - 1)}
        className={`active:bg-gray-50 ${page === 1 ? "cursor-zoom-out" : "cursor-pointer"} mr-2 px-2 py-1 border border-gray-300 rounded`}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => handlePage(page + 1)}
        className="active:bg-gray-50 ml-2 px-2 py-1 border border-gray-300 rounded"
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
