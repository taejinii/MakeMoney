import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

const customAxios = axios.create({
  baseURL,
});

export default customAxios;
