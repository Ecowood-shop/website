// components
import FormikControl from "../../../../components/formik/FormikControl";

function RadioContainer({ styles, t }) {
  const radioOptions = [
    {
      key: "True",
      value: "True",
      label: (
        <>
          <label htmlFor="True">
            <svg
              id="Icons"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 32 32"
              xmlSpace="preserve"
            >
              <style>
                {
                  ".st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
                }
              </style>
              <path className="st0" d="M2 9L19 9 19 24 10 24" />
              <circle className="st0" cx={24} cy={24} r={2} />
              <circle className="st0" cx={8} cy={24} r={2} />
              <path className="st0" d="M19 24L19 13 25 13 29 18 29 24 26 24" />
              <path className="st0" d="M4 13L13 13" />
              <path className="st0" d="M2 17L11 17" />
              <path fill="none" d="M-288 -432H248V248H-288z" />
            </svg>
            {t("shipping method.delivery")}
          </label>
        </>
      ),
    },
    {
      key: "False",
      value: "False",
      label: (
        <>
          <label htmlFor="False">
            <svg viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M21 19h2v2H1v-2h2V4a1 1 0 011-1h10a1 1 0 011 1v15h2V9h3a1 1 0 011 1v9zM7 11v2h4v-2H7zm0-4v2h4V7H7z" />
            </svg>
            {t("shipping method.in-store pickup")}
          </label>
        </>
      ),
    },
  ];
  return (
    <div className={styles.radioContainer + " " + styles.center}>
      <FormikControl
        control="radio"
        name="wants_delivery"
        options={radioOptions}
      />
    </div>
  );
}

export default RadioContainer;
