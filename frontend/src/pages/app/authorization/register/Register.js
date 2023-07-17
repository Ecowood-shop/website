// REACT
import React, { useEffect, useState } from "react";

// components
import Message from "../../../../components/Message/Message";
import { Formik, Form } from "formik";
import Inputs from "./Inputs";
import Loader from "../../../../components/loader/Loader";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../../toolkit/auth/registerSlice";

// styles
import styles from "../styles/styles.module.scss";
// values
import { initialValues, validationSchema, onSubmit } from "./Values";

function Register(props) {
  const [nextPage, setNextPage] = useState(false);

  const registerSlice = useSelector((state) => state.register);
  const { error, isLoading, success } = registerSlice;

  // HOOKS
  const dispatch = useDispatch();

  const pageChanger = () => {
    setNextPage(!nextPage);
  };

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(e, action) => onSubmit(e, action, dispatch)}
    >
      {(formik) => {
        return (
          <Form className="w3-animate-left" id="register-form">
            <h1 style={{ marginBottom: error ? "0" : "3rem" }}>
              {props.t("global.register")}
            </h1>

            <Message>{error}</Message>
            {props.loading && <Loader color="white" />}
            <Inputs
              t={props.t}
              styles={styles}
              loading={isLoading}
              Loader={Loader}
              success={success}
              pageChanger={pageChanger}
              nextPage={nextPage}
              changer={props.changer}
              formik={formik}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default Register;
