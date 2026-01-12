import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const getConnections = async () => {
    const response = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    // console.log(response)
    setConnections(response.data.data);
  };
  useEffect(() => {
    getConnections();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl m-4"> Connections</h1>
        {connections.map((c) => {
          return (
            <div
              key={c._id}
              className="flex bg-base-300 w-1/2 m-2 py-4 px-5 rounded-xl"
            >
              <div className="w-20 m-2 rounded-full bg-white overflow-hidden">
                <img src={c.photoURL} alt={c.firstName} />
              </div>
              <div className="flex flex-col my-2 mx-3">
                <span className="font-bold text-xl">
                  {c.firstName + " " + c.lastName}
                </span>
                {c.age && c.gender && (
                  <span>{c.age + " - " + c.gender.toUpperCase()}</span>
                )}
                {c.about && <span>{c.about}</span>}
              </div>
            </div>
          );
        })}
        {/* </div> */}
      </div>
    </>
  );
};

export default Connections;
