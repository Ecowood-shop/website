// REACT
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProducts, deleteProduct } from "../../../toolkit/product/actions";
import { reset } from "../../../toolkit/product/productSlice";

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

  const productSlice = useSelector((state) => state.products);
  const { error, isLoading, products, success } = productSlice;

  useEffect(() => {
    dispatch(
      getProducts({
        language: i18n.language,
        word: word,
        category: category,
        orderby: orderby,
        page: page,
      })
    );
    return () => {
      dispatch(reset());
    };
  }, [dispatch, category, word, orderby, page, success, i18n.language]);

  return (
    <section className={styles.container}>
      <Filter />
      <Nav styles={styles} navigate={navigate} t={t} />
      {isLoading && <Loader color={"blueviolet"} />}{" "}
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
                Delete={(id) => dispatch(deleteProduct({ id: id }))}
                text={t("global.product")}
              />
            )}
          </div>
          <Pagination pages={products.pages} page={products.page} />
        </>
      )}
    </section>
  );
}

export default ProductsScreen;
