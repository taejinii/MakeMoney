import customAxios from "./axios";
export const getItem = async () => {
  try {
    const response = await customAxios.get("/items");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteItem = (id: number) => {
  try {
    return customAxios.delete(`/items/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const addItem = async (data: any) => {
  try {
    return await customAxios.post("/items", data);
  } catch (err) {
    console.log(err);
  }
};
