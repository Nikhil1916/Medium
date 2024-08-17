import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "../pages/Signup";
import Blog from "../pages/Blog";
import Signin from "../pages/Signin";
const Body = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/blogs",
      element: <Blog />,
    },
    {
      path: "/blog/:id",
      element: <Blog />,
    },
  ]);
  return <div>
    <RouterProvider router={router} />
  </div>;
};

export default Body;
