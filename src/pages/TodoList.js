import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addTodo,
  getTodoList,
  updateTodo,
  deleteTodo,
} from "../services/todo_service";
import customStorage from "../utils/customStorage";
import TodoInput from "./TodoInput";
import { useNavigate } from "react-router-dom";

export const ACCESS_TOKEN_KEY = "accessToken";

const TodoList = () => {
  const userToken = customStorage.getItem(ACCESS_TOKEN_KEY, null);
  const navigate = useNavigate();

  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editInput, setEditInput] = useState("");

  const storageToken = customStorage.getItem(ACCESS_TOKEN_KEY, null, (err) => {
    console.error(err);
  });

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    await addTodo(storageToken, {
      todo: todoInput,
    });

    getTodos();
    setTodoInput("");
  };

  const handleUpdateTodo = async (existTodo) => {
    await updateTodo(storageToken, editingItem, {
      todo: editInput ? editInput : existTodo,
      isCompleted,
    });
    setEditInput("");
    setEditingItem(null);
    getTodos();
  };

  const handleDeleteTodo = async (id) => {
    const res = await deleteTodo(storageToken, id);
    if (res.status === 204) {
      alert("삭제되었습니다.");
      getTodos();
    }
  };

  const getTodos = async () => {
    const res = await getTodoList(storageToken);
    setTodos(res);
  };

  useEffect(() => {
    if (!userToken) {
      alert("로그인 정보가 없어 회원가입 및 로그인 페이지로 이동합니다.");
      navigate("/");
    }
    getTodos();
  }, []);

  return (
    <Box sx={registerFormSxProps}>
      <Typography variant="h5" fontWeight="bold">
        Todo List
      </Typography>

      {/* todo input */}
      <TodoInput
        value={todoInput}
        onChange={handleInputChange}
        onSubmit={handleTodoSubmit}
      />

      {/* todo list */}
      <Stack component="ul" spacing={2} mt={2}>
        {todos.map((todo) => {
          return (
            <>
              <Box key={`list ${todo.id}`} component="li" sx={todoSxProps}>
                <Typography
                  sx={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                    color: "primary.main",
                    fontSize: 18,
                  }}
                >
                  {todo.todo}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={() => setEditingItem(todo.id)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    삭제
                  </Button>
                </Stack>
              </Box>
              {/* edit mode view */}
              <Box
                sx={{
                  display: todo.id === editingItem ? "block" : "none",
                }}
              >
                {todo.id === editingItem &&
                  todos.map((todo) => {
                    if (todo.id === editingItem) {
                      return (
                        <Box key={`edit ${todo.id}`} sx={editSxProps}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                              checked={isCompleted}
                              onChange={() => setIsCompleted(!isCompleted)}
                              inputProps={{ "aria-label": "controlled" }}
                              sx={checkboxSxProps}
                            />
                            <TextField
                              label="Edit"
                              name="editTodo"
                              placeholder={todo.todo}
                              value={editInput}
                              onChange={(e) => setEditInput(e.target.value)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            >
                              {todo.todo}
                            </TextField>
                          </Box>
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="outlined"
                              onClick={() => handleUpdateTodo(todo.todo)}
                            >
                              제출
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setEditingItem(null);
                              }}
                            >
                              취소
                            </Button>
                          </Stack>
                        </Box>
                      );
                    }
                  })}
              </Box>
            </>
          );
        })}
      </Stack>
    </Box>
  );
};

export default TodoList;

const registerFormSxProps = {
  maxWidth: 370,
  width: "100%",
  background: "#fff",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
};

const todoSxProps = {
  background: "background.default",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const editSxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  ".MuiInputBase-input": {
    padding: "8px",
  },
};

const checkboxSxProps = {
  padding: 0,
  mr: 1,
  color: "primary.main",
  "&.Mui-checked": {
    color: "secondary.main",
  },
};
