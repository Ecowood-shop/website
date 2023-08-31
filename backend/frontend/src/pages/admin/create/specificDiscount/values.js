// Import yup
import * as Yup from "yup";

// Import create discount action
import { createDiscount } from "../../../../toolkit/discounts/actions";

export const initialValues = {
  userId: "",
  productId: "",
  discountType: "",
  discountPercent: "",
  start_date: "",
  start_time: "23:59",
  end_date: "",
  end_time: "23:59",
};

export const validationSchema = (t) => {
  return Yup.object({
    userId: Yup.string().required(t("validation.required")),
    productId: Yup.string().required(t("validation.required")),
    discountPercent: Yup.number().min(1).required(t("validation.required")),
    start_date: Yup.date()
      .min(new Date(Date.now() - 86400000), "Invalid start date")
      .required(t("validation.required")),
    start_time: Yup.string().required(t("validation.required")),
    end_date: Yup.date()
      .min(Yup.ref("start_date"), "Invalid end date")
      .required(t("validation.required")),
    end_time: Yup.string().required(t("validation.required")),
  });
};

export const onSubmit = (values, dispatch) => {
  let data = {
    userId: values.userId,
    productId: values.productId,
    discountPercent: values.discountPercent,
  };
  data.start_date =
    values.start_date.getFullYear() +
    "-" +
    (values.start_date.getMonth() + 1) +
    "-" +
    values.start_date.getDate() +
    " " +
    convertTime12to24(values.start_time) +
    ":00";
  data.end_date =
    values.end_date.getFullYear() +
    "-" +
    (values.end_date.getMonth() + 1) +
    "-" +
    values.end_date.getDate() +
    " " +
    convertTime12to24(values.end_time) +
    ":00";
    
  dispatch(createDiscount({ formData: data }));
};

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};
