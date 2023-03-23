import FormikControl from "../../../formik/FormikControl";

function Buttons({ styles, formik }) {
  const checkboxOptions = [
    {
      key:
        formik.values.updatePassword?.length > 0
          ? "პროფილის რედაქტირება"
          : "პაროლის შეცვლა",
      value: "true",
    },
  ];

  return (
    <>
      <div className={styles.passwordContainer}>
        <p>მიმდინარე პაროლი</p>
        <FormikControl
          control="input"
          type="password"
          label="password"
          name="password"
          className={styles.input + " w3-animate-left"}
          placeholder="მიმდინარე პაროლი"
        />
      </div>
      <div className={styles.btnContainer}>
        <FormikControl
          control="checkbox"
          name="updatePassword"
          options={checkboxOptions}
          styles={styles.checkbox}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={formik.isSubmitting}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Buttons;
