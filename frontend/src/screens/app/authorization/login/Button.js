
function Button(props) {
  return (
    <div className={props.styles.btnContainer}>
      <h2 onClick={() => props.changer()}>რეგისტრაცია</h2>
      <button
        type="submit"
        disabled={!props.formik.isValid || props.formik.isSubmitting}
        className={props.styles.btn}
      >
        შესვლა
      </button>
    </div>
  );
}

export default Button;
