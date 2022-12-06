import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./services/register_service";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
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
              ? "이메일이 입력되지 않았습니다."
              : !validEmail
              ? "이메일 형식이 올바르지 않습니다."
              : ""
          }
          error={!validEmail}
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
              ? "비밀번호가 입력되지 않았습니다."
              : !validPassword
              ? "비밀번호는 대,소문자,숫자,특수기호가 최소한 1글자 이상 필요합니다."
              : ""
          }
          error={!validPassword}
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
        <Link href="/signIn">로그인하기</Link>
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
};

const errorSxProps = {
  bgcolor: "secondary.main",
  color: "#fff",
  padding: "10px",
  borderRadius: "4px",
  fontSize: "14px",
  mb: 2,
};