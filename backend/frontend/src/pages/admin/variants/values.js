// yup
import * as Yup from "yup";
// redux
import { createVariant, updateVariant } from "../../../toolkit/variant/actions";

export const initialValues = (variant) => {
  return {
    quantity: variant ? variant.quantity : "",
    color: variant ? variant.color : "",
  };
};

export const validationSchema = Yup.object({
  quantity: Yup.number().min(0).required("Required"),
  color: Yup.string().required("Required"),
});

// On submit function which updates or adds product color variant
export const onSubmit = (values, dispatch, id, language, variant) => {
  if (id) {
    values.variantTitle = "productID=" + id + " color=" + values.color;
    values.productID = id;
    dispatch(createVariant({ formData: values, language: language }));
  } else {
    values.id = variant.id;
    values.title = variant.title;
    dispatch(updateVariant({ formData: values, language: language }));
  }
};
