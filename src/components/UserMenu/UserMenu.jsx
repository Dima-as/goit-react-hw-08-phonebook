import { useSelector } from "react-redux";
import s from "./userMenu.module.scss";

import { getUserName } from "../../redux/auth/auth-selectors";
import { useLogoutUserMutation } from "../../redux/auth/auth-reducer";

export default function UserMenu() {
  const name = useSelector(getUserName);
  const [logoutUser] = useLogoutUserMutation();

  return (
    <div>
      <span>Welcome home, {name}!</span>
      <button className={s.button} type="button" onClick={() => logoutUser()}>
        Log out
      </button>
    </div>
  );
}
