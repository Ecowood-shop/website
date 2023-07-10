// components
import FormikControl from "../../../../../formik/FormikControl";
import Select from "./Select";

function Inputs({ styles, categories, t }) {
  return (
    <div className={styles.grid}>
      {/* name */}
      <div className={styles.inputGroup}>
        <div>
          <label htmlFor="name_eng">
            {t("product.name(product)")} ({t("global.english")})
          </label>
          <FormikControl
            control="input"
            type="text"
            label="name_eng"
            name="name_eng"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>
        <div>
          <label htmlFor="name_geo">
            {t("product.name(product)")} ({t("global.georgian")})
          </label>
          <FormikControl
            control="input"
            type="text"
            label="name_geo"
            name="name_geo"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>
        <div>
          <label htmlFor="name_rus">
            {t("product.name(product)")} ({t("global.russian")})
          </label>
          <FormikControl
            control="input"
            type="text"
            label="name_rus"
            name="name_rus"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>
      </div>
      {/* brand */}
      <div className={styles.inputGroup}>
        <div>
          <label htmlFor="brand_eng">
            {" "}
            {t("product.brand")} ({t("global.english")})
          </label>
          <FormikControl
            control="input"
            type="text"
            label="brand_eng"
            name="brand_eng"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>
        <div>
          <label htmlFor="brand_geo">
            {t("product.brand")} ({t("global.georgian")})
          </label>
          <FormikControl
            control="input"
            type="text"
            label="brand_geo"
            name="brand_geo"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>
        <div>
          <label htmlFor="brand_rus">
            {t("product.brand")} ({t("global.russian")})
          </label>
          <FormikControl
            control="input"
            type="text"
            label="brand_rus"
            name="brand_rus"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>
      </div>

      {/* size */}
      <div className={styles.inputGroup}>
        <div>
          <label htmlFor="size_eng">
            {t("product.size")} ({t("global.english")})
          </label>
          <FormikControl
            control="input"
            type="text"
            label="size_eng"
            name="size_eng"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>
        <div>
          <label htmlFor="size_geo">
            {t("product.size")} ({t("global.georgian")})
          </label>
          <FormikControl
            control="input"
            type="text"
            label="size_geo"
            name="size_geo"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>
        <div>
          <label htmlFor="size_rus">
            {t("product.size")} ({t("global.russian")})
          </label>
          <FormikControl
            control="input"
            type="text"
            label="size_rus"
            name="size_rus"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>
      </div>

      {/* mix */}
      <div className={styles.inputGroup}>
        {/* youtube */}
        <div>
          <label htmlFor="youtubeUrl">Youtube</label>
          <FormikControl
            control="input"
            type="url"
            label="youtubeUrl"
            name="youtubeUrl"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>

        {/* coverage length */}
        <div>
          <label htmlFor="coverageLength">{t("product.coverage length")}</label>
          <FormikControl
            control="input"
            type="number"
            label="coverageLength"
            name="coverageLength"
            className={styles.input}
            placeholder="Enter text..."
          />
        </div>

        {/* category */}
        <div>
          <label htmlFor="category">{t("global.category")}</label>
          <Select styles={styles} categories={categories} t={t} />
        </div>

        {/* price */}
        <div>
          <label htmlFor="price">{t("product.price")}</label>
          <FormikControl
            control="input"
            type="number"
            label="price"
            name="price"
            className={styles.input}
            step={0.01}
            placeholder="Enter price..."
          />
        </div>
      </div>
    </div>
  );
}

export default Inputs;
