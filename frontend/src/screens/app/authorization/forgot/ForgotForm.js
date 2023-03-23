// redux
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../../store/actions/userActions";
// components
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";
import { Formik, Form } from "formik";
import Inputs from "./Inputs";
import Button from "./Button";
// values
import { initialValues, validationSchema } from "./Values";
// redux
import { useSelector } from "react-redux";

function ForgotForm(props) {
  const dispatch = useDispatch();
  const onSubmit = (values, actions) => {
    setTimeout(() => {
      dispatch(forgotPassword(values.email));
      console.log(values);
      actions.setSubmitting(false);
    }, 1000);
  };

  const store = useSelector((state) => state.forgotPassword);
  const { loading, error, success } = store;

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
            {loading && <Loader />}
            <Inputs styles={props.styles} />
            <Button
              styles={props.styles}
              changer={props.changer}
              formik={formik}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default ForgotForm;
