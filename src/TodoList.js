import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addTodo, getTodoList } from "./services/todo_service";
import customStorage from "./utils/customStorage";
import { todos as todoMocks } from "./mocks/todos";
import TodoInput from "./TodoInput";

const ACCESS_TOKEN_KEY = "accessToken";

const TodoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
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
  };

  const getTodos = async () => {
    const res = await getTodoList(storageToken);
    setTodos(res);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Box sx={RegisterFormSxProps}>
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
            <Box key={todo.id} component="li" sx={todoSxProps}>
              <Typography
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  fontSize: 20,
                }}
              >
                {todo.todo}
              </Typography>
              <Button variant="contained">수정</Button>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default TodoList;

const RegisterFormSxProps = {
  maxWidth: 370,
  width: "100%",
  background: "#fff",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
};

const todoSxProps = {
  color: "secondary.main",
  padding: "12px",
  borderRadius: "4px",
  background: "background.default",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
