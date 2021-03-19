import * as ActionList from "./ActionsList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MetriMeo from "../../API/MetriMeo";
import { Toast } from "native-base";

export const IS_LOGGED_IN = () => ({
  type: ActionList.IS_LOGGED_IN,
});

export const IS_LOGGED_OUT = () => ({
  type: ActionList.IS_LOGGED_OUT,
});

export const TOKEN = (payload) => ({
  type: ActionList.USER_TOKEN,
  payload,
});

export const EXPO_TOKEN = (payload) => ({
  type: ActionList.EXPO_TOKEN,
  payload,
});

const SUCCESS = (msg) => {
  return Toast.show({
    text: msg,
    style: { margin: 10, borderRadius: 7 },
    textStyle: { textAlign: "center" },
    type: "success",
  });
};

const ERROR = (msg) => {
  return Toast.show({
    text: msg,
    type: "danger",
    style: { margin: 10, borderRadius: 7 },
    textStyle: { textAlign: "center" },
  });
};

export const USER_REGISTER = (data, errorCallback, callback) => {
  return async (dispatch) => {
    await MetriMeo.post("users/register", data)
      .then((response) => {
        SUCCESS("Registration Successful!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        errorCallback();
      });
  };
};
export const CONTACT = (data, errorCallback, callback) => {
  return async (dispatch) => {
    await MetriMeo.post("users/contactus", data)
      .then((response) => {
        SUCCESS("Response Submitted Successfully!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        errorCallback();
      });
  };
};

export const CAREER = (data, errorCallback, callback) => {
  return async (dispatch) => {
    await MetriMeo.post("users/uploadcareersdata/", data)
      .then((response) => {
        SUCCESS(" Careers Form Submitted Successfully!");
        callback();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        errorCallback();
      });
  };
};

export const USER_LOGIN = (data, callback) => {
  return async (dispatch) => {
    await MetriMeo.post("users/login/", data)
      .then((response) => {
        SUCCESS("Login Successful");
        dispatch(USER(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const USER = (data) => {
  return async (dispatch) => {
    await AsyncStorage.setItem("Token", JSON.stringify(data));
    dispatch(TOKEN(data));
    dispatch(IS_LOGGED_IN());
  };
};

export const GET_USER_IMAGE = (id, callback) => {
  return async (dispatch) => {
    await MetriMeo.get("users/getimage/" + id)
      .then((response) => {
        console.log(response.data.length);
        callback(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
      });
  };
};

export const GET_USER_TOKEN = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("Token");
    if (token !== null) {
      dispatch(IS_LOGGED_IN());
      dispatch(TOKEN(JSON.parse(token)));
    }
  };
};

export const DEL_USER_TOKEN = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("Token");
    dispatch(IS_LOGGED_OUT());
  };
};
