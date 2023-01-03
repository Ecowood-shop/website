// REACT
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getOrders,deleteOrder } from "../../../store/actions/adminActions";

// COMPONENTS
import OrderFilter from "../../../components/filter/OrderFilter";
import Table from "../../../components/table/Table";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Pagination from "../../../components/pagination/Pagination";
import Nav from "./Nav";

// OTHERS
import styles from "./style.module.scss";

const columns = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "მომხმარებელი",
    accessor: (d) => d.user.first_name + " " + d.user.last_name,
  },
  {
    Header: "ჩაბარებულია",
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
          მუშავდება
        </p>
      ),
  },
  {
    Header: "თანხა",
    accessor: (d) => Number(d.totalPrice) + Number(d.shippingPrice)+" ლ",
  },
];

function OrderScreen() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // QUERY PARAMS
  const word = searchParams.get("word");
  const status = searchParams.get("status");
  const page = searchParams.get("page");
  const id =searchParams.get("id")

  const adminOrders = useSelector((state) => state.adminOrders);
  const { error, loading, orders,success } = adminOrders;

  useEffect(() => {
    dispatch(getOrders(page, word, status,id));
  }, [dispatch,page, word, status,id,success]);
  console.log(orders?.Orders);
  return (
    <section className={styles.container}>
      <OrderFilter />
      <Nav styles={styles} navigate={navigate} />
      {loading && <Loader color="blueviolet" />}{" "}
      {error && <Message>{error}</Message>}
      {orders?.Orders && (
        <>
          <div className={styles.table}>
            <Table
              columns={columns}
              data={orders.Orders}
              link="/order/"
              linkEnd=""
              Delete={(id) => dispatch(deleteOrder(id))}
              text="პროდუქტის"
            />
          </div>
          <Pagination pages={orders.pages} page={orders.page} />
        </>
      )}
    </section>
  );
}

export default OrderScreen;
