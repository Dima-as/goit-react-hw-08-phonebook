import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import { Suspense, lazy } from "react";
import AppBar from "./components/AppBar/AppBar";
import s from "./App.module.scss";

import { getUserStatus } from "./redux/auth/auth-selectors";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = lazy(() =>
  import("./page/HomePage" /* webpackChunkName: "home" */)
);
const RegisterPage = lazy(() =>
  import("./page/RegisterPage" /* webpackChunkName: "register" */)
);
const LoginPage = lazy(() =>
  import("./page/LoginPage" /* webpackChunkName: "login" */)
);
const ContactsPage = lazy(() =>
  import("./page/ContactPage" /* webpackChunkName: "contacts" */)
);

export default function App() {
  const isLoggedIn = useSelector(getUserStatus);

  return (
    <>
      <AppBar />

      <Suspense
        fallback={
          <>
            <p>Loading...</p>
          </>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute redirectTo="/contacts" restricted>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute redirectTo="/contacts" restricted>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={isLoggedIn ? <ContactsPage /> : <HomePage />}
          />
        </Routes>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </>
  );
}
