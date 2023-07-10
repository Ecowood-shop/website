// REACT
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../../../store/actions/userActions";

// COMPONENTS
import Section1 from "./sections/Section1";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Pagination from "../../../components/pagination/Pagination";

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
    Header: t("profile.total"),
    accessor: (d) => Number(d.totalPrice) + Number(d.shippingPrice) + " ₾",
  },
  {
    Header: t("global.delivered"),
    accessor: (d) =>
      d.isDelivered ? (
        <p
          style={{
            color: "green",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          {d?.deliveredAt.substring(0, 10)}
        </p>
      ) : (
        <p
          style={{
            color: "red",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          {t("global.processing")}
        </p>
      ),
  },
];

function Profile() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(["auth"]);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");

  const User = useSelector((state) => state.User);
  const { error, loading, user, orders } = User;

  useEffect(() => {
    dispatch(getUserOrders(page));
  }, [dispatch, page]);

  

  return (
    <article className={styles.container}>
      {loading && <Loader />}
      {user && (
        <>
          <Section1 user={user} navigate={navigate} t={t} />
          {orders?.Orders && (
            <section>
              <h1>{t("global.orders")}</h1>{" "}
              <div className={styles.table}>
                <Table
                  columns={columns(t)}
                  data={orders.Orders}
                  link="/order/"
                  linkEnd=""
                  text="პროდუქტის"
                  user
                />
              </div>
              <Pagination pages={orders.pages} page={orders.page} />
            </section>
          )}
        </>
      )}
    </article>
  );
}

export default Profile;
