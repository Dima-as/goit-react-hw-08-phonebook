import React from "react";
import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.scss";

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? s.active : s.link)}
      >
        Registration
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? s.active : s.link)}
      >
        Login
      </NavLink>
    </div>
  );
}
