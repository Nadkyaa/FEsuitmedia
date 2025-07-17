
import styles from './Pagination.module.css';

export default function Pagination({ currentPage, pageSize, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const renderPageButtons = () => {
    const buttons = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages, 5);
    }
    if (currentPage > totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
    }

    if (startPage > 1) {
      buttons.push(
        <button key={1} onClick={() => onPageChange(1)} className={styles.button}>
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="dots-start" className={styles.dots}>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.button} ${i === currentPage ? styles.active : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="dots-end" className={styles.dots}>...</span>);
      }
      buttons.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className={styles.button}>
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.button}
      >
        Prev
      </button>

      {renderPageButtons()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.button}
      >
        Next
      </button>
    </div>
  );
}