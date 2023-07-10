// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { createCity } from "../../../../store/actions/shippingActions";
import { useForm } from "react-hook-form";

// COMPONENTS
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";
// translate
import { useTranslation } from "react-i18next";

function CreateCityScreen() {
  const { t } = useTranslation(["admin"]);
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminCity = useSelector((state) => state.adminCity);
  const { error, loading, success } = adminCity;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createCity(data));
  };

  useEffect(() => {
    if (success) {
      navigate("/admin/cities/");
    }
  }, [dispatch, navigate, success]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/cities")}
        className={styles.button}
      >
        {t("global.back")}
      </button>
      {loading && <Loader />} {error && <Message>{error}</Message>}
      <section>
        <h1>{t("global.create")}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>
              {t("order.city")} ({t("global.english")})
            </label>
            <input
              placeholder="enter text..."
              {...register("name_eng")}
              className={styles.input}
            />
          </div>{" "}
          <div>
            <label>
              {t("order.city")} ({t("global.georgian")})
            </label>
            <input
              placeholder="enter text..."
              {...register("location", { required: "Required" })}
              className={styles.input}
            />
          </div>
          <div>
            <label>
              {t("order.city")} ({t("global.russian")})
            </label>
            <input
              placeholder="enter text..."
              {...register("name_rus")}
              className={styles.input}
            />
          </div>
          <div>
            <label>{t("order.limit")}</label>
            <input
              placeholder="enter text..."
              type="number"
              min={0}
              {...register("limit", { required: "Required" })}
              className={styles.input}
            />
          </div>
          <div>
            <label>ზედა ფასი</label>
            <input
              min={0}
              placeholder="enter text..."
              type="number"
              {...register("upperLimit", { required: "Required" })}
              className={styles.input}
            />
          </div>
          <div>
            <label>ქვედა ფასი</label>
            <input
              min={0}
              placeholder="enter text..."
              type="number"
              {...register("lowerLimit", { required: "Required" })}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            {t("global.submit")}
          </button>
        </form>
      </section>
    </article>
  );
}

export default CreateCityScreen;
