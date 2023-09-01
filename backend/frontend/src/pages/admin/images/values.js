// Import yup
import * as Yup from "yup";

// Import create image action
import { createImage } from "../../../toolkit/image/imageSlice";

// Initial values
export const initialValues = {
  image: null,
  type: "",
};

// Validation schema
export const validationSchema = (t) => {
  return Yup.object({
    image: Yup.mixed().required(t("validation.required")),
    type: Yup.string().required(t("validation.required")),
  });
};

// On submit function which adds image to product 
export const onSubmit = (values, dispatch, id) => {
  const formData = new FormData();
  formData.append("picture", values.image);
  formData.append("product_id", id);
  formData.append("ord", values.type);
  dispatch(
    createImage({
      formData: formData,
    })
  );
};
