// Import styles
import styled from "styled-components";
// Import hooks
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Import components
import Table from "./Table";
import Product from "./Product";
// Import icons
import CartSVG from "../../../../static/icons/header/CartSVG";
import { ErrorSVG } from "../../../../static/icons/components";
import { respondTo } from "../../../../utils/styles/_respondTo";

const Container = styled.div`
  display: flex;
  width: 100%;
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

const MessageContainer = styled.div`
  ${(props) => props.$auth && "cursor:pointer;"}
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  margin: 3rem;
  color: var(--red);
  font-size: var(--small-l);

  p::first-letter {
    text-transform: capitalize;
  }
  svg {
    margin-bottom: 0.3rem;
    stroke: var(--red);
    height: 24px;
    width: 24px;
  }
`;

function MobileTable({ cart, t }) {
  // Initialize hooks
  const navigate = useNavigate();

  // Get user from userSlice
  const { user } = useSelector((state) => state.user);

  return (
    <Container className="w3-animate-right">
      {/* Header text */}
      <Header>
        <HeaderText>{t("cart.cart")}</HeaderText>
      </Header>

      {/* Products table */}
      <Body>
        <ProductContainer>
          {user &&
            cart &&
            cart.carts.map((cartItem, index) => {
              return (
                <Product
                  product={cart.products.find(
                    (item) => item._id === cartItem.product
                  )}
                  t={t}
                  key={index}
                  variant={cart.variants.find(
                    (item) => item.id === cartItem.variants
                  )}
                  cart={cartItem}
                />
              );
            })}
        </ProductContainer>

        {/* If cart is empty show message */}
        {cart?.carts?.length < 1 && (
          <MessageContainer>
            <CartSVG /> {t("cart.cart is empty")}
          </MessageContainer>
        )}

        {/* If user is not authorized require authorization */}
        {!user && (
          <MessageContainer $auth onClick={() => navigate("/authorization")}>
            <ErrorSVG />
            <p>{t("cart.authorization is required")}</p>
          </MessageContainer>
        )}

        {/* Sum Table */}
        {cart && cart?.carts?.length > 0 && <Table t={t} cart={cart} />}
      </Body>
    </Container>
  );
}

export default MobileTable;
