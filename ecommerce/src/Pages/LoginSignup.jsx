import React from "react";
import "./CSS/LoginSignup.css";
import { useState } from "react";
const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
  console.log("login function", formData);
  try {
    const res = await fetch("https://e-commerce-backend-gy0t.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    } else {
      alert(data.errors || "Login failed");
    }
  } catch (error) {
    alert("Server error: " + error.message);
  }
};

  const signup = async () => {
    console.log("signup function", formData);
    let responseData;
    await fetch("https://e-commerce-backend-gy0t.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Login" ? (
            <></>
          ) : (
            <input
              onChange={changeHandler}
              value={formData.username}
              name="username"
              type="text"
              placeholder="username"
            />
          )}
          <input
            onChange={changeHandler}
            value={formData.email}
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            onChange={changeHandler}
            value={formData.password}
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          className="login-btn"
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p>
            {" "}
            Already have account?
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p>
            create an account?
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Sign Up Here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, i agree to the terms of use & privacy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
