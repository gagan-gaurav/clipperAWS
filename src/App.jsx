import { Fragment, useState } from "react";
import InputField from "./components/InputField";
import VideoField from "./components/VideoField";
import VideoPlayer from "./components/VideoPlayer";
import PlayClipButton from "./components/PlayClipButton";
import HashLoader from "react-spinners/HashLoader";
import "./App.css";

function App() {
  const timeStamps = [{ start: 50 }, { start: 100 }, { start: 150 }];

  const [videoStartValue, setvideoStartValue] = useState(0);
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [showError, setshowError] = useState(false);
  const [playing, setplaying] = useState(false);
  const [selectedButton, setSelectedButton] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlayclip = (value, index) => {
    setvideoStartValue(parseInt(value));
    setSelectedButton(index);
    setplaying(true);
  };
  const handleUrlSubmit = (value) => {
    setUrl(value);
  };

  const handlePromptSubmit = (value) => {
    setPrompt(value);
  };
  const handleVideoSubmit = (value) => {
    setUrl(value);
  };
  const handleDoneClick = () => {
    if (!url || !prompt) {
      setshowError(true);
      return;
    }
    setshowError(false);
    setShowPlayer(true);
  };

  const renderedButtons = timeStamps.map((timeStamp, i) => {
    return (
      <PlayClipButton
        key={timeStamp.start}
        startTime={timeStamp.start}
        index={i + 1}
        selected={selectedButton === i + 1}
        handleButtonClick={handlePlayclip}
      />
    );
  });

  return (
    <Fragment>
      <div className="heading">
        <h1>VideoStampify</h1>
      </div>
      <div className="container">
        <InputField
          label={"Enter Video URL"}
          handleUrlSubmit={handleUrlSubmit}
        />
        <VideoField onSubmit={handleVideoSubmit} />
        <InputField
          label={"Your prompt goes here"}
          handlePromptSubmit={handlePromptSubmit}
        />
        <div>
          <button
            onClick={handleDoneClick}
            style={{
              backgroundColor: showError ? "red" : "",
            }}
          >
            Done
          </button>
          {showError && (
            <div className="error">Please provide a video and a prompt!</div>
          )}
        </div>
      </div>
      {loading ? (
        <div className="loader">
          <HashLoader size={80} color="#2196f3" />
          <div>Processing...</div>
        </div>
      ) : (
        <div className="player">
          <VideoPlayer
            url={showPlayer && url}
            startTime={videoStartValue}
            playing={playing}
          />
          <div>{renderedButtons}</div>
        </div>
      )}
    </Fragment>
  );
}

export default App;
