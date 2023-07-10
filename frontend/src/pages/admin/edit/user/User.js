// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser } from "../../../../store/actions/adminActions";
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

  const adminUsers = useSelector((state) => state.adminUsers);
  const { errorUser, loadingUser, user, success } = adminUsers;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    data.id = id;
    dispatch(updateUser(data));
  };

  useEffect(() => {
    success ? navigate("/admin/users/") : dispatch(getUser(id));
  }, [dispatch, success]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/users/")}
        className={styles.button}
      >
        {t("global.back")}
      </button>
      {loadingUser && <Loader />} {errorUser && <Message>{errorUser}</Message>}
      {user && (
        <section>
          <h1>{t("global.edit")}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>{t("user.first name")}</label>
              <input
                placeholder="enter text..."
                {...register("firstName")}
                className={styles.input}
                defaultValue={user ? user.first_name : ""}
              />
            </div>
            <div>
              <label>{t("user.last name")}</label>
              <input
                placeholder="enter text..."
                {...register("lastName")}
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
                {...register("status")}
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
