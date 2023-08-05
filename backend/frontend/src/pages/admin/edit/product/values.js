// yup
import * as Yup from "yup";
// redux

import { updateProduct } from "../../../../toolkit/product/actions";

export const initialValues = (product) => {
  return {
    // name
    name_geo: product?.name_geo ? product?.name_geo : "",
    name_eng: product?.name_eng ? product?.name_eng : "",
    name_rus: product?.name_rus ? product?.name_rus : "",

    // brand
    brand_geo: product?.brand ? product?.brand : "",
    brand_eng: product?.brand_eng ? product?.brand_eng : "",
    brand_rus: product?.brand_rus ? product?.brand_rus : "",

    // size
    size_geo: product?.size ? product?.size : "",
    size_eng: product?.size_eng ? product?.size_eng : "",
    size_rus: product?.size_rus ? product?.size_rus : "",

    // others
    youtubeUrl: product?.youtubeUrl ? product?.youtubeUrl : "",
    price: product?.price ? product?.price : "",
    coverageLength: product?.coverageLength ? product?.coverageLength : "",
    category: product?.category_id ? product?.category_id : "",

    // technical requirements
    technicalRequirements_geo: product?.technicalRequirements
      ? product?.technicalRequirements
      : "",
    technicalRequirements_eng: product?.technicalRequirements_eng
      ? product?.technicalRequirements_eng
      : "",
    technicalRequirements_rus: product?.technicalRequirements_rus
      ? product?.technicalRequirements_rus
      : "",

    // instruction for use
    instructionForUse_geo: product?.instructionForUse
      ? product?.instructionForUse
      : "",
    instructionForUse_eng: product?.instructionForUse_eng
      ? product?.instructionForUse_eng
      : "",
    instructionForUse_rus: product?.instructionForUse_rus
      ? product?.instructionForUse_rus
      : "",

    // safety standarts
    safetyStandard_geo: product?.safetyStandard ? product?.safetyStandard : "",
    safetyStandard_eng: product?.safetyStandard_eng
      ? product?.safetyStandard_eng
      : "",
    safetyStandard_rus: product?.safetyStandard_rus
      ? product?.safetyStandard_rus
      : "",

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
  // name
  name_geo: Yup.string().required("Required"),
  name_eng: Yup.string(),
  name_rus: Yup.string(),

  // brand
  brand_geo: Yup.string().required("Required"),
  brand_eng: Yup.string(),
  brand_rus: Yup.string(),

  // size
  size_geo: Yup.string().required("Required"),
  size_eng: Yup.string(),
  size_rus: Yup.string(),

  // others
  youtubeUrl: Yup.string(),
  price: Yup.number().min(0).required("Required"),
  coverageLength: Yup.number().min(0),
  category: Yup.string().required("Required"),

  // technical requirements
  technicalRequirements_geo: Yup.string().required("Required"),
  technicalRequirements_eng: Yup.string(),
  technicalRequirements_rus: Yup.string(),

  // instruction for use
  instructionForUse_geo: Yup.string().required("Required"),
  instructionForUse_eng: Yup.string(),
  instructionForUse_rus: Yup.string(),

  // safety standarts
  safetyStandard_geo: Yup.string().required("Required"),
  safetyStandard_eng: Yup.string(),
  safetyStandard_rus: Yup.string(),

  // discounts
  discountType: Yup.string().required("Required"),
  discountPercent: Yup.number()
    .min(0)
    .when("discountType", (discountType, schema) =>
      String(discountType) === "1" ? schema.required("Required") : schema
    ),
  // maxium value for start date is end_date
  start_date: Yup.date().when("discountType", (discountType, schema) =>
    String(discountType) === "1"
      ? schema
          .max(Yup.ref("end_date"), "Invalid start date")
          .required("Required")
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
    // name
    name_geo: values.name_geo,
    name_eng: values.name_eng,
    name_rus: values.name_rus,

    // brand
    brand_geo: values.brand_geo,
    brand_eng: values.brand_eng,
    brand_rus: values.brand_rus,

    // size
    size_geo: values.size_geo,
    size_eng: values.size_eng,
    size_rus: values.size_rus,

    // others
    youtubeUrl: values.youtubeUrl,
    coverageLength: values.coverageLength,
    price: values.price,
    category: String(values.category),

    // discounts
    discountType: values.discountType,

    // technical requirements
    technicalRequirements_geo: values.technicalRequirements_geo,
    technicalRequirements_eng: values.technicalRequirements_eng,
    technicalRequirements_rus: values.technicalRequirements_rus,

    // instruction for use
    instructionForUse_geo: values.instructionForUse_geo,
    instructionForUse_eng: values.instructionForUse_eng,
    instructionForUse_rus: values.instructionForUse_rus,

    // safety standarts
    safetyStandard_geo: values.safetyStandard_geo,
    safetyStandard_eng: values.safetyStandard_eng,
    safetyStandard_rus: values.safetyStandard_rus,
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
    data.discountPercent =
      values.discountPercent < 1 ? 0 : values.discountPercent;
  }
  dispatch(updateProduct({ id: id, formData: data }));
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
