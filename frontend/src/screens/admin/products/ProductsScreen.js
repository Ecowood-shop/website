// REACT
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../store/actions/systemActions";

// COMPONENTS
import Filter from "../../../components/filter/Filter";
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
    Header: "დასახელება",
    accessor: "name_geo",
  },
  {
    Header: "კატეგორია",
    accessor: "category",
  },
  {
    Header: "ფასი",
    accessor: "price",
  },
];

function ProductsScreen() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // QUERY PARAMS
  const category = searchParams.get("category");
  const word = searchParams.get("word");
  const orderby = searchParams.get("orderby");
  const page = searchParams.get("page");

  const systemProducts = useSelector((state) => state.systemProducts);
  const { error, loading, products } = systemProducts;

  const adminProduct = useSelector((state) => state.adminProduct);
  const { error: errorDelete, loading: loadingDelete, success } = adminProduct;

  useEffect(() => {
    dispatch({ type: "RESET_PRODUCT" });
    dispatch(getProducts(word, category, orderby, page));
  }, [dispatch, category, word, orderby, page]);

  return (
    <section className={styles.container}>
      <Filter />
      <Nav styles={styles} navigate={navigate} />
      {loading && <Loader />} {error && <Message>{error}</Message>}
      {products && (
        <>
          <div className={styles.table}>
            <Table
              columns={columns}
              data={products.products}
              link="/admin/products/"
            />
          </div>{" "}
          <Pagination pages={products.pages} page={products.page} />
        </>
      )}
    </section>
  );
}

export default ProductsScreen;
