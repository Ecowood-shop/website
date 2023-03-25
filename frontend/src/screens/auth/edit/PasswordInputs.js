import FormikControl from "../../../formik/FormikControl";

function PasswordInputs({ styles }) {
  return (
    <>
      <FormikControl
        control="input"
        type="password"
        label="newPassword"
        name="newPassword"
        className={styles.input + " w3-animate-right"}
        placeholder="ახალი პაროლი"
      />
      <FormikControl
        control="input"
        type="password"
        label="confirmPassword"
        name="confirmPassword"
        className={styles.input + " w3-animate-right"}
        placeholder="გაიმეორეთ პაროლი"
      />
    </>
  );
}

export default PasswordInputs;
