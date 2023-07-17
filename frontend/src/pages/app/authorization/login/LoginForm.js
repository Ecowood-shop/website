// redux
import { useDispatch } from "react-redux";
import { reset } from "../../../../toolkit/user/userSlice";
// components
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";
import { Formik, Form } from "formik";
import Inputs from "./Inputs";
import Button from "./Button";
// values
import { initialValues, validationSchema, onSubmit } from "./Values";
import logo from "../../../../static/images/altax.png";
import { useEffect } from "react";

function LoginForm(props) {
  const dispatch = useDispatch();

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
          <Form className="w3-animate-left">
            <img
              src={logo}
              alt="altax logo"
              className="header-logo"
              id="altax-logo"
            />
            <Message styles>{props.error}</Message>
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
