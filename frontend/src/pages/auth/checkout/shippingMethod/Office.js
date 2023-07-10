// components
import FormikControl from "../../../../formik/FormikControl";

function Office({ styles, t }) {
  const radioOptions = [
    {
      key: "ecowood",
      value: "ecowood",
      label: (
        <>
          {" "}
          <label htmlFor="ecowood">
            <svg viewBox="0 0 64 64">
              <g data-name="HOUSE">
                <path d="M25.21 17v14H48L28.09 7.49 20.27 16h4a1 1 0 01.94 1z" />
                <path d="M12.61 24H19.4V42H12.61z" />
                <path d="M59.75 51v-1.19a3.6 3.6 0 002.86-3.52c0-.1-.84-10-3.61-10s-3.61 9.94-3.61 10a3.6 3.6 0 002.86 3.52V51h-9.77V33H34.91v18H33V33h-7.79v18h-1.94V18H5.82v33H0v2h64v-2zm-38.42 0h-1.94v-7h-6.78v7h-1.94V23a1 1 0 011-1h8.72a1 1 0 011 1z" />
              </g>
            </svg>
            {t("shipping method.ecowood")}
          </label>
        </>
      ),
    },
    {
      key: "express",
      value: "express",
      label: (
        <>
          {" "}
          <label htmlFor="express">
            <svg
              width={64}
              height={64}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.94 10h-6.45a2 2 0 00-2 2v7.35a2 2 0 002 2h6.45a2 2 0 002-2V12a2 2 0 00-2-2zM24.94 26.32h-6.45a2 2 0 00-2 2v7.35a2 2 0 002 2h6.45a2 2 0 002-2v-7.35a2 2 0 00-2-2zM24.94 42.65h-6.45a2 2 0 00-2 2V52a2 2 0 002 2h6.45a2 2 0 002-2v-7.35a2 2 0 00-2-2z"
                fill="#000"
              />
              <path
                d="M60 58h-4.94V26.1a2 2 0 00-2-2H48V4a2 2 0 00-2-2H10.94a2 2 0 00-2 2v54H4a2 2 0 100 4h56a2 2 0 000-4zM30.4 26.1V58H12.94V6H44v18.1H32.4a2 2 0 00-2 2z"
                fill="#000"
              />
            </svg>
            {t("shipping method.express branch")}
          </label>
        </>
      ),
    },
  ];
  return (
    <div className={styles.officeContainer}>
      <div className={styles.text}>
        <h2>{t("shipping method.select branch")}</h2>
        <hr />
        <p>* სამუშაო საათები - ეკოვუდი 10:00-18:00 (ყოველდღე)</p>
        <p>* სამუშაო საათები - ექსრპესს ფილიალი 10:00-18:00 (ყოველდღე)</p>
      </div>

      <div className={styles.radioContainer}>
        <FormikControl control="radio" name="_id" options={radioOptions} />
      </div>
    </div>
  );
}

export default Office;
