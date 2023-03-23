import FormikControl from "../../../formik/FormikControl";

function Inputs({ styles }) {
  return (
    <div className={styles.inputContainer}>
      <FormikControl
        control="input"
        type="text"
        label="firstName"
        name="firstName"
        className={styles.input + " w3-animate-left"}
        placeholder="სახელი"
      />
      <FormikControl
        control="input"
        type="text"
        label="lastName"
        name="lastName"
        className={styles.input + " w3-animate-left"}
        placeholder="გვარი"
      />
      <FormikControl
        control="input"
        type="tel"
        label="phone"
        name="phone"
        className={styles.input + " w3-animate-left"}
        placeholder="ტელეფონი"
      />
  
    </div>
  );
}

export default Inputs;
