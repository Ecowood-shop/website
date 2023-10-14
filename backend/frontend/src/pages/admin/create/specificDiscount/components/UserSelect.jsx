// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

// Import hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import actions
import { getUsers } from "../../../../../toolkit/discounts/discountUserSlice";

const Container = styled.div`
  width: 30rem;
  max-width: 80vw;

  & > div > div > div:first-of-type {
    width: 30rem;
    max-width: 80vw;

    padding-left: 1rem;

    border-radius: 20px;
    border-color: white;

    font-size: var(--small-l);
    background-color: whitesmoke;

    ${respondTo.mobile`
      background-color:white;
    `}

    ${respondTo.lowTablet`
      background-color:white;
    `}
  }
`;

// Export user select
function UserSelect({ formik, i18n }) {
  // Initialize hooks
  const dispatch = useDispatch();

  // Get users from store
  const { users } = useSelector((state) => state.discountUsers);

  useEffect(() => {
    dispatch(getUsers({ language: i18n.language }));
  }, [dispatch, i18n.language]);

  // Formilize users
  let customUsers =
    users?.length > 0
      ? users.map((user) => ({
          value: user.id,
          label:
            "ID : " +
            user.id +
            ", " +
            user.first_name +
            " " +
            user.last_name +
            ", " +
            user.email,
        }))
      : [];

  return (
    users && (
      <Container>
        <FormikControl
          control="autocomplete"
          name="userId"
          formik={formik}
          options={customUsers}
        />
      </Container>
    )
  );
}

export default UserSelect;
