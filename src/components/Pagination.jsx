export default function Pagination(props) {
  return (
    <div>
      <button
        disabled={props.currentPage === 1}
        onClick={() => props.onPageChange(props.currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {props.currentPage} of {props.totalPages}
      </span>

      <button
        disabled={props.currentPage === props.totalPages}
        onClick={() => props.onPageChange(props.currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}