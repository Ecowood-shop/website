// REACT
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../../store/actions/adminActions";

// COMPONENTS
import OrderFilter from "../../../components/filter/OrderFilter";
import Table from "../../../components/table/Table";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Pagination from "../../../components/pagination/Pagination";

// OTHERS
import styles from "./style.module.scss";

const columns = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "მომხმარებელი",
    accessor: d=>d.user.first_name + " " + d.user.last_name,
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
          ჩაბარებულია
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
    accessor: "totalPrice",
  },
];

function OrderScreen() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // QUERY PARAMS
  const category = searchParams.get("category");
  const word = searchParams.get("word");
  const orderby = searchParams.get("orderby");
  const page = searchParams.get("page");

  const adminOrders = useSelector((state) => state.adminOrders);
  const { error, loading, orders } = adminOrders;

  useEffect(() => {
    dispatch(getOrders(word, category, orderby, page));
  }, [dispatch]);
  console.log(orders);
  return (
    <section className={styles.container}>
      <OrderFilter />
      {loading && <Loader />} {error && <Message>{error}</Message>}
      {orders && (
        <>
          <div className={styles.table}>
            <Table
              columns={columns}
              data={orders}
              link="/order/"
              linkEnd=""
              // Delete={(id)=>dispatch(deleteProduct(id))}
              text="პროდუქტის"
            />
          </div>
          {/* <Pagination pages={products.pages} page={products.page} /> */}
        </>
      )}
    </section>
  );
}

export default OrderScreen;
