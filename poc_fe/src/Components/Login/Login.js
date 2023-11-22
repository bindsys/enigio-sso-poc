import React, {useEffect, useState} from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";

const Login = ({ setUserState }) => {
  const baseUrl = process.env.REACT_APP_API_URL;

  const loginSSO = (value) => {
    axios.post(`${baseUrl}/sso`).then((res) => {
      const login_sso = res.data.login;
      window.location.replace(login_sso);
    });
  }

  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <button className={basestyle.button_common} onClick={() => loginSSO()}>
          Initiate SSO
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};
export default Login;
