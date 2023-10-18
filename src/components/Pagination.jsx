import React from 'react'

const Pagination = () => {

    // props: currentPage, handlePageChange, nrOfPages
    return (
        <>
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange("prev")}
            >Previous</button>
            <button
                disabled={currentPage === nrOfPages}
                onClick={() => handlePageChange("next")}
            >Next</button>
        </>
    )
}

export default Pagination