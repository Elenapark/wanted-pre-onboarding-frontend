import axiosRequest from "./request";

export const getTodoList = async () => {
  try {
    const res = await axiosRequest.get(`/todos`);
    if (res.data) {
      return res.data;
    }
    return Promise.reject(new Error("API 응답에 실패했습니다."));
  } catch (err) {
    throw new Error(`API 응답에 실패했습니다.${err}`);
  }
};

export const addTodo = async (content) => {
  try {
    const res = await axiosRequest.post(`/todos`, content);
    if (res) {
      return res;
    }
    return Promise.reject(new Error("API 요청에 실패했습니다."));
  } catch (err) {
    throw new Error(`API 응답에 문제가 있습니다. ${err}`);
  }
};

export const updateTodo = async (id, content) => {
  try {
    const res = await axiosRequest.put(`/todos/${id}`, content);
    if (res) {
      return res;
    }
    return Promise.reject(new Error("API 요청에 실패했습니다."));
  } catch (err) {
    throw new Error(`API 응답에 문제가 있습니다. ${err}`);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axiosRequest.delete(`/todos/${id}`);
    if (res) {
      return res;
    }
    return Promise.reject(new Error("API 요청에 실패했습니다."));
  } catch (err) {
    throw new Error(`API 응답에 문제가 있습니다. ${err}`);
  }
};
