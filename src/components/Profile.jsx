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
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}

      <div className="flex flex-1 items-start justify-center gap-10 p-10">
        {/* Form Card */}
        <div className="card bg-base-300 text-neutral-content w-[420px] shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-3xl justify-center mb-4">
              Update Profile
            </h2>

            {[
              ["First Name", firstName, setFirstName, "text"],
              ["Last Name", lastName, setLastName, "text"],
              ["Age", age, setAge, "number"],
            ].map(([label, value, setter, type]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4"
              >
                <label className="w-28">{label}</label>
                <input
                  type={type}
                  className="input input-bordered w-full"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                />
              </div>
            ))}

            <div className="flex items-center justify-between gap-4">
              <label className="w-28">Gender</label>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            {[
              ["About", about, setAbout],
              ["Photo URL", photoURL, setPhotoURL],
              ["Skills", skills, setSkills],
            ].map(([label, value, setter]) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4"
              >
                <label className="w-28 pt-2">{label}</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                />
              </div>
            ))}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary w-full"
                onClick={updateProfile}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <UserCard
          user={{ firstName, lastName, gender, age, photoURL, about, skills }}
        />
      </div>
    </>
  );
};

export default Profile;
