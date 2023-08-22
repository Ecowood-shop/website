// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import hooks
import { useDispatch, useSelector } from "react-redux";
// Import actions and helper functions
import { getDetails } from "../getDetails";
import { delivered } from "../../../../toolkit/orders/actions";

const Container = styled.div`
  min-width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${respondTo.desktop`
    min-width:60%;
  `}

  ${respondTo.tv`
    min-width:60%;
  `}
`;

const Header = styled.h3`
  font-size: var(--medium-s);
`;

const Table = styled.div`
  min-width: 100%;
  display: grid;
  column-gap: 5rem;
  grid-template-columns: repeat(2, 1fr);

  ${respondTo.mobile`
    grid-template-columns: repeat(1, 1fr);
  `}

  ${respondTo.lowTablet`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

const TableItem = styled.div`
  display: flex;
  font-size: var(--small-l);

  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3),
  &:nth-of-type(4) {
    grid-column: 1;
  }

  &:nth-of-type(5) {
    grid-column: 2;
    grid-row: 1;
  }

  &:nth-of-type(6) {
    grid-column: 2;
    grid-row: 2;
  }

  &:nth-of-type(7) {
    grid-column: 2;
    grid-row: 3;
  }

  &:nth-of-type(8) {
    grid-column: 2;
    grid-row: 4;
  }

  ${(props) => props.$last && "grid-column:2;"}

  ${respondTo.mobile`
    &:nth-of-type(5) {
        grid-column:1;
        grid-row:5;
    }
    &:nth-of-type(6) {
        grid-column:1;
        grid-row:6;
    }

    &:nth-of-type(7) {
        grid-column:1;
        grid-row:7;
    }

    &:nth-of-type(8) {
        grid-column:1;
        grid-row:8;
    }

    &:nth-of-type(9) {
        grid-column:1;
        grid-row:9;
    }
  `}

  ${respondTo.lowTablet`
    &:nth-of-type(5) {
        grid-column:1;
        grid-row:5;
    }
    &:nth-of-type(6) {
        grid-column:1;
        grid-row:6;
    }

    &:nth-of-type(7) {
        grid-column:1;
        grid-row:7;
    }

    &:nth-of-type(8) {
        grid-column:1;
        grid-row:8;
    }

    &:nth-of-type(9) {
        grid-column:1;
        grid-row:9;
    }
  `}
`;

const TableLabel = styled.p`
  min-width: 7rem;
  margin-right: 2rem;

  text-transform: capitalize;
`;

const TableText = styled.p`
  display: flex;
  margin-left: auto;
  text-align: end;
  text-transform: capitalize;

  ${(props) => props.$none && "text-transform:none;"}
  ${(props) => props.$status && "color:var(--red);"}
  ${(props) => props.$success && "color:green;text-decoration:underline;"}
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 0.3rem;
  margin: 0.5rem 0;

  border: none;
  border-radius: 20px;

  color: var(--white);
  font-size: var(--small-l);
  transition: color 0.1s ease-in-out;
  background-color: var(--color-primary);

  ${respondTo.desktop`
    &:hover {
        color: var(--whiteWithOpacity);
    }
  `}

  ${respondTo.tv`
    &:hover {
        color: var(--whiteWithOpacity);
    }
  `}
`;

// Export details order component
function Details({ t, order, id }) {
  // Initialize hooks
  const dispatch = useDispatch();
  // Get user from store
  const { user } = useSelector((state) => state.user);
  const { ID, username } = getDetails(order);
  return (
    <Container>
      <Header>{t("order.details")}</Header>

      <Table>
        {/* ID number */}
        <TableItem>
          <TableLabel>ID</TableLabel>
          <TableText>{ID}</TableText>
        </TableItem>

        {/* Phone number */}
        <TableItem>
          <TableLabel>{t("order.phone")}</TableLabel>
          <TableText>
            {order.Order.shippingAddress
              ? order.Order.shippingAddress.phone
              : order.Order.withoutShipping.phone}
          </TableText>
        </TableItem>

        {/* Receiver credentials */}
        <TableItem>
          <TableLabel>{t("order.receiver")}</TableLabel>
          <TableText>{username}</TableText>
        </TableItem>

        {/* Delivery */}
        {order.Order.wants_delivery ? (
          <TableItem>
            <TableLabel>{t("order.address")}</TableLabel>
            <TableText $none>
              {order.Order.shippingAddress.location},
              {order.Order.shippingAddress.address}
            </TableText>
          </TableItem>
        ) : (
          <TableItem>
            <TableLabel>{t("order.office")}</TableLabel>
            <TableText>
              {order.Order.withoutShipping.warehouse.location}
            </TableText>
          </TableItem>
        )}

        {/* Shipping price */}
        {order.Order.wants_delivery && (
          <TableItem>
            <TableLabel>{t("order.shipping")}</TableLabel>
            <TableText>{order.Order.shippingPrice} ₾</TableText>
          </TableItem>
        )}

        {/* Order total price */}
        <TableItem>
          <TableLabel>{t("order.total")}</TableLabel>
          <TableText>
            {Number(order.Order.totalPrice) + Number(order.Order.shippingPrice)}{" "}
            ₾
          </TableText>
        </TableItem>

        {/* Order date */}
        <TableItem>
          <TableLabel>{t("order.date")}</TableLabel>
          <TableText>{order.Order.createdAt.substring(0, 10)}</TableText>
        </TableItem>

        {/* Order status */}
        <TableItem>
          <TableLabel>
            {order.Order.isDelivered ? t("order.delivered") : t("order.status")}
          </TableLabel>
          <TableText $success={order.Order.isDelivered} $status>
            {order.Order.isDelivered
              ? order.Order.deliveredAt.substring(0, 10)
              : t("order.in progress")}
          </TableText>
        </TableItem>

        <TableItem $last>
          {user.is_staff && !order.Order.isDelivered && (
            <Button onClick={() => dispatch(delivered({ id: id }))}>
              {t("order.delivered")}
            </Button>
          )}
        </TableItem>
      </Table>
    </Container>
  );
}

export default Details;
