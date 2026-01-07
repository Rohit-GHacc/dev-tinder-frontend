import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("rohit@gmail.com");
  const [password, setPassword] = useState("Rohit@123");
  const dispatch = useDispatch()
    const navigate = useNavigate()

  const handleSignIn = async () => {
    try {
      const data = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(data);
      dispatch(addUser(data.data))
      navigate('/')
    } catch (err) {
      console.log(err.response.data || err.message);
    }
  };

  return (
    // flex-1 property takes all remaining space available
    <div className="flex flex-1 items-center justify-center ">
      <div className="card bg-base-300 text-neutral-content w-96 pb-4">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-4xl m-4">Login</h2>
          <div className="flex gap-4 justify-between w-[80%] m-2">
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
          <div className="flex gap-4 justify-between w-[80%] m-2">
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
          <div className="card-actions justify-end m-2">
            <button className="btn btn-primary" onClick={handleSignIn}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
