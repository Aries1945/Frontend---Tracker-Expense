export default function Pagination(props) {
  return (
    <div>
      <button
        className="text-md p-2 bg-gray-100 rounded-md mx-2"
        disabled={props.currentPage === 1}
        onClick={() => props.onPageChange(props.currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {props.currentPage} of {props.totalPages}
      </span>

      <button
        className="text-md p-2 bg-gray-100 rounded-md mx-2"
        disabled={props.currentPage === props.totalPages}
        onClick={() => props.onPageChange(props.currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
