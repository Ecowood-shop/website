// Import yup
import * as Yup from "yup";

// Import create shipping prices
import { createShippingPrice } from "../../../../toolkit/shipping/actions";

// Initial values
export const initialValues = {
  name_eng: "",
  location: "",
  name_rus: "",
  lowerLimit: 0,
  limit: 0,
  upperLimit: 0,
};

// Validation schema
export const validationSchema = (t) => {
  return Yup.object({
    name_eng: Yup.string(),
    location: Yup.string().required(t("validation.required")),
    name_rus: Yup.string(),
    lowerLimit: Yup.number().min(1).required(t("validation.required")),
    limit: Yup.number().min(1).required(t("validation.required")),
    upperLimit: Yup.number().min(1).required(t("validation.required")),
  });
};

// On submit function which creates shipping price based on city
export const onSubmit = (values, dispatch) => {
  dispatch(createShippingPrice({ formData: values }));
};
