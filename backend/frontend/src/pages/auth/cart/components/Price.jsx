// Import styles
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h4`
  margin: 0;

  display: flex;
  width: max-content;
  font-size: var(--small-l);

  i {
    text-decoration: line-through;
    color: var(--color-error);
    margin-right: 0.6rem;
  }
`;
function Price({ product }) {
  return (
    <Container>
      {product?.discount && parseFloat(product?.discount.percentage) > 0 ? (
        <Text>
          <i> {product.price}</i>
          {(
            parseFloat(product.price) -
            (parseFloat(product.price) *
              parseFloat(product.discount.percentage)) /
              100
          ).toFixed(2)}{" "}
          ₾
        </Text>
      ) : (
        <Text>{product.price} ₾ </Text>
      )}
    </Container>
  );
}

export default Price;
