// REACT
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../store/actions/systemActions";
import ADMIN from "../../../store/constants/adminConstants";
import { deleteProduct } from "../../../store/actions/adminActions";

// COMPONENTS
import Filter from "../../../components/filter/Filter";
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
    Header: t("product.name(product)"),
    accessor: "name_geo",
  },
  {
    Header: t("global.category"),
    accessor: "category",
  },
  {
    Header: t("product.price"),
    accessor: "price",
  },
];

function ProductsScreen() {
  const { t, i18n } = useTranslation(["admin"]);
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
  const { success } = adminProduct;

  useEffect(() => {
    dispatch({ type: ADMIN.UPDATE_PRODUCT_RESET });
    dispatch({ type: "GET_PRODUCT_RESET" });
    dispatch(getProducts(i18n.language, word, category, orderby, page));
  }, [dispatch, category, word, orderby, page, success, i18n.language]);
  console.log(products);
  return (
    <section className={styles.container}>
      <Filter />
      <Nav styles={styles} navigate={navigate} t={t} />
      {loading && <Loader color={"blueviolet"} />}{" "}
      {error && <Message>{error}</Message>}
      {products?.products && (
        <>
          <div className={styles.table}>
            {products && (
              <Table
                columns={columns(t)}
                data={products.products}
                link="/admin/products/"
                linkEnd="/edit"
                Delete={(id) => dispatch(deleteProduct(id))}
                text={t("global.product")}
              />
            )}
          </div>{" "}
          <Pagination pages={products.pages} page={products.page} />
        </>
      )}
    </section>
  );
}

export default ProductsScreen;
