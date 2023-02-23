// react
import { useState } from "react";

// redux
import { useDispatch } from "react-redux";
// import {
//   deleteVariant,
//   updateVariant,
//   createVariant,
// } from "../../../../store/actions/adminActions";

// components
import { Formik, Form } from "formik";
import Inputs from "./Inputs";
import Buttons from "./Buttons";

// values
import { initialValues, validationSchema, onSubmit } from "./values";

// styles
import styles from "./styles.module.scss";

function Discount(props) {
  const [open, setOpen] = useState(false);
  const opener = () => {
    setOpen(!open);
  };

  //   const onSubmit = (data) => {
  //     if (props.create) {
  //       data.color = data.color.name;
  //       data.variantTitle = "productID=" + props.id + " color=" + data.color;
  //       data.productID = props.id;
  //       console.log(data);
  //       dispatch(createVariant(data));
  //     } else {
  //       data.id = props.variant.id;
  //       data.color = props.variant.color;
  //       data.title = props.variant.title;
  //       dispatch(updateVariant(data));
  //     }
  //   };
  //   console.log(props.colors);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={styles.holder}
          style={{ backgroundColor: props.create ? "red" : "blue" }}
        ></div>
        <h1 onClick={() => opener()}>
          {props.create ? "create" : props.variant.color}
        </h1>
      </div>
      {open && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form className={styles.content}>
                <Inputs styles={styles} formik={formik} />
                <Buttons styles={styles} create={props.create} />
              </Form>
            );
          }}
        </Formik>
      )}
    </section>
  );
}

export default Discount;
