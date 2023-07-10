import FormikControl from "../../../formik/FormikControl";

function Inputs({ styles, t }) {
  return (
    <div className={styles.inputContainer}>
      <FormikControl
        control="input"
        type="text"
        label="firstName"
        name="firstName"
        className={styles.input + " w3-animate-left"}
        placeholder={t("edit profile.first name")}
      />
      <FormikControl
        control="input"
        type="text"
        label="lastName"
        name="lastName"
        className={styles.input + " w3-animate-left"}
        placeholder={t("edit profile.last name")}
      />
      <FormikControl
        control="input"
        type="tel"
        label="phone"
        name="phone"
        className={styles.input + " w3-animate-left"}
        placeholder={t("edit profile.phone")}
      />
    </div>
  );
}

export default Inputs;
