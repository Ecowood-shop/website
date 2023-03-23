function Button(props) {
  return (
    <div className={props.styles.btnContainer}>
      <h2
        type="button"
        onClick={() => props.changer("login")}
        className={props.styles.btnLeft}
      >
        ავტორიზაცია
      </h2>
      <div>
        <button
          type="submit"
          disabled={props.formik.isSubmitting}
          className={props.styles.btn}
        >
          გაგზავნა
        </button>
      </div>
    </div>
  );
}

export default Button;
