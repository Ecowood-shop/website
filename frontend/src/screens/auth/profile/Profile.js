// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../store/actions/userActions";

// COMPONENTS
import Section1 from "./sections/Section1";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";

function Profile() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const User = useSelector((state) => state.User);
  const { error, loading, user } = User;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  console.log(user);
  return (
    <article className={styles.container}>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {user && (
        <>
          <Section1 user={user} navigate={navigate} />
          <section>
            <h1>შეკვეთები</h1>
          </section>
        </>
      )}
    </article>
  );
}

export default Profile;
