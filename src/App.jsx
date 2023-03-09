import React from "react";
import Report from "./components/report";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error";
import Login from "./components/login";
import Admin from "./components/admin";
import Root from "./components/root";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Fix from "./components/fix";
import Health from "./components/health";
import Fixes from "./components/fixes";
import Auth from "./components/auth";
import Fixed from "./components/fixed";
import Reported from "./components/reported";
import Assigned from "./components/assigned";

const router = createBrowserRouter([
  {
    path: "bug-hunter",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "report",
        element: <Report />,
      },
      {
        path: "fix",
        element: <Fix />,
      },
      {
        path: "fixes",
        element: <Fixes />,
      },
      {
        path: "reported",
        element: <Admin />,
      },
      {
        path: "assigned",
        element: <Assigned />,
      },
      {
        path: "authenticate",
        element: <Auth />,
      },
      {
        path: "profile/bugs",
        element: <Reported />,
      },
      {
        path: "profile/fixes",
        element: <Fixed />,
      },
      {
        path: "health",
        element: <Health />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
