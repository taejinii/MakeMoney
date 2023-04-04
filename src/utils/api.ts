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
/**아이템 삭제 요청 api 함수 */
export const deleteItem = async (id: number) => {
  try {
    return await customAxios.delete(`/items/${id}`);
  } catch (err) {
    console.log(err);
  }
};

/**아이템 수정 요청 api 함수 */
export const updateItem = async (id: number | undefined, data: any) => {
  try {
    return await customAxios.patch(`/items/${id}`, data);
  } catch (err) {
    console.log(err);
  }
};

/**인벤토리 아이템 저장 api 요청 함수 */
export interface IFormInput {
  buyDate: string | Date;
  buyPlace: string;
  productName: string;
  quantity: number;
  price: number;
  size: string | number;
  shipExpense: number;
  sellPrice: number;
}
export const addItem = async (data: IFormInput) => {
  try {
    const userId = Number(localStorage.getItem("USER_ID"));
    return await customAxios.post("/items", { ...data, userId });
  } catch (err) {
    console.log(err);
  }
};

/**판매여부 체크api 함수*/
export const checkSoldout = async (check: boolean, id: number) => {
  try {
    return await customAxios.patch(`/items/${id}`, { isSoldOut: check });
  } catch (err) {
    console.log(err);
  }
};

/**회원가입 및 로그인 함수 */
interface UserType {
  email: string;
  password: string;
  name?: string;
}
export const login = async (data: UserType) => {
  try {
    return await customAxios.post("/login", data).then((res) => {
      localStorage.setItem("USER_ID", res.data.user.id);
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

/**유저 정보 api */
export const getUserInfo = async (userId: number) => {
  try {
    const response = await customAxios.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
