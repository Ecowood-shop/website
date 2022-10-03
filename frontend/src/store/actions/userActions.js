// CONSTANTS
import USER from "../constants/userConstants";

//AXIOS
import { useCustomAxios } from "../../hooks/useAxios";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER.GET_PROFILE_REQUEST,
    });
    const { data } = await useCustomAxios.get(`/api/users/profile`);

    dispatch({
      type: USER.GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER.GET_PROFILE_FAIL,
      payload: error?.message,
    });
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER.PROFILE_UPDATE_REQUEST,
    });

    const { data } = await useCustomAxios.put("/api/users/profile/update/", {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      password: formData.password,
    });

    dispatch({
      type: USER.PROFILE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER.PROFILE_UPDATE_FAIL,
      payload: error?.message,
    });
  }
};
