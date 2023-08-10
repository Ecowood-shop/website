// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

const Container = styled.div`
  top: 0;
  right: 0;
  position: absolute;
  padding: 0.5rem 1rem;

  color: var(--white);
  font-size: var(--medium-s);
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: var(--color-primary);

  ${respondTo.mobile`
  
    font-size:var(--small-l);
  `}

  &:empty {
    display: none;
  }
`;

function Discount({ product }) {
  return (
    <Container>
      {product?.discount && parseFloat(product?.discount.percentage) > 0 && (
        <>-{parseFloat(product.discount.percentage)}%</>
      )}
    </Container>
  );
}

export default Discount;
