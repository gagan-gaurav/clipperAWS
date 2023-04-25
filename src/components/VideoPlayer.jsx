import { useRef } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ url, startTime, playing }) {
  const playerRef = useRef(null);
  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={url}
        key={startTime}
        width="900px"
        height="400px"
        playing={playing}
        controls={true}
        onStart={() => {
          if (startTime != 0) {
            playerRef.current.seekTo(startTime);
          }
        }}
        config={{
          youtube: {
            playerVars: {
              start: startTime,
            },
          },
        }}
      />
      ;
    </div>
  );
}

export default VideoPlayer;
