// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser,getUserOrders } from "../../../store/actions/userActions";

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
    accessor: "price",
  },
  {
    Header: "ჩაბარებულია",
    accessor: "category",
  },
];

function Profile() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const User = useSelector((state) => state.User);
  const { error, loading, user,orders } = User;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserOrders())
  }, [dispatch]);
  console.log(user);
  console.log(orders)
  return (
    <article className={styles.container}>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {user && (
        <>
          <Section1 user={user} navigate={navigate} />
          <section>
            <h1>შეკვეთები</h1>{" "}
            <div className={styles.table}>
              <Table
                columns={columns}
                data={[]}
                link="/order/"
                linkEnd=""
                Delete={(id) => console.log(id)}
                text="პროდუქტის"
                user
              />
            </div>
            {/* <Pagination pages={products.pages} page={products.page} /> */}
          </section>
        </>
      )}
    </article>
  );
}

export default Profile;
