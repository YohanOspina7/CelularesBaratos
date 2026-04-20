import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, AboutPage, CellPhonesPage, CellPhonePage } from "../pages";

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
        children: [
          {
            index: true,                    // ← /celulares
            element: <CellPhonesPage />,
          },
          {
            path: ":slug",                  // ← /celulares/realme-c55
            element: <CellPhonePage />,
          },
        ],
      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
      {
        path: "*",                          // ← Ruta 404
        element: <div className="p-10 text-center text-2xl">Página no encontrada (404)</div>,
      },
    ],
  },
]);
