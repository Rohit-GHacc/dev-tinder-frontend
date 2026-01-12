
const UserCard = ({user}) => {
  console.log('in UserCard', user)
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
            {user?.age} - {user?.gender.toUpperCase()}
          </p>
          <p>
            {user?.about}
          </p>
          <div className="card-actions justify-around my-4">
            <button className="btn btn-primary"> Ignore</button>
            <button className="btn btn-secondary"> Interested </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
