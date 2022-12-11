// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser, getUserOrders } from "../../../store/actions/userActions";

// COMPONENTS
import Section1 from "./sections/Section1";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Table from "../../../components/table/Table";

// OTHERS
import styles from "./styles.module.scss";

const columns = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "თანხა",
    accessor: (d) => d.totalPrice + " ლ",
  },
  {
    Header: "ჩაბარებულია",
    accessor: (d) =>
      d.isDelivered ? (
        <p
          style={{
            color: "green",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          ჩაბარებულია
        </p>
      ) : (
        <p
          style={{
            color: "red",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          მუშავდება
        </p>
      ),
  },
];

function Profile() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const User = useSelector((state) => state.User);
  const { error, loading, user, orders } = User;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserOrders());
  }, [dispatch]);

  console.log(user);
  console.log(orders);

  return (
    <article className={styles.container}>
      {loading && <Loader />}
      {user && (
        <>
          <Section1 user={user} navigate={navigate} />
          {orders && (
            <section>
              <h1>შეკვეთები</h1>{" "}
              <div className={styles.table}>
                <Table
                  columns={columns}
                  data={orders}
                  link="/order/"
                  linkEnd=""
                  Delete={(id) => console.log(id)}
                  text="პროდუქტის"
                  user
                />
              </div>
              {/* <Pagination pages={products.pages} page={products.page} /> */}
            </section>
          )}
        </>
      )}
    </article>
  );
}

export default Profile;
