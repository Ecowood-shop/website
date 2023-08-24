// Import styles
import styled from "styled-components";
// Import hooks
import { useDispatch } from "react-redux";
// Import components
import { Formik, Form as FormikForm } from "formik";
// import Buttons from "./Buttons";
import Inputs from "./Inputs";
import Buttons from "./Buttons";
import PasswordInputs from "./PasswordInputs";
// Import actions and values
import { initialValues, validationSchema } from "../values";
import { updateUser } from "../../../../toolkit/user/userUpdateSlice";

const Container = styled.div`
  width: 100%;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

// Export form component
function Form({ user, t, isFirstPage, setIsFirstPage }) {
  // Initialize hooks
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      password: values.password,
      new_password: "",
      confirm_password: "",
    };
    if (!isFirstPage) {
      data.first_name = user?.first_name;
      data.last_name = user?.last_name;
      data.phone = user?.phone;
      data.new_password = values.newPassword;
      data.confirm_password = values.confirmPassword;
    }

    dispatch(updateUser(data));
  };
  return (
    <Container>
      <Formik
        initialValues={initialValues(user)}
        validationSchema={() => validationSchema(t, isFirstPage)}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <FormikForm>
              {isFirstPage ? (
                <Inputs t={t} />
              ) : (
                <PasswordInputs formik={formik} t={t} />
              )}
              <Buttons
                t={t}
                isFirstPage={isFirstPage}
                setIsFirstPage={setIsFirstPage}
              />
            </FormikForm>
          );
        }}
      </Formik>
    </Container>
  );
}

export default Form;
