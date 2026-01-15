import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      if (isLoginForm) {
        const data = await axios.post(
          BASE_URL + "/login",
          { email, password },
          { withCredentials: true }
        );
        // console.log(data);
        dispatch(addUser(data.data));
        navigate("/");
      }else{
        const data = await axios.post(`${BASE_URL}/createUser`,{email, password, firstName, lastName},{withCredentials: true})
        console.log(data);
        dispatch(addUser(data.data))
        navigate('/profile')
      }
    } catch (err) {
      setError(err.response.data || "Something went wrong");
      // console.log(err.response.data || err.message);
    }
  };

  return (
    // flex-1 property takes all remaining space available
    <div className="flex flex-1 items-center justify-center ">
      <div className="card bg-base-300 text-neutral-content w-96 pb-4">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-4xl m-4">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div className="flex flex-col justify-between">
            {!isLoginForm && (
              <>
                <div className="flex gap-4 justify-between m-2">
                  <label htmlFor="firstName" className="p-2">
                    {" "}
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="border border-white p-2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex gap-4 justify-between  m-2">
                  <label htmlFor="lastName" className="p-2">
                    {" "}
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="border border-white p-2"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="flex gap-4 justify-between m-2">
              <label htmlFor="email" className="p-2">
                {" "}
                Email ID
              </label>
              <input
                type="email"
                id="email"
                className="border border-white p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-4 justify-between m-2">
              <label htmlFor="password" className="p-2">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="password"
                className="border border-white p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <p className="text-red-500"> {error}</p>
          <div className="card-actions justify-end m-2">
            <button className="btn btn-primary" onClick={handleSignIn}>
              {isLoginForm ? "Sign in" : "Sign up"}
            </button>
          </div>
          <p
            className="cursor-pointer "
            onClick={() => setIsLoginForm((prev) => !prev)}
          >
            {" "}
            {isLoginForm
              ? "New User? Sign up"
              : "Already registered? Sign In"}{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
