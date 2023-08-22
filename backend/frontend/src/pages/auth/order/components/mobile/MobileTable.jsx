// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import components
import Product from "./Product";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem 0;
  flex-direction: column;

  border-radius: 20px;
  padding: 1rem 3rem 6rem 3rem;
  background-color: var(--white);

  ${respondTo.mobile`
    padding: 1rem 1rem 3rem 1rem;
  `}

  ${respondTo.lowTablet`
    padding: 1rem 1rem 3rem 1rem;
  `}
  
  ${respondTo.tablet`
    padding: 1rem 1rem 3rem 1rem;
  `}
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.h2`
  color: darkmagenta;
  font-size: var(--medium-s);
`;

const Body = styled.div`
  td {
    color: var(--black);
    border-bottom: 0.1rem solid whitesmoke;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Export product table for mobile
function MobileTable({ order, t }) {
  return (
    <Container className="w3-animate-right">
      {/* Header text */}
      <Header>
        <HeaderText>{t("cart.products")}</HeaderText>
      </Header>

      {/* Products table */}
      <Body>
        <ProductContainer>
          {order?.Order &&
            order?.Order.orderItems.map((product, index) => {
              return (
                <Product t={t} index={index} order={order} product={product} />
              );
            })}
        </ProductContainer>
      </Body>
    </Container>
  );
}

export default MobileTable;
