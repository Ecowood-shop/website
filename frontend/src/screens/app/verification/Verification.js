// REACT
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { verification, getUser } from "../../../store/actions/userActions";

// COMPONENTS
import Message from "../../../components/Message/Message";
import Loader from "../../../components/loader/Loader";

// OTHERS
import styles from "./styles.module.scss";

// translate
import { useTranslation } from "react-i18next";

function Verification() {
  const dispatch = useDispatch();
  const params = useParams();
  const { t } = useTranslation(["app"]);
  const User = useSelector((state) => state.User);
  const {
    loadingUser: loading,
    errorVerification: error,
    successVerification,
  } = User;

  useEffect(() => {
    dispatch(verification(params.id, params.token));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (successVerification) {
      console.log("verification run");
      dispatch(getUser());
    }
  }, [dispatch, successVerification, params.id, params.token]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <Message>{error}</Message>}
        {successVerification && (
          <div className={styles.table}>
            {" "}
            <h1>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
              </svg>
              {t("verification.account verified")}
            </h1>
            <Link to={"/"} replace={true} className={styles.link}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
              {t("verification.navigate to homepage")}
            </Link>
          </div>
        )}{" "}
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default Verification;
