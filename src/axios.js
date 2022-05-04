import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("token")
      ? `Token ${localStorage.getItem("token")}`
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//     async function (error) {
      
//     if (typeof error.response === "undefined") {
//       alert(
//         "A server/network error occurred. " +
//           "Looks like CORS might be the problem. " +
//           "Sorry about this - we will get it fixed shortly."
//       );
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401) {
//       window.location.href = "/login";
//       return Promise.reject(error);
//     }

//     if (
//       error.response.data.code === "token_not_valid" &&
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//         console.log("Token not available.");
//         window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;