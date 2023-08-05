// Import styled components
import { styled } from "styled-components";
// Import Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
//Import components
import { Pagination, Loader, Table } from "../../../../components";
// Import columns
import { columns } from "./Columns";
// Import actions
import { getOrders } from "../../../../toolkit/user/userOrderSlice";

// Main container which contains profile and side bar
const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

// User name + User surname
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-magenta);
  font-weight: bold;
  font-size: var(--large);
  text-transform: uppercase;

  text-align: center;
  font-size: var(--large);
  text-transform: capitalize;
`;

// Export orders component
function Orders({ t, navigate }) {
  // Hooks
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // User orders
  const userOrdersSlice = useSelector((state) => state.userOrders);
  const { isLoading, orders } = userOrdersSlice;

  // Get user orders
  useEffect(() => {
    dispatch(getOrders(page));
  }, [dispatch, page]);

  return (
    <Container>
      <Header>{t("profile.orders")}</Header>
      {isLoading && <Loader color="darkmagenta" />}
      {orders?.Orders && (
        <>
          <Table
            columns={columns(t)}
            data={orders.Orders}
            link="/order/"
            linkEnd=""
            text="პროდუქტის"
            user
          />
          <Pagination pages={orders.pages} page={orders.page} />
        </>
      )}
    </Container>
  );
}

export default Orders;
