// Import styles and icons
import { styled } from "styled-components";
import { ErrorSVG } from "../../../static/icons/components";
import { respondTo } from "../../../utils/styles/_respondTo";

// Import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

// Import components
import Nav from "./Nav";
import { OrderFilter as Filter } from "../../../components/filter";
import { Loader, Pagination, ErrorMessage, Table } from "../../../components";

// Import actions
import { reset } from "../../../toolkit/orders/orderSlice";
import { getOrders, deleteOrder } from "../../../toolkit/orders/actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1400px;
  padding: 3rem;

  ${respondTo.mobile`
    width:100%;
    padding: 3rem 1rem;
  `}

  ${respondTo.lowTablet`
    width:100%;
    padding: 3rem 1rem;
  `}

  ${respondTo.tablet`
    width:90%;
    padding: 3rem 1rem;
  `}
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  & > div {
    overflow-x: auto;
  }
`;

const MessageContainer = styled.div`
  ${(props) => props.$auth && "cursor:pointer;"}
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  margin: 1rem 0;
  padding: 1rem 0;
  border-radius: 20px;

  gap: 0.5rem;
  color: var(--red);
  font-size: var(--small-l);
  text-transform: capitalize;

  svg {
    stroke: var(--red);
    height: 24px;
    width: 24px;
  }

  ${respondTo.desktop`
  margin:7rem 0 1rem 0;
  `}
`;

const columns = (t) => [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: t("order.user"),
    accessor: (d) => d.user.first_name + " " + d.user.last_name,
  },
  {
    Header: t("order.delivered"),
    accessor: (d) =>
      d.isDelivered ? (
        <p
          style={{
            color: "green",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          {d?.deliveredAt.substring(0, 10)}
        </p>
      ) : (
        <p
          style={{
            color: "red",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          {t("order.in progress")}
        </p>
      ),
  },
  {
    Header: t("order.price"),
    accessor: (d) => Number(d.totalPrice) + Number(d.shippingPrice) + " ₾",
  },
];

// Export orders page
function OrderScreen() {
  // Initialize hoooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(["admin"]);
  const [searchParams] = useSearchParams();

  // Query params
  const word = searchParams.get("word");
  const status = searchParams.get("status");
  const page = searchParams.get("page");
  const id = searchParams.get("id");

  // Get orders from store
  const orderSlice = useSelector((state) => state.orders);
  const { error, isLoading, orders, success } = orderSlice;

  useEffect(() => {
    dispatch(getOrders({ page: page, word: word, status: status, id: id }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, page, word, status, id, success]);

  return (
    <Container>
      {/* Filter and nav bar */}
      <Filter />
      <Nav navigate={navigate} t={t} />

      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}

      {isLoading ? (
        <Loader color="darkmagenta" />
      ) : orders?.Orders?.length > 0 ? (
        <>
          <InnerContainer>
            {/* Orders table */}
            <Table
              columns={columns(t)}
              data={orders.Orders}
              link="/order/"
              linkEnd=""
              Delete={(id) => dispatch(deleteOrder({ id: id }))}
              text={t("order.order")}
            />
          </InnerContainer>

          {/* Pagination for orders */}
          <Pagination pages={orders.pages} page={orders.page} />
        </>
      ) : (
        <MessageContainer>
          <ErrorSVG />
          <p>{t("order.no orders found")}</p>
        </MessageContainer>
      )}
    </Container>
  );
}

export default OrderScreen;
