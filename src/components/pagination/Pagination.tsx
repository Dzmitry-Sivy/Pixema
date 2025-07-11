import React, { JSX, useContext } from "react";
import "./pagination.scss";
import { PaginationProps } from "../../Types/Types";
import { LoadingContext } from "../../context/LoadingContext";
function Pagination({ page, setPage }: PaginationProps): JSX.Element {
  const { loading, setLoading } = useContext(LoadingContext);

  const prevPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setPage(Math.max(page - 1, 1));
  };

  const nextPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setPage(page + 1);
  };
  return (
    <div className="pagination">
      <button className="pagination__prev" onClick={prevPagination}>
        <img className="img__prev" src="img/arrow.png" alt="prev" />
        <p className="text__prev">Prev</p>
      </button>
      <button className="pagination__next" onClick={nextPagination}>
        <img className="img__next" src="/img/arrow1.png" alt="next" />
       <p className="text__next">Next</p>
      </button>
    </div>
  );
}

export default Pagination;
