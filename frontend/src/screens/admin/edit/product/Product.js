// REACT
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useForm } from "react-hook-form";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../../../store/actions/adminActions";

import {
  getCategories,
  getProduct,
} from "../../../../store/actions/systemActions";

// COMPONENTS
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";

function Product() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [message, setMessage] = useState();
  const [category, setCategory] = useState();

  const systemProduct = useSelector((state) => state.systemProduct);
  const { error, loading, product } = systemProduct;

  const adminProduct = useSelector((state) => state.adminProduct);
  const { success } = adminProduct;

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    if (category) {
      data.category = category.name;
    } else {
      data.category = product.products.category;
    }
    dispatch(updateProduct(id, data));
  };

  useEffect(() => {
    if (success) {
      navigate("/admin/products/");
    } else {
      dispatch(getCategories());
      dispatch(getProduct(id));
    }
  }, [dispatch, success]);
  console.log(product);
  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/products/")}
        className={styles.button}
      >
        უკან
      </button>
      {loading && <Loader />} {error && <Message>{error}</Message>}
      {product?.products && (
        <section>
          <nav  className={styles.color}>
          <button
            onClick={() => navigate(`/admin/products/${id}/variants`)}
          >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm0-96c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zM288 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm96 96c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z"/></svg>
            ფერები
          </button>
          <button
           
            onClick={() => navigate(`/admin/products/${id}/images`)}
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M152 120c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S178.5 120 152 120zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM463.1 409.3l-136.8-185.9C323.8 218.8 318.1 216 312 216c-6.113 0-11.82 2.768-15.21 7.379l-106.6 144.1l-37.09-46.1c-3.441-4.279-8.934-6.809-14.77-6.809c-5.842 0-11.33 2.529-14.78 6.809l-75.52 93.81c0-.0293 0 .0293 0 0L47.99 96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V409.3z"/></svg>
           სურათები
          </button>
          </nav>

          <h1>რედაქტირება</h1>
          <p className={styles.error}>{message}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="სახელი"
              type="text"
              {...register("name_geo")}
              defaultValue={product ? product.products.name_geo : ""}
              className={styles.input}
              required
            />
            <input
              placeholder="ბრენდი"
              type="text"
              {...register("brand")}
              defaultValue={product ? product.products.brand : ""}
              className={styles.input}
              required
            />

            <input
              placeholder="მოცულობა"
              type="text"
              {...register("size")}
              className={styles.input}
              defaultValue={product ? product.products.size : ""}
              required
            />
            <input
              placeholder="იუთუბი"
              type="url"
              {...register("youtubeUrl")}
              defaultValue={product ? product.products.youtubeUrl : ""}
              className={styles.input}
            />
            <input
              placeholder="ფასი"
              type="number"
              {...register("price")}
              defaultValue={product ? product.products.price : ""}
              className={styles.input}
              required
            />
            <input
              placeholder="ფასდაკლება"
              type="text"
              {...register("discount")}
              defaultValue={product ? product.products.discount : ""}
              className={styles.input}
              required
            />

            {categories && product && (
              <Select
                options={categories}
                isClearable={true}
                placeholder="კატეგორია"
                className={styles.inputCategory}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                onChange={(option) => setCategory(option)}
                defaultValue={
                  categories.filter(
                    (option) => option.name === product.products.category
                  )[0]
                }
              />
            )}
            <textarea
              type="text"
              className={styles.textarea}
              placeholder="ტექნიკური მონაცემები"
              {...register("technicalRequirements")}
              defaultValue={
                product ? product.products.technicalRequirements : ""
              }
              required
            />

            <textarea
              type="text"
              className={styles.textarea}
              placeholder="გამოყენების წესები"
              {...register("instructionForUse")}
              defaultValue={product ? product.products.instructionForUse : ""}
              required
            />
            <textarea
              type="text"
              className={styles.textarea}
              placeholder="უსაფრთხოების სტანდარტი"
              {...register("safetyStandard")}
              defaultValue={product ? product.products.safetyStandard : ""}
              required
            />

            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </section>
      )}
    </article>
  );
}

export default Product;
