import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./Profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };
  return (
    <section className={`sectionContent ${classes.profile}`}>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="new-password">{t.new_password}</label>
          <input type="password" id="new-password" />
        </div>
        <div className={classes.action}>
          <button>{t.change_password}</button>
        </div>
      </form>
      <div className={classes.action}>
        <button onClick={logoutHandler}>{t.logout}</button>
      </div>
    </section>
  );
};

export default Profile;
