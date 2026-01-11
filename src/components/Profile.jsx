import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const [about, setAbout] = useState(user?.about);
  const [skills, setSkills] = useState(user?.skills);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  // console.log('in profile' , user)
  const updateProfile = async () => {
    setError("");
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, age, about, skills, photoURL, about },
        { withCredentials: true }
      );
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      // console.log("in profile", response);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    // flex-1 property takes all remaining space available
    <>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
      <div className="flex flex-1 items-center justify-center ">
        <div className="card bg-base-300 text-neutral-content w-96 pb-4">
          <div className="card-body w-full">
            <h2 className="card-title text-4xl m-4 justify-center ">
              {" "}
              Update Profile
            </h2>
            <div className="flex  justify-between m-2">
              <label htmlFor="firstName" className="p-2">
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
            <div className="flex  justify-between m-2">
              <label htmlFor="lastName" className="p-2">
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
            <div className="flex  justify-between m-2">
              <label htmlFor="age" className="p-2">
                Age
              </label>
              <input
                type="text"
                id="age"
                className="border border-white p-2"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="flex  justify-between m-2">
              <label htmlFor="gender" className="p-2">
                Gender
              </label>
              <select
                className="w-[55%] border border-white cursor-pointer"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="flex  justify-between m-2">
              <label htmlFor="about" className="p-2">
                About
              </label>
              <textarea
                id="about"
                className="border border-white p-2"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="flex justify-between m-2">
              <label htmlFor="photoURL" className="p-2">
                Photo URL
              </label>
              <textarea
                id="photoURL"
                className="border border-white p-2"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>
            <div className="flex justify-between m-2">
              <label htmlFor="skills" className="p-2">
                Skills
              </label>
              <textarea
                id="skills"
                className="border border-white p-2"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <p className="text-red-500"> {error}</p>
            <div className="card-actions justify-center m-2">
              <button className="btn btn-primary" onClick={updateProfile}>
                Update
              </button>
            </div>
          </div>
        </div>
        <UserCard user = {{firstName, lastName, gender, age, photoURL, about, skills}}/>
      </div>
    </>
  );
};

export default Profile;
