import React from "react";

function Button(props) {
  return (
    <div className={props.styles.btnContainer + " w3-animate-right"}>
      <h2 onClick={() => props.changer("login")}>
        {props.t("register.log in")}
      </h2>
      {props.nextPage ? (
        <button
          type="submit"
          className={props.styles.btn}
          disabled={props.formik.isSubmitting}
        >
          {props.t("global.register")}
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            props.pageChanger();
          }}
          className={props.styles.btn}
        >
          {props.t("register.next")}
        </button>
      )}
    </div>
  );
}

export default Button;
