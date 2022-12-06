import { API } from "../config/api";

export const getTodoList = async (token) => {
  try {
    const res = await fetch(`${API}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("API 응답에 실패했습니다."));
  } catch (err) {
    console.error(`API 응답에 실패했습니다.${err}`);
  }
};

export const addTodo = async (token, content) => {
  try {
    const res = await fetch(`${API}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("API 요청에 실패했습니다."));
  } catch (err) {
    console.error(`API 응답에 문제가 있습니다. ${err}`);
  }
};

export const updateTodo = async (token, id, content) => {
  try {
    const res = await fetch(`${API}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("API 요청에 실패했습니다."));
  } catch (err) {
    console.error(`API 응답에 문제가 있습니다. ${err}`);
  }
};

export const deleteTodo = async (token, id) => {
  try {
    const res = await fetch(`${API}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("API 요청에 실패했습니다."));
  } catch (err) {
    console.error(`API 응답에 문제가 있습니다. ${err}`);
  }
};
