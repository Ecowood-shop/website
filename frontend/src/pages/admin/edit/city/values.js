// yup
import * as Yup from "yup";
// redux

import { updateCity } from "../../../../store/actions/shippingActions";

export const initialValues = (city) => {
  return {
    location: city ? city.location : "",
    name_eng: city ? city.name_eng : "",
    name_rus: city ? city.name_rus : "",
    limit: city ? city.limit : "",
    lowerLimit: city ? city.lowerLimit : "",
    upperLimit: city ? city.upperLimit : "",
  };
};

export const validationSchema = Yup.object({
  location: Yup.string().required("Required"),
  name_eng: Yup.string(),
  name_rus: Yup.string(),
  limit: Yup.number().min(0).required("Required"),
  lowerLimit: Yup.number().min(0).required("Required"),
  upperLimit: Yup.number().min(0).required("Required"),
});

export const onSubmit = (values, dispatch, id) => {
  let data = {
    location: values.location,
    name_eng: values.name_eng,
    name_rus: values.name_rus,
    limit: values.limit,
    lowerLimit: values.lowerLimit,
    upperLimit: values.upperLimit,
  };
  dispatch(updateCity(data, id));
};
