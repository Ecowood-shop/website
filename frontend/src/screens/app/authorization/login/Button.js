function Button(props) {
  return (
    <div className={props.styles.btnContainer}>
      <h2 type="button" onClick={() => props.changer("register")}>
        {props.t("global.register")}
      </h2>
      <div>
        <button
          type="submit"
          disabled={props.formik.isSubmitting}
          className={props.styles.btn}
        >
          {props.t("register.log in")}
        </button>
        <p onClick={() => props.changer("forgot")}>{props.t("register.forgot password")}</p>
      </div>
    </div>
  );
}

export default Button;
