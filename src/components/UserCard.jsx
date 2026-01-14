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
    <div className="flex justify-center m-20">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <figure>
          <img
            className = 'max-w-75'
            src={user?.photoURL}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user?.firstName + ' ' + user?.lastName}</h2>
          <p>
            {user?.age} - {user?.gender}
          </p>
          <p>
            {user?.about}
          </p>
          <div className="card-actions justify-around my-4">
            <button className="btn btn-primary" onClick={()=>handleStatus("ignored",user?._id)}> Ignore</button>
            <button className="btn btn-secondary" onClick = {()=>handleStatus("interested", user?._id)}> Interested </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
