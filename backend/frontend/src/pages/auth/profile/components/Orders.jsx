// Import styled components
import { styled } from "styled-components";
// Import Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
//Import components
import {
  Pagination,
  Loader,
  Table,
  ErrorMessage,
} from "../../../../components";
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

  font-weight: bold;
  text-align: center;
  font-size: var(--medium-m);
  color: var(--color-magenta);
  text-transform: capitalize;
`;

const ErrorContainer = styled.div`
  margin: 1rem 0;

  & * {
    background: transparent;
    color: darkmagenta;
    fill: darkmagenta;
  }
`;
// Export orders component
function Orders({ t, i18n }) {
  // Hooks
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // User orders
  const userOrdersSlice = useSelector((state) => state.userOrders);
  const { isLoading, orders } = userOrdersSlice;

  // Get user orders
  useEffect(() => {
    dispatch(getOrders({ page: page, language: i18n.language }));
  }, [dispatch, page, i18n.language]);

  return (
    <Container>
      <Header>{t("profile.orders")}</Header>
      {isLoading ? (
        <Loader color="darkmagenta" />
      ) : (
        orders?.Orders && (
          <>
            <Table
              columns={columns(t)}
              data={orders.Orders}
              link="/order/"
              linkEnd=""
              text="პროდუქტის"
              user
            />

            {!orders?.Orders?.length > 0 && (
              <ErrorContainer>
                <ErrorMessage>{t("profile.no orders")}</ErrorMessage>
              </ErrorContainer>
            )}

            <Pagination pages={orders.pages} page={orders.page} />
          </>
        )
      )}
    </Container>
  );
}

export default Orders;
