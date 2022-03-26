import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useRef } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

//import img1 from "../../images/Signup-image.png";
import { useUserCxt } from "../Assets/user-context";
import { useAuthCxt } from "../Assets/auth-context";

const Login = (props) => {
    const [isError, setisError] = useState(false);
    const Userid = useRef();
    const Password = useRef();
    const userCxt = useUserCxt();
    const authCxt = useAuthCxt();
    const navigate = useNavigate();
  
    const TouchEvent = (event) => {
      event.preventDefault();
      setisError(false);
      const userid = Userid.current.value;
      const password = Password.current.value;
      if (!(userid && password)) {
        setisError(true);
        return;
      } else {
        const tempUser = {
          ...userCxt.usersList.find((user) => {
            return userid === user.email;
          }),
        };
        if (password === tempUser.password) {
          authCxt.loginHandler(tempUser.userId, tempUser.role);
          if (tempUser.role === "admin") {
            navigate("/Admingifts");
          } else {
            navigate("/Homepage");
          }
        } else {
          alert("Username or password is wrong");
        }
      }
    };

    return(
<form class="text-center bg-0 h1 ml-50 login" onSubmit={TouchEvent}>
      <div class="bg-primary log"> <span class ="navbar-brand bg-primary align-middle  text-light display4">Login</span></div>
      <br></br>
      <div className="login1">
        <div className="login2">
          <h3>Login</h3>
      <div class="input-group mb-3" id="email">
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter email" ref={Userid} autoFocus required></input>
</div>
<div  class="input-group mb-3" id="password">
  <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" ref={Password}></input>
  </div>
  <br></br>
  {isError && (
                <div className="alert alert-danger alert-dismissible fade show m-3 h6">
                  <strong>Error!</strong> Please fill all the input feilds
                </div>
              )}
<div  class="input-group mb-3" className="text-light"><button type="submit" class="btn btn-primary" id="loginButton">Login</button></div>
<br></br>
<div class="h6">New User/admin?<Link to="/Signup" class="nav-link">Signup</Link></div>
      </div>
      </div>
</form>
    );
};

export default Login;