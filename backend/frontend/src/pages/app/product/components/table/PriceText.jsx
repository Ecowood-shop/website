// Import styles
import { styled } from "styled-components";

const Container = styled.h3`
  text-align: center;
  b {
    margin-right: 0.5rem;
  }
  i {
    text-decoration: line-through;
    color: var(--red);
    margin-right: 0.6rem;
  }
`;

// Export price text
function PriceText({ t, product }) {
  return (
    <Container>
      {t("product.price")}:{" "}
      {product?.discount && parseFloat(product?.discount.percentage) > 0 ? (
        <>
          <i> {product.price}</i>
          {(
            parseFloat(product.price) -
            (parseFloat(product.price) *
              parseFloat(product.discount.percentage)) /
              100
          ).toFixed(2)}{" "}
          ₾
        </>
      ) : (
        <>{product.price} ₾ </>
      )}
    </Container>
  );
}

export default PriceText;
