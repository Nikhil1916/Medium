import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "../pages/Signup";
import Blog from "../pages/Blog";
import Signin from "../pages/Signin";
import Blogs from "../pages/Blogs";
import MainLayout from "./Mainlayout";
import Publish from "../pages/Publish";
const Body = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children:[
        {
          path: "/",
          element: <Blogs />,
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
          element: <Blogs />,
        },
        {
          path: "/blog/:id",
          element: <Blog />,
        },
        {
          path:"/publish",
          element: <Publish/>
        }
      ]
    },
  ]);
  return <div>
    <RouterProvider router={router} />
  </div>;
};

export default Body;
