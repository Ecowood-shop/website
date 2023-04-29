// components
import FormikControl from "../../../../formik/FormikControl";

function Delivery({ styles, prices, t }) {
  const radioOptions = prices
    ? prices.map((price) => {
        return {
          key: "price" + price._id,
          value: String(price._id),
          label: (
            <>
              <label htmlFor={"price" + price._id}>
                <p>{price.location}</p>
                <div>
                  <p>
                    <b>ფასი 1: </b>
                    {price.upperLimit} ლ
                  </p>
                  <p>
                    <b>ზღვარი: </b>
                    {price.limit} ლ
                  </p>
                  <p>
                    <b>ფასი 2: </b>
                    {price.lowerLimit} ლ
                  </p>
                </div>
              </label>
            </>
          ),
        };
      })
    : [];
  console.log(radioOptions, prices);
  return (
    <div className={styles.officeContainer}>
      <div className={styles.text}>
        <h2>{t("shipping method.select city")}</h2>
        <hr />
        <p>
          * თუ კი კალათის ჯამური ფასი ცდება ზღვარს თქვენ ისარგებლებთ ფასი 1-ით
        </p>
        <p> * სხვა შემთხვევაში ფასი 2-ით</p>
      </div>
      <div className={styles.radioContainer}>
        {prices && (
          <div className={styles.priceContainer}>
            <FormikControl
              control="radio"
              name="cityId"
              options={radioOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Delivery;
