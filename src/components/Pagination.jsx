import React from 'react'

const Pagination = (props) => {

    const { handlePageChange, currentPage, nrOfPages } = props


    return (
        <>
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange("prev")}
            >Previous</button>
            <p>{currentPage}</p>
            <button
                disabled={currentPage === nrOfPages}
                onClick={() => handlePageChange("next")}
            >Next</button>
        </>
    )
}

export default Pagination