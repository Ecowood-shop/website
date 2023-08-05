// yup
import * as Yup from "yup";
// redux
import {
  createVariant,
  updateVariant,
} from "../../../../toolkit/variant/actions";

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

export const onSubmit = (values, dispatch, id, isCreate, variant) => {
  if (isCreate) {
    values.variantTitle = "productID=" + id + " color=" + values.color;
    values.productID = id;
    dispatch(createVariant({ formData: values }));
  } else {
    values.id = id;
    values.title = variant.title;
    dispatch(updateVariant({ formData: values }));
  }
};
