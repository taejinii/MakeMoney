import customAxios from "./axios";

export const getItem = async () => {
  try {
    const userId = Number(localStorage.getItem("USER_ID"));
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
    const userId = Number(localStorage.getItem("USER_ID"));

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
    console.error("로그인실패", err);
    throw new Error("로그인에 실패 하였습니다.");
  }
};
export const signup = async (data: UserType) => {
  try {
    return await customAxios.post("/register", data);
  } catch (err) {
    console.log(err);
    return err;
  }
};
