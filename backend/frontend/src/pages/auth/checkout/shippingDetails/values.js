// yup
import * as Yup from "yup";

export const initialValues = (shippingFromStorage) => {
  return {
    // shipping method (_id is office id)
    wants_delivery: shippingFromStorage?.wants_delivery,
    cityId: shippingFromStorage?.cityId,
    _id: shippingFromStorage?._id,

    // shipping details
    physicPerson: shippingFromStorage?.physicPerson,
    first_name: shippingFromStorage?.first_name
      ? shippingFromStorage?.first_name
      : "",
    last_name: shippingFromStorage?.last_name
      ? shippingFromStorage?.last_name
      : "",
    id: shippingFromStorage?.id ? shippingFromStorage?.id : "",
    company_name: shippingFromStorage?.company_name
      ? shippingFromStorage?.company_name
      : "",
    company_type: shippingFromStorage?.company_type
      ? shippingFromStorage?.company_type
      : "",
    company_id: shippingFromStorage?.company_id
      ? shippingFromStorage?.company_id
      : "",
    phone: shippingFromStorage?.phone ? shippingFromStorage?.phone : "",
    address: shippingFromStorage?.address ? shippingFromStorage?.address : "",

    // payment method
    paymentMethod: shippingFromStorage?.paymentMethod
      ? shippingFromStorage?.paymentMethod
      : "",
  };
};
export const validationSchema = (t) => {
  return Yup.object({
    // shipping method (_id is office id)
    wants_delivery: Yup.string().required(t("validation.required")),
    cityId: Yup.string().when("wants_delivery", (wants_delivery, schema) =>
      String(wants_delivery) === "True" ? schema.required(t("validation.required")) : schema
    ),
    _id: Yup.string().when("wants_delivery", (wants_delivery, schema) =>
      String(wants_delivery) === "False" ? schema.required(t("validation.required")) : schema
    ),

    // shipping details
    physicPerson: Yup.string().required(t("validation.required")),
    first_name: Yup.string().when("physicPerson", (physicPerson, schema) =>
      String(physicPerson) === "True" ? schema.required(t("validation.required")) : schema
    ),
    last_name: Yup.string().when("physicPerson", (physicPerson, schema) =>
      String(physicPerson) === "True" ? schema.required(t("validation.required")) : schema
    ),
    id: Yup.string().when("physicPerson", (physicPerson, schema) =>
      String(physicPerson) === "True" ? schema.required(t("validation.required") ): schema
    ),
    company_name: Yup.string().when("physicPerson", (physicPerson, schema) =>
      String(physicPerson) === "False" ? schema.required(t("validation.required") ): schema
    ),
    company_type: Yup.string().when("physicPerson", (physicPerson, schema) =>
      String(physicPerson) === "False" ? schema.required(t("validation.required")) : schema
    ),
    company_id: Yup.string().when("physicPerson", (physicPerson, schema) =>
      String(physicPerson) === "False" ? schema.required(t("validation.required")): schema
    ),
    phone: Yup.string().required(t("validation.required")),
    address: Yup.string().when("wants_delivery", (wants_delivery, schema) =>
      String(wants_delivery) === "True" ? schema.required(t("validation.required")) : schema
    ),
  });
};
