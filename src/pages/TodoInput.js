import { Box, Button, TextField } from "@mui/material";
import React from "react";

const TodoInput = ({ value, onChange, onSubmit, ...props }) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={inputContainerSxProps}>
      <TextField
        label="Add your new todo."
        name="todo"
        value={value}
        onChange={onChange}
        sx={{ margin: "10px 0" }}
        {...props}
      />
      <Button type="submit" variant="contained">
        추가
      </Button>
    </Box>
  );
};

export default TodoInput;

const inputContainerSxProps = {
  display: "flex",
  flexDirection: "column",
  margin: "10px 0",
};
