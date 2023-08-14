const Video = ({ videoData }) => {
  return (
    <iframe
      className="w-[340px] h-[790px]"
      sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation"
      srcDoc={videoData?.html}
    />
  );
};
export default Video;
