// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoryById,
  updateCategory,
} from "../../../../store/actions/adminActions";
import { useForm } from "react-hook-form";

// COMPONENTS
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";
// translate
import { useTranslation } from "react-i18next";
function Category() {
  const { t } = useTranslation(["admin"]);
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const store = useSelector((state) => state.adminCategories);
  const { error, loading, category, success } = store;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(updateCategory(id, data));
  };

  useEffect(() => {
    success ? navigate("/admin/categories/") : dispatch(getCategoryById(id));
  }, [dispatch, navigate, id, success]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/categories/")}
        className={styles.button}
      >
        {t("global.back")}
      </button>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {category && (
        <section>
          <h1>{t("global.edit")}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>
                {t("global.category")} ({t("global.english")})
              </label>
              <input
                placeholder="enter text..."
                {...register("name_eng")}
                className={styles.input}
                defaultValue={category ? category.name_eng : ""}
              />
            </div>{" "}
            <div>
              <label>
                {t("global.category")} ({t("global.georgian")})
              </label>
              <input
                placeholder="enter text..."
                {...register("name", { required: "Required" })}
                className={styles.input}
                defaultValue={category ? category.name : ""}
              />
            </div>
            <div>
              <label>
                {t("global.category")} ({t("global.russian")})
              </label>
              <input
                placeholder="enter text..."
                {...register("name_rus")}
                className={styles.input}
                defaultValue={category ? category.name_rus : ""}
              />
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

export default Category;
