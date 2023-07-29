import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { auth, db, googleAuthProvider, storage } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, where, query, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const SignUp = () => {
  const [userExists, setUserExists] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const userdataCollectionRef = collection(db, "userdata");
  const [loading, setLoading] = useState(false);

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    email: yup.string().email().required("Please enter an email"),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSignUp = async (data) => {
    setLoading(true);
    try {
      const q = query(
        userdataCollectionRef,
        where("username", "==", data.username)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        // userdata saving
        const imageRef = ref(storage, `profiles/${data.image[0].name + v4()}`);
        await uploadBytes(imageRef, data.image[0]);
        const url = await getDownloadURL(imageRef);
        await addDoc(userdataCollectionRef, {
          id: res.user.uid,
          username: data.username,
          profUrl: url,
        });
      } else {
        setUsernameTaken(true);
        setTimeout(() => {
          setUsernameTaken(false);
        }, 3000);
      }
    } catch (err) {
      const errorCode = err.code;
      if (errorCode === "auth/email-already-in-use") {
        setUserExists(true);
        setTimeout(() => {
          setUserExists(false);
        }, 3000);
      } else {
        console.log(err);
      }
    }
    setLoading(false);
  };

  const onSignUpWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleAuthProvider);
      const q = query(userdataCollectionRef, where("id", "==", res.user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await addDoc(userdataCollectionRef, {
          id: res.user.uid,
          username: res.user.displayName,
          profUrl: res.user.photoURL,
        });
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto flex-col flex min-h-screen justify-center items-center">
      <div className="mb-12">
        <h1 className="text-center text-3xl md:text-5xl mb-2 font-semibold">
          Join Connection
        </h1>
        <p className="text-center text-md md:text-xl">
          Your Social Hub Awaits!
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSignUp)}
        className="sm:w-[300px] md:w-[350px] lg:w-[400px] mx-auto"
      >
        <div className="form-control w-full max-w-2xl mb-3">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full shadow-lg"
            {...register("username")}
          />
          <p className="text-error mt-1">
            {(errors.username && errors.username.message) ||
              (usernameTaken && "Username already taken")}
          </p>
        </div>
        <div className="form-control w-full max-w-2xl mb-3">
          <input
            type="text"
            placeholder="Email Address"
            className="input input-bordered w-full shadow-lg"
            {...register("email")}
          />
          <p className="text-error mt-1">
            {(errors.email && errors.email.message) ||
              (userExists && "User already exists")}
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
            {errors.password &&
              errors.password.message.charAt(0).toUpperCase() +
                errors.password.message.slice(1)}
          </p>
        </div>
        <div className="form-control w-full max-w-2xl mb-3">
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full shadow-lg"
            {...register("confirmPassword")}
          />
          <p className="text-error mt-1">
            {errors.confirmPassword && errors.confirmPassword?.message}
          </p>
        </div>
        <div className="form-control w-full max-w-2xl mb-3">
          <label htmlFor="image" className="mb-2">
            Choose Profile Picture
          </label>
          <input
            type="file"
            id="image"
            placeholder="dfd"
            className="file-input file-input-bordered w-full"
            {...register("image")}
          />
        </div>
        <div className="form-control w-full max-w-2xl mb-3">
          {loading ? (
            <button className="w-full btn btn-secondary shadow-lg">
              <span className="loading loading-spinner"></span>
              Signing up
            </button>
          ) : (
            <button className="w-full btn btn-secondary shadow-lg">
              Sign up
            </button>
          )}
        </div>
        <div className="divider">OR</div>
      </form>
      <div className="sm:w-[300px] md:w-[350px] lg:w-[400px] mx-auto">
        <button
          onClick={onSignUpWithGoogle}
          className="btn btn-error w-full shadow-lg"
        >
          Sign in With Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
