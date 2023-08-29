// Import yup
import * as Yup from "yup";

// Import update shipping prices
import { updateShippingPrice } from "../../../../toolkit/shipping/actions";

// Initial values
export const initialValues = (city) => {
  return {
    location: city ? city.location : "",
    name_eng: city ? city.name_eng : "",
    name_rus: city ? city.name_rus : "",
    limit: city ? Number(city.limit) : 0,
    lowerLimit: city ? Number(city.lowerLimit) : 0,
    upperLimit: city ? Number(city.upperLimit) : 0,
  };
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

// On submit function which updates shipping price based on city
export const onSubmit = (values, dispatch, id) => {
  let data = {
    location: values.location,
    name_eng: values.name_eng,
    name_rus: values.name_rus,
    limit: values.limit,
    lowerLimit: values.lowerLimit,
    upperLimit: values.upperLimit,
  };
  dispatch(updateShippingPrice({ formData: data, id: id }));
};
