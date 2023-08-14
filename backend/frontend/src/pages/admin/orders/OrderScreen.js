// REACT
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getOrders, deleteOrder } from "../../../toolkit/orders/actions";
import { reset } from "../../../toolkit/orders/orderSlice";

// COMPONENTS
import OrderFilter from "../../../components/filter/OrderFilter";
import Table from "../../../components/table/Table";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Pagination from "../../../components/pagination/Pagination";
import Nav from "./Nav";

// OTHERS
import styles from "./style.module.scss";

// translate
import { useTranslation } from "react-i18next";
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
    accessor: (d) => Number(d.totalPrice) + Number(d.shippingPrice) + " ლ",
  },
];

function OrderScreen() {
  const { t } = useTranslation(["admin"]);
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // QUERY PARAMS
  const word = searchParams.get("word");
  const status = searchParams.get("status");
  const page = searchParams.get("page");
  const id = searchParams.get("id");

  const orderSlice = useSelector((state) => state.orders);
  const { error, isLoading, orders, success } = orderSlice;

  useEffect(() => {
    dispatch(getOrders({ page: page, word: word, status: status, id: id }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, page, word, status, id, success]);

  return (
    <section className={styles.container}>
      <OrderFilter />
      <Nav styles={styles} navigate={navigate} t={t} />
      {isLoading && <Loader color="darkmagenta" />}
      {error && <Message>{error}</Message>}
      {orders?.Orders && (
        <>
          <div className={styles.table}>
            <Table
              columns={columns(t)}
              data={orders.Orders}
              link="/order/"
              linkEnd=""
              Delete={(id) => dispatch(deleteOrder({ id: id }))}
              text={t("order.order")}
            />
          </div>
          <Pagination pages={orders.pages} page={orders.page} />
        </>
      )}
    </section>
  );
}

export default OrderScreen;
