import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase-config";

const Login = () => {
  const [wrongPass, setWrongPass] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const formSchema = yup.object().shape({
    email: yup.string().email().required("Please enter an email"),
    password: yup.string().min(8).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onLogin = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("logged in successfully")
    } catch (err) {
      const errorCode = err.code;
      if (errorCode === "auth/wrong-password") {
        console.log("wrong password");
        setWrongPass(true);
      } else if (errorCode === "auth/user-not-found") {
        console.log("user does not exist");
        setUserNotFound(true);
      } else {
        console.log(err);
      }
    }
  };

  const onLogInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto flex-col flex min-h-screen justify-center items-center">
      <div className="mb-12">
        <h1 className="text-center text-3xl md:text-5xl mb-2 font-semibold">
          Welcome back to Connection
        </h1>
        <p className="text-center text-md md:text-xl">Log in and Reconnect!</p>
      </div>
      <form onSubmit={handleSubmit(onLogin)} className="sm:w-[300px] md:w-[350px] lg:w-[400px] mx-auto">
        <div className="form-control w-full max-w-2xl mb-3">
          <input
            type="text"
            placeholder="Email Address"
            className="input input-bordered w-full shadow-lg"
            {...register("email")}
          />
          <p className="text-error mt-1">
            {(errors.email && errors.email.message) ||
              (userNotFound && "User does not exist")}
          </p>
        </div>
        <div className="form-control w-full max-w-2xl mb-3">
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full shadow-lg"
            {...register("password")}
          />
          <p className="text-error mt-1">
            {(errors.password &&
              errors.password.message.charAt(0).toUpperCase() +
                errors.password?.message.slice(1)) ||
              (wrongPass && "Bad email or password")}
          </p>
        </div>
        <div className="form-control w-full max-w-2xl mb-3">
          <input
            type="submit"
            value="login"
            className="w-full btn btn-secondary shadow-lg"
          />
        </div>
        <div className="divider">OR</div>
      </form>
        <div className="sm:w-[300px] md:w-[350px] lg:w-[400px] mx-auto">
          <button onClick={onLogInWithGoogle} className="btn btn-error w-full shadow-lg">
            Sign in With Google
          </button>
        </div>
    </div>
  );
};

export default Login;
