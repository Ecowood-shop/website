function Button(props) {
  return (
    <div className={props.styles.btnContainer}>
      <h2
        type="button"
        onClick={() => props.changer("login")}
        className={props.styles.btnLeft}
      >
        {props.t("register.log in")}
      </h2>
      <div>
        <button
          type="submit"
          disabled={props.formik.isSubmitting}
          className={props.styles.btn}
        >
           {props.t("register.send")}
        </button>
      </div>
    </div>
  );
}

export default Button;
