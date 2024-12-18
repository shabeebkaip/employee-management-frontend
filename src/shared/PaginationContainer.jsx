import Pagination from "./Pagination";
import PropTypes from "prop-types";

const PaginationContainer = ({ totalPages, handlePageChange, currentPage }) => {
  const handlePage = (page) => {
    handlePageChange(page);
  };

  return (
    <div className="items-center justify-center bg-white h-15 drop-shadow-md">
      <div className="flex justify-end px-6 py-4">
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePage}
          />
        </div>
      </div>
    </div>
  );
};

PaginationContainer.propTypes = {
  totalPages: PropTypes.number,
  handlePageChange: PropTypes.func,
  currentPage: PropTypes.number,
};

export default PaginationContainer;
