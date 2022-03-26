import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

//import img1 from "../../images/Signup-image.png";
import { useUserCxt } from "../Assets/user-context";
import useGenerateId from "../../Hooks/generate-id";
import "./Signup.css";


        const intialValues = {
                email: "",
                userName: "",
                mobileNumber: "",
                password: "",
                password1: "",
              };
              
              const Signup = () => {
                const userCxt = useUserCxt();
                const navigate = useNavigate();
                const generateId = useGenerateId();
                const [formValues, setFormValues] = useState(intialValues);
                const [formErrors, setFormErrors] = useState({ intialValues });
                // const [isSubmit, setIsSubmit] = useState(false);
              
                const handleChange = (e) => {
                  const { name, value } = e.target;
                  setFormValues({ ...formValues, [name]: value });
                };
              
                const createUserObj = (value) => {
                  const tempUser = {};
                  tempUser.userId= generateId("U");
                  tempUser.email = value.email;
                  tempUser.userName = value.userName;
                  tempUser.mobileNumber = value.mobileNumber;
                  tempUser.password = value.password;
                  tempUser.active=true;
                  tempUser.role="customer";
                  return tempUser;
                };
              
                const handleSubmit = (e) => {
                  e.preventDefault();
                  const errs = validate(formValues);
                  const errsKey = Object.keys(errs);
                  if (errsKey.length === 0) {
                    userCxt.userDispatchFn({
                      type: "ADD_USER",
                      value: createUserObj(formValues),
                    });
                    navigate("/");
                  } else {
                    setFormErrors(errs);
                  }
                  // setIsSubmit(true);
                };
              
                // useEffect(() => {
                //   console.log(formErrors);
                //   if (Object.keys(formErrors).Length === 0 && isSubmit) {
                //     console.log(formValues);
                //   }
                // }, [formErrors, formValues, isSubmit]);
              


const validate = (values) =>{
        const errors ={};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.email){
                errors.email = "Email is required!";
        }
        else if (!regex.test(values.email)) {
                errors.email = "This is not a valid email format!";
              }
        if(!values.userName){
                errors.userName = "Username is required!";
        }
        if(!values.mobileNumber){
                errors.mobileNumber = "Mobilenumber is required!";
        }
        else if (values.mobileNumber.length < 10) {
                errors.mobileNumber = "Mobilenumber is not Valid !";
              } else if (values.mobileNumber.length > 10) {
                errors.mobileNumber = "Mobilenumber is not Valid !";
              }
        if(!values.password){
                errors.password = "Password is required!";
        }
        else if (values.password.length < 4) {
                errors.password = "Password must be more than 4 characters";
              } else if (values.password.length > 10) {
                errors.password = "Password cannot exceed more than 10 characters";
              }
        if(!values.confirmpassword){
                errors.confirmpassword= "Confirm Password is required!";
        }
        else if(values.confirmpassword != values.password){
                errors.confirmpassword= "Password missmatch!";
        }
        return errors;
};

    return (
    <div class="text-center">
            <form onSubmit = {handleSubmit} className="sign">  
    <div class="bg-primary  navbar-brand w-100 signin"> <span class ="navbar-brand bg-primary align-middle  text-light display2">Register</span></div>
        <br></br>
        <div className="sign1">
        <br></br>
    <div class="form-control form-control-lg sign2">
    <h3>Register</h3>
        {/*<div class="input-group mb-3 ">
                <select name="user" class="form-select" onChange={handleChange} autoFocus>
                        <option selected hidden>Enter admin/user</option>
                        <option value="admin">Admin</option>
                        <option value="User" >User</option>
                </select>
    </div>
        <p class="text-danger text-start fs-6">{formErrors.user}</p>*/}
        <div id="email" class="input-group mb-3" className="field">
                <input type="email" name="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter email" value={formValues.email} onChange={handleChange}/>
        </div>
        <p class="text-danger text-start fs-6">{formErrors.email}</p>
        <div id="username" class="input-group mb-3" className="field">
                <input type="text" name="userName" class="form-control" id="exampleFormControlInput1" placeholder="Enter username" value={formValues.userName} onChange={handleChange}></input>
        </div>
        <p class="text-danger text-start fs-6">{formErrors.userName}</p>
        <div id="mobileNumber" class="input-group mb-3" className="field">
                <input type="number" name="mobileNumber" class="form-control" id="exampleFormControlInput1" placeholder="Enter Mobilenumber" value={formValues.mobileNumber} onChange={handleChange}></input>
        </div>
        <p class="text-danger text-start fs-6">{formErrors.mobileNumber}</p>
        <div id="password" class="input-group mb-3" className="field">
                <input type="password" name="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" value={formValues.password} onChange={handleChange}></input>
        </div>
        <p class="text-danger text-start fs-6">{formErrors.password}</p>
        <div id="confirmPassword" class="input-group mb-3" className="field">
                <input type="password" name="confirmpassword" class="form-control" id="exampleFormControlInput1" placeholder="Confirm Password" value={formValues.confirmpassword} onChange={handleChange}></input>
        </div>
        <p class="text-danger text-start fs-6">{formErrors.confirmpassword}</p>
        <br></br>
        <button class="btn btn-primary text-light" type="submit">Submit</button>
        <br></br>
        <br></br>
        <div class="h6">Already a user?<Link to="/Login" class="nav-link">Login</Link></div>
        </div>
</div>
</form> 
</div>



    );
  }
  
  export default Signup;
  
