import { Box, Button, TextField } from "@mui/material";
import React from "react";

const TodoInput = ({ value, onChange, onSubmit, ...props }) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={inputContainerSxProps}>
      <TextField
        label="오늘 할일은 무엇인가요?"
        name="todo"
        value={value}
        onChange={onChange}
        sx={{ margin: "10px 0" }}
        {...props}
      />
      <Button type="submit" variant="contained">
        할일 추가하기
      </Button>
    </Box>
  );
};

export default TodoInput;

const inputContainerSxProps = {
  display: "flex",
  flexDirection: "column",
};
