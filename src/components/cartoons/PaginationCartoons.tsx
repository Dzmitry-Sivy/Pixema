import React, { JSX, useContext } from "react";
import "..//pagination/pagination.scss";
import { LoadingContext } from "../../context/LoadingContext";
import { SeriesPaginationProps } from "../../Types/Types";
function PaginationCartoons({ seriesPage, setSeriesPage,}: SeriesPaginationProps): JSX.Element {
const { setLoading } = useContext(LoadingContext);

  const prevPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
     setLoading(true)
    setSeriesPage(Math.max(seriesPage - 1, 1));
  };

  const nextPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
   setLoading(true)
    setSeriesPage(seriesPage + 1);
  }
   return (
    <div className="pagination">
      <button className="pagination__prev" onClick={prevPagination}>
        <img className="img__prev" src="img/arrow.png" alt="prev" />
        <p className="text__prev">Prev</p>
      </button>
      <button className="pagination__next" onClick={nextPagination}>
        <img className="img__next" src="img/arrow1.png" alt="next" />
       <p className="text__next">Next</p>
      </button>
    </div>
  );
}

export default PaginationCartoons;