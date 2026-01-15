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
  <div className="flex flex-1 items-center justify-center px-4">
    <div className="card bg-base-300 w-full max-w-sm shadow-xl">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLoginForm ? "Welcome Back" : "Create Account"}
        </h2>

        {!isLoginForm && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm">First Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Last Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 mt-2">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-error text-sm mt-2">{error}</p>}

        <button
          className="btn btn-secondary btn-sm mt-6 w-full"
          onClick={handleSignIn}
        >
          {isLoginForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="text-center text-sm mt-4 cursor-pointer opacity-80 hover:opacity-100"
          onClick={() => {
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setIsLoginForm((prev) => !prev);
          }}
        >
          {isLoginForm
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </p>
      </div>
    </div>
  </div>
);

};

export default Login;
