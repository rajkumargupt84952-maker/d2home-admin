import axios from "axios";
import { baseUrl } from "./url";

export const postRequest = async (api, body) => {
  try {
    return await axios.post(baseUrl + api, body).then((res) => {
      return { error: null, data: res.data };
    });
  } catch (error) {
    return { error, data: null };
  }
};
export const getRequest = async (api) => {
  try {
    return await axios.get(baseUrl + api).then((res) => {
      return { error: null, data: res.data };
    });
  } catch (error) {
    return { error, data: null };
  }
};
