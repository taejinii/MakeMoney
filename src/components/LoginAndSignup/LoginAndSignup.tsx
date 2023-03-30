import React from "react";
import Button from "../common/Button";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import customAxios from "../../utils/axios";
import axios from "axios";
interface UserTypes {
  isUser: boolean;
  frame: {
    title: string;
    text: string;
  };
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const LeftSection = styled.div`
  width: 600px;
  height: 800px;
  @media screen and (max-width: 1240px) {
    display: none;
  }
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 600px;
  height: 800px;
  @media screen and (max-width: 1240px) {
    width: 100%;
    height: 100%;
  }
  /* height: 500px; */
`;
const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  border: 2px solid black;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
`;
export default function LoginAndSignup({ isUser, frame }: UserTypes) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (isUser) {
      axios
        .post("https://salty-yielding-harpymimus.glitch.me/login", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      console.log("login");
    } else {
      axios
        .post("https://salty-yielding-harpymimus.glitch.me/register", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      console.log("signup");
    }

    // console.log(data);
  };
  return (
    <Container>
      <div className="flex shadow-2xl">
        <LeftSection>
          <img
            alt="logoimage"
            src="https://wallpapercave.com/uwp/uwp905534.png"
            className="w-full h-full object-cover"
          />
        </LeftSection>
        <RightSection>
          <h1 className="text-3xl font-mono font-bold">{frame.title}</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full p-6 gap-6"
          >
            {!isUser && (
              <Label htmlFor="name" className="flex flex-col">
                <span>name</span>
                <Input id="name" {...register("name")} />
              </Label>
            )}
            <Label htmlFor="email">
              <span>email</span>
              <Input id="email" {...register("email")} />
            </Label>
            <Label htmlFor="password">
              <span>password</span>
              <Input id="password" {...register("password")} />
            </Label>

            <Button>{frame.title}</Button>
            <Link to={isUser ? "/signup" : "/login"} className="text-center">
              {frame.text}
            </Link>
          </form>
        </RightSection>
      </div>
    </Container>
  );
}
