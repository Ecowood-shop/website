// react-router-dom
import { useParams } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { resetPassword} from "../../../store/actions/userActions";
// components
import { Formik, Form } from "formik";
import Inputs from "./Inputs";
import Button from "./Button";
import Message from "../../../components/Message/Message";
import LoaderMini from "../../../components/loader/LoaderMini";
//styles
import styles from "./styles/styles.module.scss";
// values
import { initialValues, validationSchema } from "./values";
// hooks
import useWindowDimensions from "../../../functions/Window";

function ResetPassword() {
  const dispatch = useDispatch();
  const params = useParams();
  const { height, width } = useWindowDimensions();

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      dispatch(
        resetPassword(
          params.id,
          params.token,
          values.password,
          values.confirmPassword
        )
      );
      console.log(values);
      actions.setSubmitting(false);
    }, 1000);
  };

  const store = useSelector((state) => state.resetPassword);
  const { error, loading, success } = store;

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className={styles.form}>
              <h1>{success ? success : "პაროლის აღდგენა"}</h1>
              
              {error && <Message>{error}</Message>}
              {!success &&
                (loading ? (
                  <LoaderMini
                    color={
                      width <
                      46 *
                        parseFloat(
                          getComputedStyle(document.documentElement).fontSize
                        )
                        ? "darkmagenta"
                        : ""
                    }
                  />
                ) : (
                  <>
                    <Inputs styles={styles} />
                    <Button styles={styles} formik={formik} />
                  </>
                ))}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ResetPassword;
