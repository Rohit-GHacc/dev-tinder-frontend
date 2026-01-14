import UserCard from './UserCard'
import {useEffect} from "react";
import { BASE_URL } from "../utils/constants";
import axios from 'axios'
import { addFeed } from "../store/feedSlice";
import { useDispatch, useSelector } from "react-redux";


const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector(store => store.feed)
  console.log(feed)
  const getFeed = async()=>{
    try{
        const response = await axios.get(BASE_URL + '/user/feed',{withCredentials: true})
        const feed = response.data.data
        console.log(feed)
        dispatch(addFeed(feed))
    }
    catch(err){
        console.log(err.message)
    }
  }
  useEffect(()=>{
    getFeed()
  },[])
  if(!feed) return;
  if(feed.length === 0) return ( <div className = 'flex justify-center fond-bold text-3xl m-5'> No new users found.</div>)
  return (
    <div>
      <UserCard user = {feed[0]} />
    </div>
  )
}

export default Feed
