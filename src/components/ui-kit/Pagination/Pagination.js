import React from "react";
import './Pagination.scss';
import ArrowNext from "../../Icons/ArrowNext";
import ArrowNextDouble from "../../Icons/ArrowNextDouble";

const Pagination = ({firstPage, prevPage, nextPage, lastPage, pages, currentPage, pageChange, pageCount}) => {

    return (
        <div className="pagination">
            <button className={["button", "button--prev-double", currentPage === 1 ? "disabled" : ""].join(' ')} onClick={firstPage}>
                {React.createElement(ArrowNextDouble)}
            </button>
            <button className={["button", "button--prev", currentPage === 1 ? "disabled" : ""].join(' ')} onClick={prevPage}>
                {React.createElement(ArrowNext)}
            </button>
            {pages.map((page, key) => (
                <button
                    key={key}
                    className={["button", "button--page", currentPage === page ? "active" : ""].join(' ')}
                    onClick={() => pageChange(page)}>{page}
                </button>
            ))}
            <button className={["button", "button--next", currentPage === pageCount ? "disabled" : ""].join(' ')} onClick={nextPage}>
                {React.createElement(ArrowNext)}
            </button>
            <button className={["button", "button--next-double", currentPage === pageCount ? "disabled" : ""].join(' ')} onClick={lastPage}>
                {React.createElement(ArrowNextDouble)}
            </button>
      </div>
    )
}

export default Pagination