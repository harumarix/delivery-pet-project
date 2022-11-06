import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./Profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };
  return (
    <section className={`sectionContent ${classes.profile}`}>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
      <div className={classes.action}>
        <button onClick={logoutHandler}>Log out</button>
      </div>
    </section>
  );
};

export default Profile;
