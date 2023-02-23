import axios from "axios";
export const getItem = async () => {
  const response = await axios.get("http://localhost:3001/items");
  return response.data;
};
