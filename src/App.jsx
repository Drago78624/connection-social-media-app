import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import AuthContextProvider from "./contexts/AuthContextProvider";
import { checkAuthLoader } from "./auth";

const Browse = lazy(() => import("./pages/Browse"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <SignUp /> },
      { path: "login", element: <Login /> },
      {
        path: "browse",
        element: (
          <Suspense fallback={"loadin..."}>
            <Browse />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
