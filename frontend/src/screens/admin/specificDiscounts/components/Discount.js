// react
import { useState } from "react";

import {
  createDiscount,
  updateDiscount,
} from "../../../../store/actions/discountActions";

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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={styles.holder}
          style={
            props.create
              ? {}
              : open
              ? { backgroundImage: "var(--linear-primary)" }
              : {
                  backgroundImage: "none",
                  backgroundColor: "whitesmoke",
                }
          }
        ></div>

        {props.create ? (
          <h1 onClick={() => opener()}>{"create"} </h1>
        ) : (
          <h1 onClick={() => opener()}>{props.username}</h1>
        )}
      </div>
      {open && (
        <Formik
          initialValues={initialValues(
            props.create,
            props.user,
            props.product,
            props.discount
          )}
          validationSchema={validationSchema}
          onSubmit={(e) =>
            onSubmit(
              e,
              props.id,
              props.dispatch,
              props.create ? createDiscount : updateDiscount
            )
          }
        >
          {(formik) => {
            console.log(formik.values.userId);
            return (
              <Form className={styles.content}>
                {props.users && props.products && (
                  <Inputs
                    styles={styles}
                    formik={formik}
                    products={props.products}
                    users={props.users}
                  />
                )}
                <Buttons
                  styles={styles}
                  create={props.create}
                  dispatch={props.dispatch}
                  id={props.id}
                />
              </Form>
            );
          }}
        </Formik>
      )}
    </section>
  );
}

export default Discount;
