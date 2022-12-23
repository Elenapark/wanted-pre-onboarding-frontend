import { Box, Button, TextField } from "@mui/material";
import React from "react";

const TodoInput = ({ label, value, onChange, onSubmit, btnText, ...props }) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={inputContainerSxProps}>
      <TextField
        label={label}
        name="todo"
        value={value}
        onChange={onChange}
        sx={{ margin: "10px 0" }}
        {...props}
      />
      <Button type="submit" variant="contained">
        {btnText}
      </Button>
    </Box>
  );
};

export default TodoInput;

const inputContainerSxProps = {
  display: "flex",
  flexDirection: "column",
};
