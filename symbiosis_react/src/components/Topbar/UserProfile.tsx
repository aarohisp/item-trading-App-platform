import { useState } from "react";
import { Avatar, Popover, message } from "antd";
import { useHistory } from "react-router";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  // CONSTANTS
  const history = useHistory();

  /* empty object {} is refered as Record<string, never> */
  const user: Record<string, never> = JSON.parse(localStorage.getItem("user") || "{}");

  // STATE
  const [open, setOpen] = useState<boolean>(false);

  // HANDLERS

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleLogOut = () => {
    /* 
    - destroy any active messages.
    - on logout clear any stored items in localstorage and redirect the user to sign in page.
    */
    message.destroy();
    localStorage.clear();
    message.info("Log out Successful!");
    history.push("/");
  };

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Update Password</li>
      <li onClick={handleLogOut}>Logout</li>
    </ul>
  );

  return (
    <div className={`gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row ${styles["cursor"]}`}>
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click" open={open} onOpenChange={handleOpenChange}>
        <Avatar src={"https://via.placeholder.com/150"} className="gx-size-40 gx-pointer gx-mr-3" alt="" />
        <span className={`gx-avatar-name ${styles["username"]}`}>
          {user?.username}
          <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
        </span>
      </Popover>
    </div>
  );
};

export default UserProfile;
