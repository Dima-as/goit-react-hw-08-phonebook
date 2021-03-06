import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { getUserStatus, getToken } from "../../redux/auth/auth-selectors";
import { useFetchCurrentUserQuery } from "../../redux/auth/auth-reducer";
import s from "./AppBar.module.scss";

export default function AppBar() {
  const isLoggedIn = useSelector(getUserStatus);
  const token = useSelector(getToken);
  const { isLoading } = useFetchCurrentUserQuery(token, {
    skip: token === null || isLoggedIn,
  });
  return (
    <>
      {!isLoading && (
        <header className={s.header}>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
      )}
    </>
  );
}
