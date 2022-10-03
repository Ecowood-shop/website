// REACT
import { useEffect, useState } from "react";
import Select from "react-select";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
} from "../../../../../store/actions/systemActions";

// COMPONENTS
import Loader from "../../../../../components/loader/Loader";
import Message from "../../../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";

function Colors() {
   // HOOKS
  const dispatch = useDispatch();


  const systemProduct = useSelector((state) => state.systemProduct);
  const { error, loading, product } = systemProduct;


  const onSubmit = () => {
    // dispatch(updateProduct(id, data));
  };

  useEffect(() => {
    dispatch(getProduct(id));
    if (success) navigate("/admin/products/");
  }, [dispatch, success]);
console.log(product)
  return (
    <div>Colors</div>
  )
}

export default Colors