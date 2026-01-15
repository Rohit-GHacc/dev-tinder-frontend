import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);


  const fetchConnectionRequests = async () => {
    const response = await axios.get(`${BASE_URL}/user/requests/received`, {
      withCredentials: true,
    });
    console.log(response.data.data);
    dispatch(addRequests(response.data.data));
  };
  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  const reviewRequest = async (status, id)=>{
    try{
    const response = await axios.post(`${BASE_URL}/request/review/${status}/${id}`,{},{withCredentials: true})
    dispatch(removeRequest(id))
    } catch(err){
        console.log(err)
    }
  }
  if(!requests || requests.length === 0) return ( <div className = 'text-center m-5 font-bold text-3xl'> No requests found ! </div> )
  return (
  <div className="flex flex-col items-center px-4">
    <h1 className="font-bold text-3xl my-6">Connection Requests</h1>

    {requests.map((request) => {
      const { _id, firstName, lastName, about, age, gender, photoURL } =
        request.fromUserId;

      return (
        <div
          key={_id}
          className="flex items-center justify-between bg-base-300 w-full max-w-2xl m-2 p-4 rounded-2xl shadow-sm"
        >
          {/* Left: Profile */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white overflow-hidden flex-shrink-0">
              <img
                src={photoURL}
                alt={firstName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-lg">
                {firstName} {lastName}
              </span>
              {age && gender && (
                <span className="text-sm opacity-70">
                  {age} • {gender}
                </span>
              )}
              {about && (
                <span className="text-sm opacity-80 line-clamp-2">
                  {about}
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex gap-3">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={() => reviewRequest("rejected", request._id)}
            >
              Reject
            </button>
          </div>
        </div>
      );
    })}
  </div>
);

};

export default Requests;
