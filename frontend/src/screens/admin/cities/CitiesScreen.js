// REACT
import { useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCity,
  getShippingPrices,
} from "../../../store/actions/shippingActions";
import SHIPPING from "../../../store/constants/shippingConstants";

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

  const shipping = useSelector((state) => state.shipping);
  const { prices, loading, error, success } = shipping;
  useEffect(() => {
    dispatch({ type: SHIPPING.GET_CITY_RESET });
    dispatch(getShippingPrices(i18n.language));
  }, [dispatch, success, i18n.language]);

  return (
    <article className={styles.container}>
      <Nav styles={styles} navigate={navigate} t={t} />
      {loading && <Loader color={"blueviolet"} />}
      {error && <Message>{error}</Message>}
      {prices && (
        <div className={styles.table}>
          <Table
            columns={columns(t)}
            data={prices}
            link="/admin/cities/"
            linkEnd="/edit"
            Delete={(id) => dispatch(deleteCity(id))}
            text={t("order.city")}
          />
        </div>
      )}
    </article>
  );
}

export default CitiesScreen;
