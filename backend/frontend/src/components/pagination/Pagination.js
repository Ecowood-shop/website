// Import hooks
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// Import components
import ReactPaginate from "react-paginate";
// Import styles
import styles from "./pagination.module.scss";

// Export pagination
function Pagination({ page, pages }) {
  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(page - 1);

  useEffect(() => {
    setCurrentPage(page - 1);
  }, [page]);

  return (
    <nav className={styles.container + " w3-animate-right"}>
      {pages > 1 && (
        <ReactPaginate
          containerClassName={styles.pagination}
          pageClassName={styles.page}
          breakClassName={styles.break}
          activeClassName={styles.active}
          previousClassName={styles.previous}
          nextClassName={styles.next}
          breakLabel="..."
          onPageChange={(event) => {
            setCurrentPage(event.selected);
            searchParams.set("page", event.selected + 1);
            setSearchParams(searchParams);
          }}
          forcePage={currentPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={window.innerWidth > 1000 ? 2 : 1}
          pageCount={pages}
          previousLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              className={styles.icon}
            >
              <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
            </svg>
          }
          nextLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              className={styles.icon}
            >
              <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
            </svg>
          }
          renderOnZeroPageCount={null}
        />
      )}
    </nav>
  );
}

export default Pagination;
