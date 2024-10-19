import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.1.104:8084/api/auth/";

const register = (username, email, password, name, phone, role) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    name,
    phone,
    role,
  });
};

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "client/signin", {
      username,
      password,
    });

    if (response.data.username) {
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem("user");
    const response = await axios.post(API_URL + "logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
