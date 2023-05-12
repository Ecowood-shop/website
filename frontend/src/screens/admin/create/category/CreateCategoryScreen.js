// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../../../store/actions/adminActions";
import { useForm } from "react-hook-form";

// COMPONENTS
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";
// translate
import { useTranslation } from "react-i18next";

function CreateCategoryScreen() {
  const { t } = useTranslation(["admin"]);
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminCategories = useSelector((state) => state.adminCategories);
  const { error, loading, success } = adminCategories;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(createCategory(data));
  };

  useEffect(() => {
    if (success) {
      navigate("/admin/categories/");
    }
  }, [dispatch, navigate, success]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/categories/")}
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
              {t("global.category")} ({t("global.english")})
            </label>
            <input
              placeholder="enter text..."
              {...register("name_eng")}
              className={styles.input}
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

export default CreateCategoryScreen;
