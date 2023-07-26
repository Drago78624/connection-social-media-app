import React from "react";

const Login = () => {
  return (
    <div className="container mx-auto flex-col flex min-h-screen justify-center items-center">
      <div className="mb-12">
        <h1 className="text-center text-3xl md:text-5xl mb-2 font-semibold">
          Welcome back to Connection
        </h1>
        <p className="text-center text-md md:text-xl">Log in and Reconnect!</p>
      </div>
      <form className="sm:w-[300px] md:w-[350px] lg:w-[400px] mx-auto">
        <div className="form-control w-full max-w-2xl mb-3">
          <input
            type="text"
            placeholder="Email Address"
            className="input input-bordered w-full shadow-lg"
          />
        </div>
        <div className="form-control w-full max-w-2xl mb-3">
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full shadow-lg"
          />
        </div>
        <div className="form-control w-full max-w-2xl mb-3">
          <input
            type="submit"
            value="login"
            className="w-full btn btn-secondary shadow-lg"
          />
        </div>
        <div className="divider">OR</div>
        <div>
          <button className="btn btn-error w-full shadow-lg">
            Sign in With Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
