// Import slices
import registerSlice from "./registerSlice";
import forgotPasswordSlice from "./forgotPasswordSlice";
import resetPasswordSlice from "./resetPasswordSlice";
import verificationSlice from "./verificationSlice";

// Export ayth reducer
export const authReducers = {
  register: registerSlice,
  forgotPassword: forgotPasswordSlice,
  resetPassword: resetPasswordSlice,
  verification: verificationSlice,
};
