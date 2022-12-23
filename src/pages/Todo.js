import React, { useEffect, useState } from "react";
import { Box, Link, Typography } from "@mui/material";
import {
  addTodo,
  getTodoList,
  updateTodo,
  deleteTodo,
} from "../services/todo_service";
import customStorage from "../utils/customStorage";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";

export const ACCESS_TOKEN_KEY = "accessToken";

const Todo = () => {
  const navigate = useNavigate();
  const storageToken = customStorage.getItem(ACCESS_TOKEN_KEY, null);

  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editInput, setEditInput] = useState("");

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    if (!todoInput) {
      alert("할일을 입력해주세요!");
      return;
    }
    await addTodo({
      todo: todoInput,
    });

    await getTodos();
    setTodoInput("");
  };

  const handleUpdateTodo = async (existTodo) => {
    await updateTodo(editingItem, {
      todo: editInput ? editInput : existTodo,
      isCompleted,
    });
    setEditInput("");
    setEditingItem(null);
    await getTodos();
  };

  const handleDeleteTodo = async (id) => {
    const res = await deleteTodo(id);
    if (res.status === 204) {
      alert("삭제되었습니다.");
      await getTodos();
    }
  };

  const getTodos = async () => {
    const res = await getTodoList();
    setTodos(res);
  };

  useEffect(() => {
    if (!storageToken) {
      alert("로그인 정보가 없어 회원가입 및 로그인 페이지로 이동합니다.");
      navigate("/");
    }
    getTodos();
  }, []);

  return (
    <Box sx={registerFormSxProps}>
      {/* title, logout */}
      <Box sx={titleBoxSxProps}>
        <Typography variant="h6" fontWeight="bold">
          Todo List
        </Typography>
        <Link
          onClick={() => {
            alert("로그아웃되었습니다.");
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            navigate("/signIn");
          }}
          sx={{ fontSize: 14 }}
        >
          로그아웃하기
        </Link>
      </Box>

      {/* todo input */}
      <TodoInput
        label="오늘 할일은 무엇인가요?"
        btnText="할일 추가하기"
        value={todoInput}
        onChange={handleInputChange}
        onSubmit={handleTodoSubmit}
      />

      {/* todo list */}
      <TodoList
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        editInput={editInput}
        setEditInput={setEditInput}
      />
    </Box>
  );
};

export default Todo;

const registerFormSxProps = {
  maxWidth: 370,
  width: "100%",
  background: "#fff",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
};

const titleBoxSxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
