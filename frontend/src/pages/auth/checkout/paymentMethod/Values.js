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
    first_name: shippingFromStorage?.first_name,
    last_name: shippingFromStorage?.last_name,
    id: shippingFromStorage?.id,
    company_name: shippingFromStorage?.company_name,
    company_type: shippingFromStorage?.company_type,
    company_id: shippingFromStorage?.company_id,
    phone: shippingFromStorage?.phone,
    address: shippingFromStorage?.address,

    // payment method
    paymentMethod: shippingFromStorage?.paymentMethod
      ? shippingFromStorage?.paymentMethod
      : "",
  };
};
export const validationSchema = Yup.object({
  // shipping method (_id is office id)
  wants_delivery: Yup.string().required("Required"),
  cityId: Yup.string().when("wants_delivery", (wants_delivery, schema) =>
    String(wants_delivery) === "True" ? schema.required("Required") : schema
  ),
  _id: Yup.string().when("wants_delivery", (wants_delivery, schema) =>
    String(wants_delivery) === "False" ? schema.required("Required") : schema
  ),

  // shipping details
  physicPerson: Yup.string().required("Required"),
  first_name: Yup.string().when("physicPerson", (physicPerson, schema) =>
    String(physicPerson) === "True" ? schema.required("Required") : schema
  ),
  last_name: Yup.string().when("physicPerson", (physicPerson, schema) =>
    String(physicPerson) === "True" ? schema.required("Required") : schema
  ),
  id: Yup.string().when("physicPerson", (physicPerson, schema) =>
    String(physicPerson) === "True" ? schema.required("Required") : schema
  ),
  company_name: Yup.string().when("physicPerson", (physicPerson, schema) =>
    String(physicPerson) === "False" ? schema.required("Required") : schema
  ),
  company_type: Yup.string().when("physicPerson", (physicPerson, schema) =>
    String(physicPerson) === "False" ? schema.required("Required") : schema
  ),
  company_id: Yup.string().when("physicPerson", (physicPerson, schema) =>
    String(physicPerson) === "False" ? schema.required("Required") : schema
  ),
  phone: Yup.string().required("Required"),
  address: Yup.string().when("wants_delivery", (wants_delivery, schema) =>
    String(wants_delivery) === "True" ? schema.required("Required") : schema
  ),

  // payment method
  paymentMethod: Yup.string().required("Required"),
});
