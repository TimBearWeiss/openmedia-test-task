import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchWindow, switchModal, setUrl } from "../../services/actions/form";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(false);
  const [input, setInput] = useState("");

  const url = useSelector((store) => store.form.url);

  const validationLink = (url) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          if (res.headers.get("Content-type").startsWith("audio")) {
            input.className = style.input;
            dispatch(switchWindow(true));
            setErrorMessage(false);
            dispatch(switchModal(false));
          } else {
            input.className = style.input + " " + style.inputIcon;
            dispatch(switchModal(true));
            return Promise.reject(
              new Error("unsuitable link, choose another one")
            );
          }
        } else {
          input.className = style.input + " " + style.inputIcon;
          dispatch(switchModal(true));
          return Promise.reject(
            new Error("unsuitable link, choose another one")
          );
        }
      })
      .catch(() => {
        input.className = style.input + " " + style.inputIcon;
        dispatch(switchModal(true));
      });
  };

  const ValidationInput = (e) => {
    dispatch(setUrl(e.target.value));
    const re =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (!re.test(String(e.target.value).toLowerCase())) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
  };

  const addSong = (evt) => {
    evt.preventDefault();
    validationLink(url);
  };

  return (
    <form onSubmit={addSong} className={style.form} noValidate>
      <label className={style.caption}>Insert the link</label>
      <div className={style.cell}>
        <input
          ref={(el) => {
            setInput(el);
          }}
          className={style.input}
          onChange={(e) => ValidationInput(e)}
          type="url"
          placeholder="https://"
          required
        />
        <button className={style.button}></button>
      </div>
      {errorMessage && (
        <span className={style.errorMessage}>
          Unsuitable link, choose another one
        </span>
      )}
    </form>
  );
};

export default Form;
