function Description({ styles, product, t }) {
  return (
    <div className={styles.description}>
      {/* <div>
        <p>
          <b>{t("product.brand")}</b>
        </p>
        <p>
          <b>{t("product.category")}</b>
        </p>{" "}
        {product.coverageLength && (
          <p>
            <b>
              {t("product.cover")}
              (1 {t("product.layer")})
            </b>
          </p>
        )}{" "}
        <p>
          <b>{t("product.volume")}</b>
        </p>
      </div>
      <div>
        <p>{product.brand}</p>
        <p>{product.category}</p>
        {product.coverageLength && (
          <p>
            {product.coverageLength} {t("product.meter")}
            <sup>2</sup>
          </p>
        )}{" "}
        <p>{product.size}</p>
      </div> */}
      <table>
        <tbody>
          <tr>
            <th>
              <b>{t("product.brand")}</b>
            </th>
            <td>{product.brand}</td>
          </tr>
          <tr>
            <th>
              <b>{t("product.category")}</b>
            </th>
            <td>{product.category}</td>
          </tr>
          {product.coverageLength && (
            <tr>
              <th>
                <b>{t("product.cover")}</b>
              </th>
              <td>
                {product.coverageLength} {t("product.meter")}
                <sup>2</sup> (1 {t("product.layer")})
              </td>
            </tr>
          )}
          <tr>
            <th>
              {" "}
              <b>{t("product.volume")}</b>
            </th>
            <td>{product.size}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Description;
