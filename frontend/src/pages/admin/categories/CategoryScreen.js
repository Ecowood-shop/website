// REACT
import { useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  deleteCategory,
} from "../../../toolkit/category/actions";
import { reset } from "../../../toolkit/category/categorySlice";

// components
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Table from "../../../components/table/Table";
import Nav from "./Nav";
// styles
import styles from "./styles.module.scss";
// translate
import { useTranslation } from "react-i18next";
const columns = (t) => [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: t("global.category"),
    accessor: "name",
  },
];

function CategoryScreen() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["admin"]);

  const categoriesSlice = useSelector((state) => state.categories);
  const { error, isLoading, categories, success } = categoriesSlice;

  useEffect(() => {
    dispatch(getCategories({ language: i18n.language }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, i18n.language]);

  return (
    <article className={styles.container}>
      <Nav styles={styles} navigate={navigate} t={t} />
      {isLoading && <Loader color="darkmagenta" />}
      {error && <Message>{error}</Message>}
      {categories && (
        <div className={styles.table}>
          <Table
            columns={columns(t)}
            data={categories}
            link="/admin/categories/"
            linkEnd="/edit"
            Delete={(id) => dispatch(deleteCategory({ id: id }))}
            text={t("global.category")}
          />
        </div>
      )}
    </article>
  );
}

export default CategoryScreen;
