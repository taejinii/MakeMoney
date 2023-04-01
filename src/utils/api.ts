import customAxios from "./axios";

const userId = Number(localStorage.getItem("USER_ID"));
export const getItem = async () => {
  try {
    const response = await customAxios.get(`/items?userId=${userId}`);
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
    return await customAxios.post("/items", { ...data, userId });
  } catch (err) {
    console.log(err);
  }
};

interface UserType {
  email: string;
  password: string;
  name?: string;
}
export const login = async (data: UserType) => {
  try {
    return await customAxios.post("/login", data).then((res) => {
      localStorage.setItem("USER_ID", res.data.user.id);
      localStorage.setItem("USER_NAME", res.data.user.name);
      console.log(res);
    });
  } catch (err) {
    console.log(err);
  }
};
export const signup = async (data: UserType) => {
  try {
    return await customAxios.post("/register", data);
  } catch (err) {
    console.log(err);
  }
};
