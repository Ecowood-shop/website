// yup
import * as Yup from "yup";

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

export const validationSchema = Yup.object({
  userId: Yup.string().required("Required"),
  productId: Yup.string().required("Required"),
  discountPercent: Yup.number().min(1).required("Required"),
  start_date: Yup.date()
    .min(new Date(Date.now() - 86400000), "Invalid start date")
    .required("Required"),
  start_time: Yup.string().required("Required"),
  end_date: Yup.date()
    .min(Yup.ref("start_date"), "Invalid end date")
    .required("Required"),
  end_time: Yup.string().required("Required"),
});

export const onSubmit = (values,  dispatch, func) => {
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

  dispatch(func(data));
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
