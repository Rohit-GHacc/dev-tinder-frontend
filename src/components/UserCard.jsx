import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  const handleStatus = async(status, userId)=>{
    try{
      const response = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{},{withCredentials: true})
      console.log(response);
      dispatch(removeUserFromFeed(userId))
    }catch(err){
      console.log(err.message)
    }
  }
  return (
  <div className="flex justify-center py-10">
    <div className="card bg-base-300 w-full max-w-sm shadow-md rounded-2xl overflow-hidden">
      
      {/* Image */}
      <figure className="h-64 bg-base-200">
        <img
          src={user?.photoURL}
          alt={user?.firstName}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Body */}
      <div className="card-body">
        <h2 className="card-title text-xl">
          {user?.firstName} {user?.lastName}
        </h2>

        {user?.age && user?.gender && (
          <p className="text-sm opacity-70">
            {user.age} • {user.gender}
          </p>
        )}

        {user?.about && (
          <p className="text-sm opacity-80 line-clamp-3">
            {user.about}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-between mt-4">
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => handleStatus("ignored", user?._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => handleStatus("interested", user?._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default UserCard;
