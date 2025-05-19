import React, { useContext, useState  } from "react";
import "./LoginPopup.css";

import axios from "axios"

import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {

  const {url , setToken} = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler =(event) => {
    const name = event.target.name ;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}))
    

  }

  const onLogin =  async (event) => {
    event.preventDefault();
    let newUrl = url;
    if(currState ==="Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data);
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)

    }else{
      alert(response.data.message)
    }



  }

  
  
  return (
    <div className="login-popup">
      <form className="login-popup-container"  onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" name="name"  onChange={onChangeHandler}  value={data.name}   required />
          )}

          <input type="email" placeholder="Your Email" name="email" onChange={onChangeHandler}  value={data.email}   required />
          <input type="password" placeholder="Your Password"  name="password" onChange={onChangeHandler}  value={data.password}   required />
        </div>




        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing I agree to the terms of use & privacy policy . </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account ? <span onClick={() => setCurrState("Sign Up")}>Click Here</span>{" "}
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState("Login")}> Login here </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
