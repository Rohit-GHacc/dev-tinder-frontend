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
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-3xl m-4"> Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, about, age, gender, photoURL } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex bg-base-300 w-1/2 m-2 py-4 px-5 rounded-xl"
          >
            <div className="w-20 m-2 rounded-full bg-white overflow-hidden">
              <img src={photoURL} alt={firstName} />
            </div>
            <div className="flex flex-col my-2 mx-3">
              <span className="font-bold text-xl">
                {firstName + " " + lastName}
              </span>
              {age && gender && <span>{age + " - " + gender}</span>}
              {about && <span>{about}</span>}
            </div>
            <div className="card-actions my-4 ml-40 justify-end items-center">
              <button className="btn btn-secondary" onClick = {()=> reviewRequest('accepted',request._id)}> Accept</button>
              <button className="btn btn-primary" onClick = {()=> reviewRequest('rejected',request._id)}> Reject </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
