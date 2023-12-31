import views from "../assets/views.svg";
const Gallery = ({ gallery }) => {
  const { videos, profileUrl } = gallery;
  return (
    <div className="flex flex-col">
      <p className="text-lg mb-1">Videos:</p>
      <div className="flex flex-row flex-wrap gap-2 justify-center">
        {videos.length > 0 ? (
          videos?.map((video) => (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[31%]"
              key={video.thumbnail}
            >
              <img
                src={video.thumbnail}
                alt="Thumbnail"
                className="h-[200px] w-[250px]"
              />
              <p className="text-sm truncate">{video.description}</p>
              <div className="flex flex-row items-center gap-1">
                <svg
                  fill="#000000"
                  height="14px"
                  width="14px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 58.752 58.752"
                >
                  <g>
                    <path
                      d="M52.524,23.925L12.507,0.824c-1.907-1.1-4.376-1.097-6.276,0C4.293,1.94,3.088,4.025,3.088,6.264v46.205
		c0,2.24,1.204,4.325,3.131,5.435c0.953,0.555,2.042,0.848,3.149,0.848c1.104,0,2.192-0.292,3.141-0.843l40.017-23.103
		c1.936-1.119,3.138-3.203,3.138-5.439C55.663,27.134,54.462,25.05,52.524,23.925z M49.524,29.612L9.504,52.716
		c-0.082,0.047-0.18,0.052-0.279-0.005c-0.084-0.049-0.137-0.142-0.137-0.242V6.263c0-0.1,0.052-0.192,0.14-0.243
		c0.042-0.025,0.09-0.038,0.139-0.038c0.051,0,0.099,0.013,0.142,0.038l40.01,23.098c0.089,0.052,0.145,0.147,0.145,0.249
		C49.663,29.47,49.611,29.561,49.524,29.612z"
                    />
                  </g>
                </svg>
                <p>{video.count}</p>
              </div>
            </a>
          ))
        ) : (
          <p className="text-xl">No hay videos</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
