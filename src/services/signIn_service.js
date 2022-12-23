import axiosRequest from "./request";

export const signIn = async (contents) => {
  try {
    const res = await axiosRequest.post(`/auth/signin`, contents);
    return res;
  } catch (error) {
    console.error(`API 응답에 문제가 생겼습니다. ${error}`);
    throw error;
  }
};
