function Description({ styles, product, t }) {
  return (
    <div className={styles.description}>
  
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
