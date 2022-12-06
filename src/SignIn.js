import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "./services/signIn_service";
import customStorage from "./utils/customStorage";

const SignIn = () => {
  const navigate = useNavigate();
  const emailRef = useRef();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [accessToken, setAccessToken] = useState("");
  const [resError, setResError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    const res = await signIn({
      email,
      password,
    });

    if (res.access_token) {
      setAccessToken(res.access_token);
      customStorage.setItem("accessToken", res.access_token);
      alert("로그인되었습니다.");
      navigate("/todo");
    } else {
      setResError(res);
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={RegisterFormSxProps}>
      {resError && <Box sx={errorSxProps}>{resError.message}</Box>}
      <Typography variant="h6">로그인</Typography>
      <Stack sx={InputFieldSxProps} spacing={2}>
        <TextField
          label="Email"
          inputRef={emailRef}
          name="email"
          value={input.email}
          onChange={handleInputChange}
          autoComplete="off"
          inputProps={{
            form: {
              autocomplete: "off",
            },
          }}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={input.password}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        <Button
          type="submit"
          disabled={!input.email || !input.password}
          variant="contained"
        >
          로그인하기
        </Button>
      </Stack>
      <Stack spacing={1}>
        <Typography>아직 회원이 아니신가요?</Typography>
        <Link onClick={() => navigate("/")}>가입하기</Link>
      </Stack>
    </Box>
  );
};

export default SignIn;

const RegisterFormSxProps = {
  maxWidth: 370,
  width: "100%",
  background: "#fff",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
};

const InputFieldSxProps = {
  display: "flex",
  flexDirection: "column",
  margin: "10px 0",
};

const errorSxProps = {
  bgcolor: "secondary.main",
  color: "#fff",
  padding: "10px",
  borderRadius: "4px",
  fontSize: "14px",
  mb: 2,
};
