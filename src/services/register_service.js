import { API } from "../config/api";

export const register = async (contents) => {
  try {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contents),
    });

    return res.json();
  } catch (err) {
    console.error(`API 응답에 실패했습니다.${err}`);
  }
};
