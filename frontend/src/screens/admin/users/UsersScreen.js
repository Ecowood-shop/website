// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../store/actions/systemActions";

// COMPONENTS
import UserFilter from "../../../components/filter/UserFilter";
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
    Header: "სახელი",
    accessor: "first_name",
  },
  {
    Header: "გვარი",
    accessor: "last_name",
  },
  {
    Header: "მეილი",
    accessor: "mail",
  },
  {
    Header: "ადმინი",
    accessor: "isAdmin",
  },
];

function UsersScreen() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const systemProducts = useSelector((state) => state.systemProducts);
  const { error, loading, products } = systemProducts;

  const adminProduct = useSelector((state) => state.adminProduct);
  const { error: errorDelete, loading: loadingDelete, success } = adminProduct;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, success]);

  return (
    <section className={styles.container}>
      <UserFilter />
      {loading && <Loader />} {error && <Message>{error}</Message>}
      {products && (
        <div className={styles.table}>
          <Table columns={columns} data={products} link="/admin/users/" user />
        </div>
      )}
      <Pagination />
    </section>
  );
}

export default UsersScreen;
