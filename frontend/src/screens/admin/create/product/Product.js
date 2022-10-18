

// REACT
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../../store/actions/adminActions";
import { useForm } from "react-hook-form";
import { getCategories } from "../../../../store/actions/systemActions";

// COMPONENTS
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";
  
// OTHERS
import styles from "./styles.module.scss";

function Product() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState();
  const [category, setCategory] = useState();

  const adminProduct = useSelector((state) => state.adminProduct);
  const { error, loading, createSuccess:success } = adminProduct;

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    if (category) {
      setMessage("");
      data.category = category.name;
      dispatch(createProduct(data));
    } else {
      setMessage("შეიყვანეთ კატეგორია");
    }

  };

  useEffect(() => {
    dispatch(getCategories());
    if (success) navigate("/admin/products/");
  }, [dispatch, success]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/products/")}
        className={styles.button}
      >
        უკან
      </button>{" "}
      <section>
        <h1>პროდუქტი</h1>
        {loading && <Loader/>}
        {error && <Message>{error}</Message>}
        <p className={styles.error}>{message}</p>
        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            placeholder="სახელი"
            type="text"
            {...register("name_geo")}
            className={styles.input}
            required
          />
          <input
            placeholder="ბრენდი"
            type="text"
            {...register("brand")}
            className={styles.input}
            required
          />

          <input
            placeholder="მოცულობა"
            type="text"
            {...register("size")}
            className={styles.input}
            required
          />
          <input
            placeholder="იუთუბი"
            type="url"
            {...register("youtubeUrl")}
            className={styles.input}
  
          />
          <input
            placeholder="ფასი"
            type="number"
            {...register("price")}
            min={0}
            step={.01}
            className={styles.input}
            required
          />
          <input
            placeholder="ფასდაკლება"
            type="text"
            {...register("discount")}
            className={styles.input}
      
          />

          {categories && (
            <Select
              options={categories}
              isClearable={true}
              placeholder="კატეგორია"
              className={styles.inputCategory}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              onChange={(option) => setCategory(option)}
            />
          )}
          <textarea
            type="text"
            className={styles.textarea}
            placeholder="ტექნიკური მონაცემები"
            {...register("technicalRequirements")}
            required
          />

          <textarea
            type="text"
            className={styles.textarea}
            placeholder="გამოყენების წესები"
            {...register("instructionForUse")}
            required
          />
          <textarea
            type="text"
            className={styles.textarea}
            placeholder="უსაფრთხოების სტანდარტი"
            {...register("safetyStandard")}
            required
          />

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </section>
    </article>
  );
}

export default Product;
