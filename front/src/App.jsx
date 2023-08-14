import { useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";
import tiktokIcon from "./assets/tiktok-icon.svg";
import { useMutation } from "@tanstack/react-query";
import Video from "./components/Video";
import Gallery from "./components/Gallery";

function App() {
  //url o usuario a buscar
  const [searchValue, setSearchValue] = useState("");
  //info de steam que llega del backend
  const [tiktokInfo, setTiktokInfo] = useState({});
  const { userData, gallery, type, videoData } = tiktokInfo;
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  //si se apreta enter se hace el fetch
  const handleOnKeyDown = async (e) => {
    if (e.key === "Enter") {
      mutate();
    } else {
      return;
    }
  };

  //fetch a la api
  const { mutate, isLoading, isIdle, error, data } = useMutation(
    ["discord", searchValue],
    async () => {
      const { data } = await axios.post(
        `http://localhost:3000/tiktok`,
        { url: searchValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        setTiktokInfo(data);
      },
    }
  );

  return (
    <div
      //Si isIdle o isLoading es true se muestra el div de busqueda sino se muestra el perfil
      className={`${
        isIdle || isLoading
          ? "flex flex-col max-h-[190px]  rounded-xl  bg-white text-black"
          : ` rounded-xl text-black bg-white ${
              tiktokInfo?.type === "video"
                ? "h-[790px] px-0 py-2 w-[340px]"
                : gallery?.videos?.length > 0
                ? "h-[490px]"
                : "h-[290px]"
            } 	}`
      } mx-auto my-12 p-4 max-w-[390px]   shadow-2xl rounded-3x `}
      // Set inline style for the background color based on userData?.color
    >
      {isLoading ? (
        <p className="text-black text-center">Loading...</p>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={tiktokIcon} alt="" className="h-12 mb-1" />
          <p className="text-2xl text-center">
            URL de usuario o video incorrecto.
          </p>
        </div>
      ) : data ? (
        type === "user" ? (
          <>
            <UserProfile userData={userData} />
            <Gallery gallery={gallery} />
          </>
        ) : (
          <>
            <Video videoData={videoData} />
          </>
        )
      ) : (
        <Search
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
          handleOnKeyDown={handleOnKeyDown}
        />
      )}
    </div>
  );
}

export default App;
