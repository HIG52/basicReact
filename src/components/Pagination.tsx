import React, { useState, useEffect } from 'react';
import './Pagination.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  pageCount = 10
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) {
      setStart(prev => prev + pageCount);
    }
    if (currentPage < start) {
      setStart(prev => prev - pageCount);
    }
  }, [currentPage, pageCount, start]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="board-pagination">
      <button 
        className={`pagination-btn ${noPrev ? 'disabled' : ''}`}
        onClick={() => handlePageChange(start - 1)}
        disabled={noPrev}
      >
        &lt;
      </button>
      
      {[...Array(pageCount)].map((_, i) => {
        const pageNumber = start + i;
        if (pageNumber <= totalPages) {
          return (
            <button
              key={pageNumber}
              className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }
        return null;
      })}
      
      <button 
        className={`pagination-btn ${noNext ? 'disabled' : ''}`}
        onClick={() => handlePageChange(start + pageCount)}
        disabled={noNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination; 