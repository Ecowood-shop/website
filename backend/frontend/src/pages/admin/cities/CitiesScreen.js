// REACT
import { useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getShippingPrices,
  deleteShippingPrice,
} from "../../../toolkit/shipping/actions";
import { reset } from "../../../toolkit/shipping/shippingPriceSlice";

// COMPONENTS
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Table from "../../../components/table/Table";
import Nav from "./Nav";

// OTHERS
import styles from "./styles.module.scss";

// translate
import { useTranslation } from "react-i18next";
const columns = (t) => [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: t("order.cities"),
    accessor: "location",
  },
  {
    Header: t("order.limit"),
    accessor: (city) => city.limit + "  ₾",
  },
];
function CitiesScreen() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["admin"]);

  const shippingPriceSlice = useSelector((state) => state.shippingPrices);
  const { error, isLoading, shippingPrices, success } = shippingPriceSlice;

  useEffect(() => {
    dispatch(getShippingPrices({ language: i18n.language }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, i18n.language]);

  return (
    <article className={styles.container}>
      <Nav styles={styles} navigate={navigate} t={t} />
      {isLoading && <Loader color={"darkmagentaa"} />}
      {error && <Message>{error}</Message>}
      {shippingPrices && (
        <div className={styles.table}>
          <Table
            columns={columns(t)}
            data={shippingPrices}
            link="/admin/cities/"
            linkEnd="/edit"
            Delete={(id) => dispatch(deleteShippingPrice({ id: id }))}
            text={t("order.city")}
          />
        </div>
      )}
    </article>
  );
}

export default CitiesScreen;
