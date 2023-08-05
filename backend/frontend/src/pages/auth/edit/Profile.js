// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { updateUser, reset } from "../../../toolkit/user/userUpdateSlice";

// components
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";

import { Formik, Form } from "formik";
import Buttons from "./Buttons";
import Inputs from "./Inputs";
import PasswordInputs from "./PasswordInputs";
//values
import { initialValues, validationSchema } from "./values";

// styles
import styles from "./styles.module.scss";

// translate
import { useTranslation } from "react-i18next";

function Profile() {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const userUpdateSlice = useSelector((state) => state.userUpdate);
  const { isLoading, success, error } = userUpdateSlice;

  const { t } = useTranslation(["auth"]);

  const onSubmit = (values, actions) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      password: values.password,
      new_password: "",
      confirm_password: "",
    };
    if (values.updatePassword[0] === "true") {
      data.first_name = user?.first_name;
      data.last_name = user?.last_name;
      data.phone = user?.phone;
      data.new_password = values.newPassword;
      data.confirm_password = values.confirmPassword;
    }

    setTimeout(() => {
      dispatch(updateUser(data));
      actions.setSubmitting(false);
    }, 1000);
  };
  useEffect(() => {
    if (success) navigate("/profile");
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, navigate]);

  return (
    <article className={styles.container}>
      <button onClick={() => navigate("/profile")} className={styles.button}>
        {t("global.back")}
      </button>
      {isLoading && <Loader color="darkmagenta" />}
      {user && (
        <section>
          <Formik
            initialValues={initialValues(user)}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className={styles.form}>
                  {" "}
                  <h1
                    className={
                      formik.values.updatePassword?.length > 0
                        ? "w3-animate-right"
                        : "w3-animate-left"
                    }
                  >
                    {formik.values.updatePassword?.length > 0
                      ? t("edit profile.change password")
                      : t("edit profile.edit profile")}
                  </h1>
                  {error && <Message>{error}</Message>}
                  <div className={styles.inputContainer}>
                    {formik.values.updatePassword?.length > 0 ? (
                      <PasswordInputs styles={styles} formik={formik} t={t} />
                    ) : (
                      <Inputs styles={styles} t={t} />
                    )}
                  </div>
                  <Buttons styles={styles} formik={formik} t={t} />
                </Form>
              );
            }}
          </Formik>
        </section>
      )}
    </article>
  );
}

export default Profile;