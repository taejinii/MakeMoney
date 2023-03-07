import axios from "axios";
export const getItem = async () => {
  try {
    const response = await axios.get(
      "https://restul-api-json-server-vercel.vercel.app/items"
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteItem = (id: number) => {
  try {
    return axios.delete(`http://localhost:3001/items/${id}`);
  } catch (err) {
    console.log(err);
  }
};
