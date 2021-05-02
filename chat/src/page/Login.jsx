import React, { useState } from "react";
import "./Login.sass";
import config from "../config";

import MyButton from "../utils/MyButton";
import MyTextField from "../utils/MyTextField";
import myFetch from "../utils/myFetch";

function Login(props) {
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const [login, setLogin] = useState('admin');
  const [password, setPassword] = useState('admin');

  const loginFetch = ()=> {
    myFetch(config.login, 'POST', {login: login, pass: password })
    .then((res) => {
      if(res?._id) {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        window.location.pathname = '/chats';
      } else {
        console.log(res);
        setIsErrorLogin(true);
        setIsErrorPassword(true);
      }
    });
  }

  return (
    <div className="login">
      <div className="login-content">
        <div className="login-content-form">
          <div className="login-content-form-block">
            <MyTextField label="Login" change={(e)=> {setLogin(e.target.value); setIsErrorLogin(false); setIsErrorPassword(false)}} 
            value={login} isError={isErrorLogin} errorText="Пожалуйста, введите корректный Login"/>
            <MyTextField label="Password" change={(e)=> {setPassword(e.target.value); setIsErrorPassword(false); setIsErrorLogin(false)}} 
            value={password} isError={isErrorPassword} errorText="Пожалуйста, введите корректный Password"/>
          </div>

          <div className="login-content-form-footer">
            <MyButton click={() => {
                loginFetch();
              }}>Ok</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
