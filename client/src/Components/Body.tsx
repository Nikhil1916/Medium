import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "../pages/Signup";
import Blog from "../pages/Blog";
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
      path: "/sign",
      element: <Signup />,
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
