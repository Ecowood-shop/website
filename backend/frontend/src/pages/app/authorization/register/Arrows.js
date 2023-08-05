export const LeftArrow = (props) => (
  <button
    className={props.styles.btnBlock + " blockCarousel-btn btn--left"}
    onClick={() => props.pageChanger()}
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="btn-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

export const RightArrow = (props) => (
  <button
    className={props.styles.btnBlock + " blockCarousel-btn btn--right"}
    type="button"
    onClick={() => {
      props.pageChanger();
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="btn-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);
