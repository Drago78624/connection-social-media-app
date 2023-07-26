import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Browse from "./pages/Browse";
import Error from "./pages/Error";
import Logout from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element:  <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "browse", element: <Browse /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />
};

export default App;
