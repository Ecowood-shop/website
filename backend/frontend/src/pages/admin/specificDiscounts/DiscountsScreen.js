// react
import { useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getDiscounts,
  deleteDiscount,
} from "../../../toolkit/discounts/actions";
import { reset } from "../../../toolkit/discounts/discountSlice";
import { useNavigate } from "react-router-dom";
// components
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Pagination from "../../../components/pagination/Pagination";
import DiscountFilter from "../../../components/filter/DiscountFilter";
import Table from "../../../components/table/Table";
import Nav from "./Nav";

// styles
import styles from "./styles.module.scss";

// translate
import { useTranslation } from "react-i18next";
function DiscountsScreen() {
  const { t } = useTranslation(["admin"]);
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  // QUERY PARAMS
  const word = searchParams.get("word");
  const page = searchParams.get("page");

  const discountSlice = useSelector((state) => state.discounts);
  const { error, isLoading, discounts, success } = discountSlice;

  useEffect(() => {
    dispatch(getDiscounts({ page: page, word: word }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, page, word, navigate]);

  const columns = (t) => [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: t("global.email"),
      accessor: "email",
    },
    {
      Header: t("product.product"),
      accessor: "product_name",
    },
    {
      Header: t("product.discount"),
      accessor: (discount) => discount.percentage.percentage + "%",
    },
  ];

  return (
    <article className={styles.container}>
      <DiscountFilter />
      <Nav styles={styles} navigate={navigate} t={t} />
      {isLoading && <Loader color={"darkmagenta"} />}
      {error && <Message>{error}</Message>}
      {discounts && (
        <>
          <div className={styles.table}>
            <Table
              columns={columns(t)}
              data={discounts ? discounts["Specific Discounts"] : discounts}
              link="/admin/discounts/"
              linkEnd="/edit"
              Delete={(id) => dispatch(deleteDiscount({ id: id }))}
              text={t("product.discount")}
            />
          </div>
          <Pagination pages={discounts.pages} page={discounts.page} />
        </>
      )}
    </article>
  );
}

export default DiscountsScreen;
