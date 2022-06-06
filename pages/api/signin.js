// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default function handler(req, res) {
   res.status(200).json({ name: "John Doe" });
}

export const API = axios.create({ baseURL: "https://admin-app-bakend.herokuapp.com/" });
// export const API = axios.create({ baseURL: "http://localhost:5000/" });


const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

API.interceptors.request.use((request) => {
   request.headers.Authorization = `Bearer ${getToken()}`;
   return request;
});
// console.log(localStorage.getItem("token"));
// export const SignIn = async (values) => {
//    try {
//       const { data } = await API.post(`/users/login`, values);
//       return data;
//    } catch (error) {
//       return error.response;
//    }
// };
