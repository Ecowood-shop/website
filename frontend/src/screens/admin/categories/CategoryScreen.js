// REACT
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../store/actions/systemActions";
import { createCategory } from "../../../store/actions/adminActions";

// COMPONENTS
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";

function Category(props) {
  return (
    <div className={styles.category}>
      <p>{props.category.name}</p>
      <button>წაშლა</button>
    </div>
  );
}
function CategoryScreen() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createCategory(data));
  };

  const adminCategories = useSelector((state) => state.adminCategories);
  const { success } = adminCategories;
  const systemCategories = useSelector((state) => state.systemCategories);
  const { error, loading, categories } = systemCategories;

  useEffect(() => {
    if (success != false) {
      dispatch(getCategories());    
    }
  }, [dispatch, success]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate(`/admin/products/`)}
        className={styles.button}
      >
        უკან
      </button>

      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <div className={styles.creator}>
        <h2>კატეგორია</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.table}>
            <input
              placeholder="კატეგორია"
              type="text"
              {...register("name", { required: true })}
              className={styles.input}
            />
            <button type="submit">დამატება</button>
          </form>
        </div>
      </div>
      {categories &&
        categories.map((category) => (
          <Category category={category} key={category._id} />
        ))}
    </article>
  );
}

export default CategoryScreen;
