// REACT
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Message from "../../../../components/Message/Message";
import { Formik, Form } from "formik";
import Inputs from "./Inputs";
import Loader from "../../../../components/loader/Loader";

// REDUX
import { useDispatch } from "react-redux";
import { register } from "../../../../store/actions/userActions";
// styles
import styles from "../styles/styles.module.scss";
// values
import { initialValues, validationSchema } from "./Values";

function Register(props) {
  const [nextPage, setNextPage] = useState(false);
  const [message, setMessage] = useState("");

  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.error) {
      setMessage(props.error);
    }
    if (props.user) {
      navigate("/", { replace: true });
    }
    if (props.success) {
      setMessage("");
    }
  }, [props.user, props.error, navigate, props.success]);

  const pageChanger = () => {
    setNextPage(!nextPage);
  };

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      dispatch(
        register(
          values.firstName,
          values.lastName,
          values.email,
          values.phone,
          values.password
        )
      );
      actions.setSubmitting(false);
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="w3-animate-left" id="register-form">
            <h1 style={{ marginBottom: message ? "0" : "3rem" }}>
              {" "}
              რეგისტრაცია
            </h1>

            <Message>{message}</Message>
            {props.loading && <Loader />}
            <Inputs
              styles={styles}
              loading={props.loading}
              Loader={Loader}
              success={props.success}
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
