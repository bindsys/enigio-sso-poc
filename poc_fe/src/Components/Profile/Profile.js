import React from "react";
import basestyle from "../Base.module.css";
const Profile = ({ username, logoutUrl }) => {
  const logout = () => {
      window.location.replace(logoutUrl);
  }

  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Logged in as {username}</h1>
      <button
        className={basestyle.button_common}
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};
export default Profile;
