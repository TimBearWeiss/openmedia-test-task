import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchWindow } from "../../services/actions/form";
import { setUrl } from "../../services/actions/form";
import style from "./Player.module.css";

const Player = () => {
  const dispatch = useDispatch();
  const url = useSelector((store) => store.form.url);

  // состояние плеера
  const [audio, setAudio] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  const [volumeSlider, setVolumeSlider] = useState("");
  const [progressBar, setProgressBar] = useState("");
  const [value, setValue] = useState("00:00");
  const [colorProgress, setColorProgress] = useState("");
  const [isDoneload, setIsDoneload] = useState(true);

  const logOut = () => {
    dispatch(switchWindow(false));
    dispatch(setUrl(""));
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

    audio.onabort = () => {
      setIsDoneload(false);
    };
  }

  return (
    <div className={style.audioBlock}>
      <h2 className={style.back} onClick={logOut}>
        ← Back
      </h2>
      <div className={style.controller}>
        {isDoneload && <div className={style.loader}></div>}
        {isPlay ? (
          <button className={style.pause} onClick={() => pause()}></button>
        ) : (
          <button className={style.play} onClick={() => play()}></button>
        )}
        <input
          className={style.progressBar}
          ref={(el) => {
            setProgressBar(el);
          }}
          defaultValue="0"
          type="range"
          min="0"
          max="100"
        ></input>
        <div className={style.audioBottom}>
          <p className={style.paybackTime}>{value}</p>
          <div className={style.volumeBox}>
            <input
              className={style.volumeSlider}
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
              className={style.colorProgress}
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
  );
};

export default Player;
