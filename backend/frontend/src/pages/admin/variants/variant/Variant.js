// REDUX
import { useDispatch } from "react-redux";
import { deleteVariant } from "../../../../toolkit/variant/actions";

// OTHERS
import { useState } from "react";
import styles from "./variant.module.scss";

// Formik
import { Formik, Form } from "formik";
import FormikControl from "../../../../components/formik/FormikControl"; // values
import { initialValues, validationSchema, onSubmit } from "./values";

function Variant(props) {
  // HOOKS
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const opener = () => {
    setOpen(!open);
  };

  const dropdownOptions = [{ key: props.t("global.color"), value: "" }];
  if (props.colors) {
    props.colors.forEach((color) => {
      dropdownOptions.push({ key: color.name, value: color.name });
    });
  }
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={styles.holder}
          style={
            props.create
              ? {}
              : { backgroundImage: `url(${props.variant.image})` }
          }
        ></div>

        <h1 onClick={() => opener()}>
          {props.create ? props.t("global.create") : props.variant.color}{" "}
        </h1>
      </div>
      {open && (
        <Formik
          initialValues={initialValues(props?.variant)}
          validationSchema={validationSchema}
          onSubmit={(e) =>
            onSubmit(
              e,
              dispatch,
              props.create ? props.id : props.variant.id,
              props.create,
              props?.variant
            )
          }
        >
          {(formik) => {
            return (
              <Form className={styles.table}>
                <FormikControl
                  control="input"
                  type="number"
                  label="quantity"
                  name="quantity"
                  className={styles.input}
                  placeholder={props.t("global.quantity")}
                />

                {props?.colors && (
                  <FormikControl
                    control="select"
                    name="color"
                    className={styles.input}
                    options={dropdownOptions}
                  />
                )}

                <button type="submit" className={styles.button}>
                  {props.create
                    ? props.t("global.create")
                    : props.t("global.edit")}
                </button>
                {!props.create && (
                  <button
                    type="button"
                    className={styles.iconContainer}
                    onClick={() =>
                      dispatch(deleteVariant({ id: props.variant.id }))
                    }
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className={styles.icon}
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </button>
                )}
              </Form>
            );
          }}
        </Formik>
      )}
    </section>
  );
}

export default Variant;
