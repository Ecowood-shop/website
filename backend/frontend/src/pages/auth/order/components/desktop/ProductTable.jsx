// Import styles
import styled from "styled-components";
// Import components
import Product from "./Product";

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

// Export product table
function ProductTable({ order, t }) {
  return (
    <Container className="w3-animate-right">
      {/* Header text */}
      <Header>
        <HeaderText>{t("cart.products")}</HeaderText>
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
              <Th>{t("global.price")}</Th>
              <Th>{t("global.quantity")}</Th>
            </Trow>
          </Thead>

          {/* Table body */}
          <Tbody>
            {order?.Order &&
              order?.Order.orderItems.map((product, index) => {
                return (
                  <Trow key={product._id}>
                    <Product
                      t={t}
                      index={index}
                      order={order}
                      product={product}
                    />
                  </Trow>
                );
              })}
          </Tbody>
        </Table>
      </Body>
    </Container>
  );
}

export default ProductTable;
