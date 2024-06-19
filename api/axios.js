import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  //   headers: {
  //     "x-csrf-token": document
  //       .querySelector("[name='csrf-token']")
  //       .getAttribute("content"),
  //   },
});

export default axios;
