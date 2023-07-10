// components
import FormikControl from "../../../../../formik/FormikControl";

function Textarea({ styles, t }) {
  return (
    <div className={styles.grid}>
      <div className={styles.inputGroup}>
        <div>
          <label htmlFor="technicalRequirements_eng">
            {t("product.technical requirements")} ({t("global.english")})
          </label>
          <FormikControl
            control="textarea"
            name="technicalRequirements_eng"
            className={styles.textarea}
            placeholder="Enter text here..."
          />
        </div>
        <div>
          <label htmlFor="technicalRequirements_geo">
            {t("product.technical requirements")} ({t("global.georgian")})
          </label>
          <FormikControl
            control="textarea"
            name="technicalRequirements_geo"
            className={styles.textarea}
            placeholder="Enter text here..."
          />
        </div>
        <div>
          <label htmlFor="technicalRequirements_rus">
            {t("product.technical requirements")} ({t("global.russian")})
          </label>
          <FormikControl
            control="textarea"
            name="technicalRequirements_rus"
            className={styles.textarea}
            placeholder="Enter text here..."
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <div>
          <label htmlFor="instructionForUse_eng">
            {t("product.terms of use")} ({t("global.english")})
          </label>
          <FormikControl
            control="textarea"
            name="instructionForUse_eng"
            className={styles.textarea}
            placeholder="Enter text here..."
          />
        </div>
        <div>
          <label htmlFor="instructionForUse_geo">
            {t("product.terms of use")} ({t("global.georgian")})
          </label>
          <FormikControl
            control="textarea"
            name="instructionForUse_geo"
            className={styles.textarea}
            placeholder="Enter text here..."
          />
        </div>
        <div>
          <label htmlFor="instructionForUse_rus">
            {t("product.terms of use")} ({t("global.russian")})
          </label>
          <FormikControl
            control="textarea"
            name="instructionForUse_rus"
            className={styles.textarea}
            placeholder="Enter text here..."
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <div>
          <label htmlFor="safetyStandard_eng">
            {t("product.safety standard")} ({t("global.english")})
          </label>
          <FormikControl
            control="textarea"
            name="safetyStandard_eng"
            className={styles.textarea}
            placeholder="Enter text here..."
          />
        </div>
        <div>
          <label htmlFor="safetyStandard_geo">
            {t("product.safety standard")} ({t("global.georgian")})
          </label>
          <FormikControl
            control="textarea"
            name="safetyStandard_geo"
            className={styles.textarea}
            placeholder="Enter text here..."
          />
        </div>
        <div>
          <label htmlFor="safetyStandard_rus">
            {t("product.safety standard")} ({t("global.russian")})
          </label>
          <FormikControl
            control="textarea"
            name="safetyStandard_rus"
            className={styles.textarea}
            placeholder="Enter text here..."
          />
        </div>
      </div>
    </div>
  );
}

export default Textarea;
