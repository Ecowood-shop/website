import FormikControl from "../../../formik/FormikControl";

function PasswordInputs({ styles, t }) {
  return (
    <>
      <FormikControl
        control="input"
        type="password"
        label="newPassword"
        name="newPassword"
        className={styles.input + " w3-animate-right"}
        placeholder={t("edit profile.new password")}
      />
      <FormikControl
        control="input"
        type="password"
        label="confirmPassword"
        name="confirmPassword"
        className={styles.input + " w3-animate-right"}
        placeholder={t("edit profile.confirm password")}
      />
    </>
  );
}

export default PasswordInputs;
