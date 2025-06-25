// components/Paginator.jsx
export default function Paginator({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null;
  
    const jump = (p) => p >= 1 && p <= totalPages && onPageChange(p);
  
    const PageBtn = (p) => (
      <button
        key={p}
        onClick={() => jump(p)}
        className={`px-3 py-1 rounded ${currentPage === p ? 'bg-gray-200 text-gray-600' : 'bg-white'}`}
      >
        {p}
      </button>
    );
  
    const renderPages = () => {
      if (totalPages <= 4) return [...Array(totalPages)].map((_, i) => PageBtn(i + 1));
      const arr = [PageBtn(1)];
  
      if (currentPage <= 2) {
        arr.push(PageBtn(2), PageBtn(3), <span key="dots-e">...</span>);
      } else if (currentPage >= totalPages - 1) {
        arr.push(<span key="dots-s">...</span>, PageBtn(totalPages - 2), PageBtn(totalPages - 1));
      } else {
        arr.push(<span key="dots-m">...</span>, PageBtn(currentPage), PageBtn(currentPage + 1));
      }
  
      arr.push(PageBtn(totalPages));
      return arr;
    };
  
    return (
      <div className="flex justify-center gap-2 mt-6">
        <button onClick={() => jump(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1">←</button>
        {renderPages()}
        <button onClick={() => jump(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1">→</button>
      </div>
    );
  }
  