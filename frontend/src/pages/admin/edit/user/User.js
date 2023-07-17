// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser } from "../../../../toolkit/users/actions";
import { reset } from "../../../../toolkit/users/usersSlice";
import { useForm } from "react-hook-form";

// COMPONENTS
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";
// translate
import { useTranslation } from "react-i18next";
function User() {
  const { t } = useTranslation(["admin"]);
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const usersSlice = useSelector((state) => state.users);
  const { error, isLoading, user, success } = usersSlice;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(updateUser({ formData: data, id: id }));
  };

  useEffect(() => {
    dispatch(getUser({ id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) navigate("/admin/users/");
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, success]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/users/")}
        className={styles.button}
      >
        {t("global.back")}
      </button>
      {isLoading && <Loader color="darkmagenta" />}{" "}
      {error && <Message>{error}</Message>}
      {user && (
        <section>
          <h1>{t("global.edit")}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>{t("user.first name")}</label>
              <input
                placeholder="enter text..."
                {...register("first_name")}
                className={styles.input}
                defaultValue={user ? user.first_name : ""}
              />
            </div>
            <div>
              <label>{t("user.last name")}</label>
              <input
                placeholder="enter text..."
                {...register("last_name")}
                className={styles.input}
                defaultValue={user ? user.last_name : ""}
              />
            </div>
            <div>
              <label>{t("global.email")}</label>
              <input
                placeholder="enter email..."
                type="email"
                {...register("email")}
                className={styles.input}
                defaultValue={user ? user.email : ""}
              />
            </div>
            <div>
              <label>{t("user.phone")}</label>
              <input
                placeholder="enter text..."
                type="tel"
                {...register("phone")}
                className={styles.input}
                defaultValue={user ? user.phone : ""}
              />
            </div>
            <div className={styles.admin}>
              <input
                type="checkbox"
                {...register("is_staff")}
                defaultChecked={user ? user.is_staff : false}
                className={styles.checkbox}
              />
              <label>{t("user.admin")}</label>
            </div>
            <button type="submit" className={styles.button}>
              {t("global.submit")}
            </button>
          </form>
        </section>
      )}
    </article>
  );
}

export default User;
