// REACT
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail, reset } from "../../../toolkit/auth/verificationSlice";

// COMPONENTS
import { ErrorMessage, Loader } from "../../../components";
// OTHERS
import styles from "./styles.module.scss";

// translate
import { useTranslation } from "react-i18next";

function Verification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { i18n } = useTranslation(["app"]);

  const verificationSlice = useSelector((state) => state.verification);
  const { isLoading, success, error } = verificationSlice;

  useEffect(() => {
    dispatch(
      verifyEmail({
        id: params.id,
        token: params.token,
        language: i18n.language,
      })
    );
  }, [dispatch, params.id, params.token, i18n.language]);

  useEffect(() => {
    if (success) {
      navigate("/");
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, success]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isLoading ? <Loader /> : error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </div>
  );
}

export default Verification;
