import axiosRequest from "./request";

export const register = async (contents) => {
  try {
    const res = await axiosRequest.post("/auth/signup", contents);
    return res;
  } catch (err) {
    console.error(`API 응답에 실패했습니다.${err}`);
    throw err;
  }
};
