// redux
import { useDispatch } from "react-redux";
import { login } from "../../../../store/actions/userActions";
// components
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";
import { Formik, Form } from "formik";
import Inputs from "./Inputs";
import Button from "./Button";
// values
import { initialValues, validationSchema } from "./Values";
import logo from "../../../../static/images/altax.png";
function LoginForm(props) {
  const dispatch = useDispatch();
  const onSubmit = (values, actions) => {
    setTimeout(() => {
      dispatch(login(values.email, values.password));
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
          <Form className="w3-animate-left">
              <img
                src={logo}
                alt="altax logo"
                className="header-logo"
                id="altax-logo"
              />
            <Message styles>{props.message}</Message>
            {props.loading && <Loader />}
            <Inputs styles={props.styles} t={props.t} />
            <Button
              t={props.t}
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

export default LoginForm;
