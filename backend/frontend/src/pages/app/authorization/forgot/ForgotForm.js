// redux
import { useDispatch } from "react-redux";
import {
  forgotPassword,
  reset,
} from "../../../../toolkit/auth/forgotPasswordSlice";
// components
import { LoaderMini } from "../../../../components";
import Message from "../../../../components/Message/Message";
import { Formik, Form } from "formik";
import Inputs from "./Inputs";
import Button from "./Button";
// values
import { initialValues, validationSchema } from "./Values";
// redux
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ForgotForm(props) {
  const dispatch = useDispatch();
  const onSubmit = (values, actions) => {
    setTimeout(() => {
      dispatch(forgotPassword(values));
      actions.setSubmitting(false);
    }, 1000);
  };

  const forgotPasswordSlice = useSelector((state) => state.forgotPassword);
  const { isLoading, error, success } = forgotPasswordSlice;

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="w3-animate-left">
            <h1 style={{ marginBottom: error ? "0" : "3rem" }}>
              Reset password
            </h1>
            <Message styles>{error}</Message>
            {success && <p className={props.styles.success}>{success}</p>}
            {isLoading ? (
              <LoaderMini />
            ) : (
              <>
                <Inputs styles={props.styles} t={props.t} />
                <Button
                  t={props.t}
                  styles={props.styles}
                  changer={props.changer}
                  formik={formik}
                />
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default ForgotForm;
