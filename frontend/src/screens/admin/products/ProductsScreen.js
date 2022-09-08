// REACT
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../store/actions/systemActions";

// COMPONENTS
import Filter from "../../../components/filter/Filter";
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

  const systemProducts = useSelector((state) => state.systemProducts);
  const { error, loading, products } = systemProducts;
  const adminProduct = useSelector((state) => state.adminProduct);
  const { error: errorDelete, loading: loadingDelete, success } = adminProduct;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, success]);

  return (
    <section className={styles.container}>
      <Filter />
      <button
        className={styles.addBtn+" w3-animate-right"}
        onClick={() => navigate("/admin/products/create")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={styles.icon}
          viewBox="0 0 512 512"
        >
          <title>Add Circle</title>
          <path
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M256 176v160M336 256H176"
          />
        </svg>{" "}
        დამატება
      </button>
      {loading && <Loader />} {error && <Message>{error}</Message>}
      {products && (
        <div className={styles.table}>
          <Table columns={columns} data={products} link="/admin/products/" />
        </div>
      )}
      <Pagination />
    </section>
  );
}

export default ProductsScreen;
