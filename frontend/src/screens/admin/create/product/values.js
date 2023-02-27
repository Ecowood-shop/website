// yup
import * as Yup from "yup";

export const initialValues = {
  name_geo: "",
  brand: "",
  size: "",
  youtubeUrl: "",
  price: "",
  coverageLength: "",
  category: "",
  technicalRequirements: "",
  instructionForUse: "",
  safetyStandard: "",

  // discounts
  discountType: "",
  discountPercent: "",
  start_date: "",
  start_time: "23:59",
  end_date: "",
  end_time: "23:59",
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
  discountPercent: Yup.number()
    .min(0)
    .when("discountType", (discountType, schema) =>
      String(discountType) === "1" ? schema.required("Required") : schema
    ),
  start_date: Yup.date()
    .min(new Date(Date.now() - 86400000), "Invalid starting date")
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

export const onSubmit = (values) => {
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
    data.discountPercent = values.discountPercent;
  }

  // dispatch(createProduct(values));

  console.log(data);
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
