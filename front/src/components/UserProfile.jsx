import tiktokIcon from "../assets/tiktok-icon.svg";
const UserProfile = ({ userData }) => {
  return (
    <div className="mt-3">
      <div
        className={`flex flex-row justify-evenly items-center 
           `}
      >
        <img
          src={userData?.profileImg}
          alt="Avatar"
          className={`h-[90px] w-fit rounded-full mb-1 `}
        />
        <div className="flex items-center ">
          <div className="flex flex-col align-middle">
            <div className=" flex flex-col items-center justify-center mt-1">
              <div className="flex flex-col mb-1">
                <img src={tiktokIcon} alt="TikTok Icon" className="h-6" />
                <p className="ms-1 text-xl font-bold max-w-[150px] truncate">
                  {userData?.username}
                </p>
              </div>
              <p className="ms-1 text-sm text-center max-w-[200px] line-clamp-2">
                {userData?.description || "Este usuario no tiene descripción."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-1">
        <div className="flex flex-row items-center gap-2 ">
          <p className="text-[14px] ">
            <strong>{userData?.followers.toLocaleString()}</strong> Seguidores
          </p>
          <p className="text-[14px] ">
            <strong>{userData.likes}</strong> Me gusta
          </p>
        </div>
        <a
          href={userData?.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full  mt-1"
        >
          <button className="w-full bg-blue-500 font-bold text-white h-[45px] ">
            Ver perfil
          </button>
        </a>
      </div>
    </div>
  );
};
export default UserProfile;
