import { useState } from "react";
import "./App.css";

function App() {
  // общее состояние
  const [url, setUrl] = useState("");
  const [isPost, setIsPost] = useState(false);
  // состояние плеера
  const [audio, setAudio] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  const [volumeSlider, setVolumeSlider] = useState("");
  const [progressBar, setProgressBar] = useState("");
  const [value, setValue] = useState("00:00");
  const [colorProgress, setColorProgress] = useState("");
  const [isDoneload, setIsDoneload] = useState(true);
  // состояние формы

  const [errorMessage, setErrorMessage] = useState(false);
  const [input, setInput] = useState("");

  const validationLink = (url) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          if (res.headers.get("Content-type").startsWith("audio")) {
            input.className = "input";
            setIsPost(true);
            setErrorMessage(false);
          } else {
            input.className = "input input-icon";
            setErrorMessage(true);
            return Promise.reject(
              new Error("unsuitable link, choose another one")
            );
          }
        } else {
          input.className = "input input-icon";
          setErrorMessage(true);
          return Promise.reject(
            new Error("unsuitable link, choose another one")
          );
        }
      })
      .catch(() => {
        input.className = "input input-icon";
        setErrorMessage(true);
      });
  };

  const addSong = (evt) => {
    evt.preventDefault();
    validationLink(url);
  };

  const logOut = () => {
    setIsPost(false);
    setUrl("");
    setValue("00:00");
    setIsPlay(false);
  };

  const play = () => {
    audio.play();
    setIsPlay(true);
  };

  const pause = () => {
    audio.pause();
    setIsPlay(false);
  };

  if (audio) {
    // узнаю время воспроизведения
    audio.ontimeupdate = function () {
      songTimeUpdate();
    };

    const songTimeUpdate = () => {
      if (audio.duration) {
        let curMins = Math.floor(audio.currentTime / 60);
        let curSecs = Math.floor(audio.currentTime - curMins * 60);

        if (curMins < 10) {
          curMins = "0" + curMins;
        }
        if (curSecs < 10) {
          curSecs = "0" + curSecs;
        }

        setValue(curMins + ":" + curSecs);
      } else {
        setValue("00:00");
      }
    };
  }

  if (audio) {
    // регулировка звука
    volumeSlider.addEventListener("mousemove", setvolume);
    function setvolume() {
      audio.volume = volumeSlider.value / 100;
      colorProgress.style.width = volumeSlider.value + "%";
    }
  }

  if (audio) {
    // progressBar
    let mouseDownOnSlider = false;

    audio.addEventListener("loadeddata", () => {
      progressBar.value = 0;
    });
    audio.addEventListener("timeupdate", () => {
      if (!mouseDownOnSlider) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
      }
    });

    progressBar.addEventListener("change", () => {
      const pct = progressBar.value / 100;
      audio.currentTime = (audio.duration || 0) * pct;
    });
    progressBar.addEventListener("mousedown", () => {
      mouseDownOnSlider = true;
    });
    progressBar.addEventListener("mouseup", () => {
      mouseDownOnSlider = false;
    });
  }

  if (audio) {
    // лоадер аудио трека
    audio.oncanplay = () => {
      setIsDoneload(false);
    };
  }

  //// данные

  const test =
    "https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals";

  const test2 = "https://c5.radioboss.fm:18084/stream";

  return (
    <div className="App">
      <h1 className="title">Play any audio sources directly in the browser!</h1>
      {isPost ? (
        <div className="audio-block">
          <h2 className="back" onClick={logOut}>
            ← Back
          </h2>
          <div className="controller">
            {isDoneload && <div className="loader"></div>}
            {isPlay ? (
              <button className="pause" onClick={() => pause()}></button>
            ) : (
              <button className="play" onClick={() => play()}></button>
            )}
            <input
              className="progress-bar"
              ref={(el) => {
                setProgressBar(el);
              }}
              defaultValue="0"
              type="range"
              min="0"
              max="100"
            ></input>
            <div className="audio-bottom">
              <p className="payback-time">{value}</p>
              <div className="volume-box">
                <input
                  className="volume-slider"
                  ref={(el) => {
                    setVolumeSlider(el);
                  }}
                  defaultValue="40"
                  type="range"
                  min="0"
                  max="100"
                ></input>
                <div
                  ref={(el) => {
                    setColorProgress(el);
                  }}
                  className="colorProgress"
                ></div>
              </div>
            </div>
          </div>

          <audio
            ref={(el) => {
              setAudio(el);
            }}
          >
            <source src={url} type="audio/mpeg"></source>
          </audio>
        </div>
      ) : (
        <form onSubmit={addSong} className="form">
          <label className="caption">Insert the link</label>
          <div className="cell">
            <input
              ref={(el) => {
                setInput(el);
              }}
              className="input"
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              placeholder="https://"
              required
            />
            <button className="button"></button>
          </div>
          {errorMessage && (
            <span className="error-message">
              Unsuitable link, choose another one
            </span>
          )}
        </form>
      )}
      <p className="text">Without any restrictions for free</p>
      <p className="rules-text">
        By uploading the audio file, you agree to our
        <a href="#" className="span">
          Terms of Service.
        </a>
      </p>
    </div>
  );
}

export default App;
