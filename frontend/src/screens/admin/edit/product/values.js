// yup
import * as Yup from "yup";
// redux

import { updateProduct } from "../../../../store/actions/adminActions";

export const initialValues = (product) => {
  return {
    name_geo: product?.name_geo ? product?.name_geo : "",
    brand: product?.brand ? product?.brand : "",
    size: product?.size ? product?.size : "",
    youtubeUrl: product?.youtubeUrl ? product?.youtubeUrl : "",
    price: product?.price ? product?.price : "",
    coverageLength: product?.coverageLength ? product?.coverageLength : "",
    category: product?.category_id ? product?.category_id : "",
    technicalRequirements: product?.technicalRequirements
      ? product?.technicalRequirements
      : "",
    instructionForUse: product?.instructionForUse
      ? product?.instructionForUse
      : "",
    safetyStandard: product?.safetyStandard ? product?.safetyStandard : "",

    // discounts
    discountType: product?.discount?.percentage > 0 ? 1 : 0,

    discountPercent: product?.discount?.percentage
      ? product?.discount.percentage
      : 0,
    start_date: product?.discount
      ? new Date(product?.discount?.start_date)
      : "",
    start_time: product?.discount
      ? (new Date(product?.discount?.start_date).getHours() < 10 ? "0" : "") +
        new Date(product?.discount?.start_date).getHours() +
        ":" +
        (new Date(product?.discount?.start_date).getMinutes() < 10 ? "0" : "") +
        new Date(product?.discount?.start_date).getMinutes()
      : "",
    end_date: product?.discount ? new Date(product?.discount?.end_date) : "",
    end_time: product?.discount
      ? (new Date(product?.discount?.end_date).getHours() < 10 ? "0" : "") +
        new Date(product?.discount?.end_date).getHours() +
        ":" +
        (new Date(product?.discount?.end_date).getMinutes() < 10 ? "0" : "") +
        new Date(product?.discount?.end_date).getMinutes()
      : "",
  };
};

export const validationSchema = Yup.object({
  name_geo: Yup.string().required("Required"),
  brand: Yup.string().required("Required"),
  size: Yup.string().required("Required"),
  youtubeUrl: Yup.string(),
  price: Yup.number().min(0).required("Required"),
  coverageLength: Yup.number().min(0),
  category: Yup.string().required("Required"),
  technicalRequirements: Yup.string().required("Required"),
  instructionForUse: Yup.string().required("Required"),
  safetyStandard: Yup.string().required("Required"),

  // discounts
  discountType: Yup.string().required("Required"),

  // maxium value for start date is end_date
  start_date: Yup.date().when("discountType", (discountType, schema) =>
    String(discountType) === "1"
      ? schema.max(Yup.ref("end_date"), "Invalid start date").required("Required")
      : schema.notRequired()
  ),
  start_time: Yup.string().when("discountType", (discountType, schema) =>
    String(discountType) === "1"
      ? schema.required("Required")
      : schema.notRequired()
  ),
  // minimum value for end date is ToDay
  end_date: Yup.date().when("discountType", (discountType, schema) =>
    String(discountType) === "1"
      ? schema
          .min(new Date(Date.now() - 86400000), "Invalid end date")
          .required("Required")
      : schema.notRequired()
  ),
  end_time: Yup.string().when("discountType", (discountType, schema) =>
    String(discountType) === "1"
      ? schema.required("Required")
      : schema.notRequired()
  ),
});

export const onSubmit = (values, dispatch, id) => {
  let data = {
    name_geo: values.name_geo,
    brand: values.brand,
    size: values.size,
    youtubeUrl: values.youtubeUrl,
    coverageLength: values.coverageLength,
    price: values.price,
    category: values.category,
    // discounts
    discountType: values.discountType,
    // description
    instructionForUse: values.instructionForUse,
    safetyStandard: values.safetyStandard,
    technicalRequirements: values.technicalRequirements,
  };
  if (String(data.discountType) === "1") {
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
    data.discountPercent = values.discountPercent;
  }

  console.log(data);
  dispatch(updateProduct(id, data));
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
