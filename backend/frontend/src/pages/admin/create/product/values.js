// yup
import * as Yup from "yup";
// redux
import { createProduct } from "../../../../toolkit/product/actions";

export const initialValues = {
  // name
  name_geo: "",
  name_eng: "",
  name_rus: "",

  // brand
  brand_geo: "",
  brand_eng: "",
  brand_rus: "",

  // size
  size_geo: "",
  size_eng: "",
  size_rus: "",

  // others
  youtubeUrl: "",
  price: "",
  coverageLength: "",
  category: "",

  // technical requirements
  technicalRequirements_geo: "",
  technicalRequirements_eng: "",
  technicalRequirements_rus: "",

  // instruction for use
  instructionForUse_geo: "",
  instructionForUse_eng: "",
  instructionForUse_rus: "",

  // safety standarts
  safetyStandard_geo: "",
  safetyStandard_eng: "",
  safetyStandard_rus: "",

  // discounts
  discountType: "",
  discountPercent: 0,
  start_date: "",
  start_time: "23:59",
  end_date: "",
  end_time: "23:59",
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

  //others
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
  start_date: Yup.date()
    .min(new Date(Date.now() - 86400000), "Invalid start date")
    .when("discountType", (discountType, schema) =>
      String(discountType) === "1"
        ? schema.required("Required")
        : schema.notRequired()
    ),
  start_time: Yup.string().when("discountType", (discountType, schema) =>
    String(discountType) === "1"
      ? schema.required("Required")
      : schema.notRequired()
  ),
  end_date: Yup.date()
    .min(Yup.ref("start_date"), "Invalid end date")
    .when("discountType", (discountType, schema) =>
      String(discountType) === "1"
        ? schema.required("Required")
        : schema.notRequired()
    ),
  end_time: Yup.string().when("discountType", (discountType, schema) =>
    String(discountType) === "1"
      ? schema.required("Required")
      : schema.notRequired()
  ),
});

export const onSubmit = (values, dispatch) => {
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
    category: values.category,

    // discounts
    discountType: values.discountType,

    // technical requirements
    technicalRequirements_geo: values.instructionForUse_geo,
    technicalRequirements_eng: values.instructionForUse_eng,
    technicalRequirements_rus: values.instructionForUse_rus,

    // instruction for use
    instructionForUse_geo: values.instructionForUse_geo,
    instructionForUse_eng: values.instructionForUse_eng,
    instructionForUse_rus: values.instructionForUse_rus,

    // safety standarts
    safetyStandard_geo: values.safetyStandard_geo,
    safetyStandard_eng: values.safetyStandard_eng,
    safetyStandard_rus: values.safetyStandard_rus,
  };
  if (String(data.discountType) !== "0") {
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

  dispatch(createProduct(data));
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
