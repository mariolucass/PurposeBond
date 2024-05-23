import axios from "axios";
const baseURL = "";
export const localURL = "http://localhost:3000";

export const api = axios.create({
  baseURL: localURL,
  timeout: 25000,
});
