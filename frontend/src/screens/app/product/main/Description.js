function Description({ product, t }) {
  return (
    <>
      <p>
        <b>{t("product.brand")}:</b>
        {product.brand}
      </p>
      <p>
        <b>{t("product.category")}:</b>
        {product.category}
      </p>
      {product.coverageLength && (
        <p>
          <b>
            {t("product.cover")}
            (1 {t("product.layer")}):
          </b>
          {product.coverageLength} {t("product.meter")}
          <sup>2</sup>
        </p>
      )}
      <p>
        <b>{t("product.volume")}:</b>
        {product.size}
      </p>
    </>
  );
}

export default Description;
