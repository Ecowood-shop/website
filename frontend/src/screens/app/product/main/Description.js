
function Description({product}) {
  return (
    <>
      <p>
        <b>ბრენდი:</b>
        {product.brand}
      </p>
      <p>
        <b>კატეგორია:</b>
        {product.category}
      </p>
      {product.coverageLength && (
        <p>
          <b>დაფარვა (1ფენა):</b>
          {product.coverageLength} მ<sup>2</sup>
        </p>
      )}
      <p>
        <b>მოცულობა:</b>
        {product.size}
      </p>
    </>
  );
}

export default Description;
