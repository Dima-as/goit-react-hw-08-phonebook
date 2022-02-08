import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.scss";
import { useSelector } from "react-redux";
import { getUserStatus } from "../../redux/auth/auth-selectors";

const Navigation = () => {
  const isLoggedIn = useSelector(getUserStatus);
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? s.active : s.link)}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={({ isActive }) => (isActive ? s.active : s.link)}
        >
          PhoneBook
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
