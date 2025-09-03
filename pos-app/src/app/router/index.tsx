import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@components/layout";
import Categories from "@pages/admin/categories";
import Kitchens from "@pages/admin/kitchens";
import Products from "@pages/admin/products";
import CheckOut from "@pages/checkout";
import Error from "@pages/error";
import Kitchen from "@pages/kitchen";
import Waiter from "@pages/waiter";
import LogIn from "@pages/admin/login";
import Devices from "@pages/admin/devices";
import Orders from "@pages/admin/orders";

const appRouter = createBrowserRouter([
  {
    element: <LogIn />,
    errorElement: <Error />,
    path: "/login",
  },
  {
    element: <Layout />,
    errorElement: <Error />,
    path: '/',
    children: [
      {
        path: '/kitchens',
        element: <Kitchens />
      },
      {
        path: '/categories',
        element: <Categories />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/devices',
        element: <Devices />
      },
      {
        path: '/',
        element: <Orders />
      }
    ]
  },
  {
    element: <Kitchen />,
    errorElement: <Error />,
    path: '/kitchen/:id'
  },
  {
    element: <Waiter />,
    errorElement: <Error />,
    path: '/waiter'
  },
  {
    element: <CheckOut />,
    errorElement: <Error />,
    path: '/checkout'
  }
])

const Router = () => {
  return <RouterProvider router={appRouter} />
}

export default Router;