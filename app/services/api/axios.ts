// import axios from "axios";

// export const api = axios.create({
//   baseURL:
//     process.env.NEXT_PUBLIC_API_URL || "",
//   timeout: 15000,
// });
import axios from "axios";

alert(
  `API_URL = ${process.env.NEXT_PUBLIC_API_URL}`
);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 15000,
});