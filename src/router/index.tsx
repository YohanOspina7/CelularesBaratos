import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { ClientLayout } from "../layouts/ClientLayout";
import {
  HomePage,
  CellPhonesPage,
  AboutPage,
  CellPhonePage,
  OrdersUserPage,
} from "../pages";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "celulares",
        element: <CellPhonesPage />,
      },
      {
        path: "celulares/:slug",
        element: <CellPhonePage />,
      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "account",
        element: <ClientLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/account/pedidos" />,
          },
          {
            path: "pedidos",
            element: <OrdersUserPage />,
          },
        ],
      },
    ],
  },
]);
