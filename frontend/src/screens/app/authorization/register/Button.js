import React from "react";

function Button(props) {
  return (
    <div className={props.styles.btnContainer + " w3-animate-right"}>
      <h2 onClick={() => props.changer()}>ავტორიზაცია</h2>
      {props.nextPage ? (
        <button
          type="submit"
          className={props.styles.btn}
          disabled={!props.formik.isValid || props.formik.isSubmitting}
        >
          რეგისტრაცია
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            props.pageChanger();
          }}
          className={props.styles.btn}
        >
          შემდეგ
        </button>
      )}
    </div>
  );
}

export default Button;
