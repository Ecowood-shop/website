function Button(props) {
  return (
    <div className={props.styles.btnContainer}>
        <button
          type="submit"
          disabled={props.formik.isSubmitting}
          className={props.styles.btn}
        >
          submit
        </button>
    </div>
  );
}

export default Button;
