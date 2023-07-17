// REACT
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../toolkit/product/actions";

// COMPONENTS
import Filter from "../../../components/filter/Filter";
import Pagination from "../../../components/pagination/Pagination";
import Product from "../../../components/carousel/product/Product";

// OTHERS
import styles from "./styles.module.scss";
// translate
import { useTranslation } from "react-i18next";

function Products() {
  const { t, i18n } = useTranslation(["app"]);
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // QUERY PARAMS
  const category = searchParams.get("category");
  const word = searchParams.get("word");
  const orderby = searchParams.get("orderby");
  const page = searchParams.get("page");

  const productsSlice = useSelector((state) => state.products);
  const { error, isLoading, products } = productsSlice;

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
  }, [dispatch, category, word, orderby, page, i18n.language]);
  return (
    <article className={styles.container}>
      <Filter />
      {products?.products && (
        <>
          <section className={styles.section + " w3-animate-right"}>
            {products.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </section>{" "}
          <Pagination pages={products.pages} page={products.page} />
        </>
      )}
    </article>
  );
}

export default Products;
