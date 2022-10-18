// REACT
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createImage } from "../../../store/actions/adminActions";

// COMPONENTS
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Image from "./image/Image";

// OTHERS
import styles from "./styles.module.scss";

const options = [
  { id: 0, name: "მთავარი" },
  { id: 1, name: "ფოტოები" },
  { id: 2, name: "სხვა" },
];
function Images() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  //  const adminVariants = useSelector((state) => state.adminVariants);
  //  const { error, loading, variants, success, successUpdate,successCreate } = adminVariants;

  const onSubmit = (data) => {
    dispatch(createImage(data.image[0], id));
  };

  useEffect(() => {
    //  dispatch(getVariants(id));
  }, [dispatch]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate(`/admin/products/${id}/edit`)}
        className={styles.button}
      >
        უკან
      </button>
      <section className={styles.createComponentContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.table}>
        <p className={styles.error}>
              {errors.image
                ? "ატვირთეთ სურათი"
                : errors.type
                ? "მიუთითეთ ტიპი"
                : ""}
            </p>
          <label className={styles.label}>
            <input type="file" required 
            placeholder="სურათი"
            accept="image/*"
            {...register("image", { required: true })}
            />
            <span>Select a file</span>
          </label>
          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                placeholder="ტიპი..."
                className={styles.select}
                inputRef={ref}
                options={options}
                value={options.find((c) => c.id === value)}
                onChange={(val) => onChange(val)}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.name}
              />
            )}
          />

          <button type="submit" className={styles.button}>
           დამატება
          </button>
        </form>
      </section>
      <section className={styles.imageContainer}>
        <Image
          src={
            "https://ecowood.ge/wp-content/uploads/2020/07/weco-5l-2-700x700.jpg"
          }
        />
        <Image
          src={
            "https://ecowood.ge/wp-content/uploads/2019/07/fasadis-laqi-2-700x700.jpg"
          }
        />
        <Image
          src={
            "https://ecowood.ge/wp-content/uploads/2020/07/weco-eco-700x700.jpg"
          }
        />
        <Image
          src={
            "https://ecowood.ge/wp-content/uploads/2020/07/weco-5l-2-700x700.jpg"
          }
        />
      </section>
      {/* {loading && <Loader />}
     {error && <Message>{error}</Message>} */}
      {/* {variants &&
       variants.map((variant) => (
         <Variant variant={variant} key={variant.id} />
       ))} */}
    </article>
  );
}

export default Images;
