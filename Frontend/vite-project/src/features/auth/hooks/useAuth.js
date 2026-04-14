import { seterror, setuser, setloading } from "../auth.slice";
import { register, login } from "../service/auth.service";
import { useDispatch } from "react-redux";

export const UseAuth = () => {
  const dispatch = useDispatch();

  const getErrorMessage = (error, fallback) => {
    const responseData = error?.response?.data;

    if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
      return responseData.errors.map((item) => item.msg).join(". ");
    }

    return (
      responseData?.message ||
      responseData?.error ||
      error?.message ||
      fallback
    );
  };

  const Handleregisteruser = async (FullName, Email, Mobile, Password, ConfirmPassword) => {
    if (Password !== ConfirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }

    try {
      dispatch(setloading(true));
      const res = await register(FullName, Email, Mobile, Password);
      dispatch(seterror(null));
      dispatch(setuser(res?.user || null));
      return { success: true };
    } catch (error) {
      const message = getErrorMessage(error, "Registration failed");
      dispatch(seterror(message));
      return { success: false, error: message };
    } finally {
      dispatch(setloading(false));
    }
  };

  const Handleloginuser = async (Email, Password) => {
    try {
      dispatch(setloading(true));
      const res = await login(Email, Password);
      dispatch(seterror(null));
      dispatch(setuser(res?.user || null));
      return { success: true };
    } catch (error) {
      const message = getErrorMessage(error, "Login failed");
      dispatch(seterror(message));
      return { success: false, error: message };
    } finally {
      dispatch(setloading(false));
    }
  };

  return { Handleregisteruser, Handleloginuser };
};

