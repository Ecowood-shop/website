function Button(props) {
  return (
    <div className={props.styles.btnContainer}>
      <h2
        type="button"
        onClick={() => props.changer("register")}
      >
        რეგისტრაცია
      </h2>
      <div>
        <button
          type="submit"
          disabled={props.formik.isSubmitting}
          className={props.styles.btn}
        >
          შესვლა
        </button>
        <p onClick={() => props.changer("forgot")}>Forgot password?</p>
      </div>
    </div>
  );
}

export default Button;
