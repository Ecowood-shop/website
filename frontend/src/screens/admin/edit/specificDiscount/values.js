// yup
import * as Yup from "yup";

export const initialValues = (user, product, discount) => {
  let startDate = new Date(discount.start_date);
  let endDate = new Date(discount.end_date);
  return {
    userId: user,
    productId: product,
    discountPercent: discount.percentage,
    start_date: startDate,
    start_time:
      (startDate.getHours() < 10 ? "0" : "") +
      startDate.getHours() +
      ":" +
      (startDate.getMinutes() < 10 ? "0" : "") +
      startDate.getMinutes(),
    end_date: new Date(discount.end_date),
    end_time:
      (endDate.getHours() < 10 ? "0" : "") +
      endDate.getHours() +
      ":" +
      (endDate.getMinutes() < 10 ? "0" : "") +
      endDate.getMinutes(),
  };
};

export const validationSchema = Yup.object({
  userId: Yup.string().required("Required"),
  productId: Yup.string().required("Required"),
  discountPercent: Yup.number().min(1).required("Required"),
  start_date: Yup.date()
    .max(Yup.ref("end_date"), "Invalid start date")
    .required("Required"),
  start_time: Yup.string().required("Required"),
  end_date: Yup.date()
    .min(new Date(Date.now() - 86400000), "Invalid end date")
    .required("Required"),
  end_time: Yup.string().required("Required"),
});

export const onSubmit = (values, id, dispatch, func) => {
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

  dispatch(func(id, data));
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
