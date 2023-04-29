import FormikControl from "../../../formik/FormikControl";

function Buttons({ styles, formik, t }) {
  const checkboxOptions = [
    {
      key:
        formik.values.updatePassword?.length > 0
          ? t("edit profile.edit profile")
          : t("edit profile.change password"),
      value: "true",
    },
  ];

  return (
    <>
      <div className={styles.passwordContainer}>
        <p>{t("edit profile.current password")}</p>
        <FormikControl
          control="input"
          type="password"
          label="password"
          name="password"
          className={styles.input + " w3-animate-left"}
          placeholder={t("edit profile.current password")}
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
          {t("global.submit")}
        </button>
      </div>
    </>
  );
}

export default Buttons;
