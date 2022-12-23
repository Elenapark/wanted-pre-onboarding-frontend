import {
  Box,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import React from "react";

export default function TodoList(props) {
  const {
    todos,
    handleDeleteTodo,
    handleUpdateTodo,
    editInput,
    setEditInput,
    editingItem,
    setEditingItem,
    isCompleted,
    setIsCompleted,
  } = props;
  return (
    <Stack component="ul" spacing={2} mt={todos.length > 0 ? 2 : 0}>
      {todos.map((todo) => {
        return (
          <Box key={`list ${todo.id}`}>
            <Box component="li" sx={todoSxProps}>
              <Typography
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  color: todo.isCompleted ? "#ccc" : "",
                  fontSize: 16,
                }}
              >
                {todo.todo}
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  onClick={() => setEditingItem(todo.id)}
                  aria-label="edit todo item"
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteTodo(todo.id)}
                  aria-label="delete todo item"
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Box>
            {/* edit mode view */}
            <Box
              sx={{
                display: todo.id === editingItem ? "block" : "none",
              }}
            >
              {todos.map((todo) => {
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
                        <IconButton
                          variant="outlined"
                          onClick={() => handleUpdateTodo(todo.todo)}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setEditingItem(null);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Stack>
                    </Box>
                  );
                }
              })}
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}

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
  ".MuiInputBase-input": {
    padding: "8px",
  },
};

const checkboxSxProps = {
  padding: 0,
  mr: 1,
  color: "primary.main",
};
