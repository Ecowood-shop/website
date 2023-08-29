// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import hooks
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
// Import formik configuration
import FormikControl from "../../formik/FormikControl";

// Main container
const Container = styled.div`
  ${respondTo.mobile`
    width:50%;
  `}

  ${respondTo.lowTablet`
    width:50%;
  `}

  & > div {
    height: 100%;
    width: 100%;

    select {
      height: 100%;
      width: 100%;
      padding: 0.7rem 1.5rem 0.7rem 1.5rem;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      border: 3px solid var(--darkmagenta);
      border-radius: 100px;

      color: var(--darkmagenta);
      font-size: var(--small-m);
      text-transform: capitalize;
      background-color: whitesmoke;
    }
  }
`;

// Export Status select
function OrderStatusSelect() {
  // Initialize hooks
  const { t } = useTranslation(["components"]);
  const { submitForm, setFieldValue } = useFormikContext();

  // Functions
  const setOrderByField = (value) => {
    setFieldValue("status", value);
    submitForm();
  };

  // Create status options
  const dropdownOptions = [
    { key: t("global.status"), value: "" },
    { key: t("filter.delivered"), value: "True" },
    { key: t("filter.in progress"), value: "False" },
  ];

  return (
    <Container>
      <FormikControl
        control="select"
        name="status"
        options={dropdownOptions}
        onChange={(event) => setOrderByField(event.target.value)}
      />
    </Container>
  );
}

export default OrderStatusSelect;
