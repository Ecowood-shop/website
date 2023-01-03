// REACT
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

// REDUX
import { useDispatch } from "react-redux";
// import {
//   deleteVariant,
//   updateVariant,createVariant
// } from "../../../../store/actions/adminActions";

// OTHERS
import { useState } from "react";
import styles from "./city.module.scss";

function City(props) {
  // HOOKS
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const opener = () => {
    setOpen(!open);
  };

  const onSubmit = (data) => {
    //     if (props.create) {
    //       data.color = data.color.name;
    //       data.variantTitle = "productID=" + props.id + " color=" + data.color;
    //       data.productID = props.id;
    //       console.log(data)
    //      dispatch(createVariant(data))
    //     } else {
    //       data.id = props.variant.id;
    //       data.color = props.variant.color;
    //       data.title = props.variant.title;
    //       dispatch(updateVariant(data));
    //     }
  };
  //   console.log(props.colors);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={styles.holder}
          style={
            props.create && {
              background: "linear-gradient(black,black)",
            }
          }
        ></div>

        <h1 onClick={() => opener()}>
          {props.create ? "შექმნა" : props.city.location}
        </h1>
      </div>

      {open && (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.table}>
          <div className={styles.inputContainer}>
            <input
              placeholder="ფასი 1"
              type="number"
              {...register("upperLimit", { min: 0 })}
              defaultValue={props.create ? 0 : props.city.upperLimit}
              className={styles.input}
            />
            <input
              placeholder="ზღვარი"
              type="number"
              {...register("limit", { min: 0 })}
              defaultValue={props.create ? 0 : props.city.limit}
              className={styles.input}
            />{" "}
            <input
              placeholder="ფასი 2"
              type="number"
              {...register("lowerLimit", { min: 0 })}
              defaultValue={props.create ? 0 : props.city.lowerLimit}
              className={styles.input}
            />
          </div>
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.button}>
              {props.create ? "შექმნა" : "რედაქტირება"}
            </button>
            {!props.create && (
              <button
                className={styles.iconContainer}
                //   onClick={() => dispatch(deleteVariant(props.variant.id))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className={styles.icon}
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  );
}

export default City;
