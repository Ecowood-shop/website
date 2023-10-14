// Import styles
import styled from "styled-components";
// Import hooks
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Import components
import Product from "./Product";
// Import icons
import CartSVG from "../../../../static/icons/header/CartSVG";
import { ErrorSVG } from "../../../../static/icons/components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  border-radius: 20px;
  padding: 1rem 3rem 6rem 3rem;
  background-color: var(--white);
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

const Table = styled.table`
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  th {
    &:first-child {
      border-radius: 20px 0 0 0;
    }

    &:last-child {
      border-radius: 0 20px 0 0;
    }
  }
`;
const Trow = styled.tr``;
const Th = styled.th`
  padding: 1rem;
  background-color: darkmagenta;

  text-align: center;
  text-transform: capitalize;
  font-size: var(--small-l);
  color: var(--white);
`;

const Tbody = styled.tbody``;

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
    stroke: var(--red);
    height: 24px;
    width: 24px;
  }
`;

// Export product table
function ProductTable({ cart, t, i18n }) {
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
        <Table>
          {/* Table header */}
          <Thead>
            <Trow>
              <Th></Th>
              <Th>{t("global.product name")}</Th>
              <Th>{t("global.color")}</Th>
              <Th>{t("global.volume")}</Th>
              <Th>{t("global.quantity")}</Th>
              <Th>{t("global.price")}</Th>
              <Th></Th>
            </Trow>
          </Thead>

          {/* Table body */}
          <Tbody>
            {user &&
              cart &&
              cart.carts.map((cartItem, index) => {
                return (
                  <Trow key={index}>
                    <Product
                      product={cart.products.find(
                        (item) => item._id === cartItem.product
                      )}
                      t={t}
                      i18n={i18n}
                      key={index}
                      variant={cart.variants.find(
                        (item) => item.id === cartItem.variants
                      )}
                      cart={cartItem}
                    />
                  </Trow>
                );
              })}
          </Tbody>
        </Table>

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
      </Body>
    </Container>
  );
}

export default ProductTable;
