import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./services/register_service";
import { ACCESS_TOKEN_KEY } from "./TodoList";
import customStorage from "./utils/customStorage";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userToken = customStorage.getItem(ACCESS_TOKEN_KEY, null);
  const navigate = useNavigate();
  const emailRef = useRef();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [resError, setResError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    const res = await register({
      email,
      password,
    });
    if (res.access_token) {
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/signIn");
    } else {
      setResError(res);
    }
  };

  useEffect(() => {
    const result = EMAIL_REGEX.test(input.email);
    setValidEmail(result);
  }, [input.email]);

  useEffect(() => {
    const result = PWD_REGEX.test(input.password);
    setValidPassword(result);
  }, [input.password]);

  useEffect(() => {
    if (userToken) {
      alert("로그인된 유저이므로 바로 투두리스트로 이동합니다.");
      navigate("/todo");
    }
    emailRef.current.focus();
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={RegisterFormSxProps}>
      {resError && <Box sx={errorSxProps}>{resError.message}</Box>}
      <Typography variant="h6">회원가입</Typography>
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
          helperText={
            !input.email
              ? "이메일을 입력해주세요."
              : !validEmail
              ? "이메일은 '@'문자를 포함해야 합니다."
              : ""
          }
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={input.password}
          onChange={handleInputChange}
          autoComplete="off"
          helperText={
            !input.password
              ? "비밀번호를 입력해주세요."
              : !validPassword
              ? "비밀번호는 대,소문자,숫자,특수기호를 각 1글자 이상 포함해야 합니다."
              : ""
          }
        />
        <Button
          type="submit"
          disabled={!validEmail || !validPassword}
          variant="contained"
        >
          제출하기
        </Button>
      </Stack>
      <Stack spacing={1}>
        <Typography>이미 회원이신가요?</Typography>
        <Link onClick={() => navigate("/signIn")}>로그인하기</Link>
      </Stack>
    </Box>
  );
};

export default Register;

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
  ".MuiFormHelperText-root": {
    ml: 0.5,
    color: "primary.main",
  },
};

const errorSxProps = {
  bgcolor: "secondary.main",
  color: "#fff",
  padding: "10px",
  borderRadius: "4px",
  fontSize: "14px",
  mb: 2,
};
