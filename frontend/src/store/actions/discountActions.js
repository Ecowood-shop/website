// axios
import { useCustomAxios} from "../../hooks/useAxios";
// discount
import DISCOUNT from "../constants/discountConstants";

export const getDiscounts = () => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT.GET_DISCOUNT_REQUEST,
    });
    const { data } = await useCustomAxios.get(`/api/products/discounts/`);

    dispatch({
      type: DISCOUNT.GET_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT.GET_DISCOUNT_FAIL,
      payload: error?.message,
    });
  }
};


export const createDiscount = () => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT.CREATE_DISCOUNT_REQUEST,
    });
    const { data } = await useCustomAxios.get(`/api/products/discounts/`);

    dispatch({
      type: DISCOUNT.CREATE_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT.CREATE_DISCOUNT_FAIL,
      payload: error?.message,
    });
  }
};

