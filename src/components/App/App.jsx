import "./App.css";
import { useSelector } from "react-redux";
import Form from "../Form/Form";
import Player from "../Player/Player";
import Modal from "../Modal/Modal";

function App() {
  const isPost = useSelector((store) => store.form.isPost);
  const IsOpened = useSelector((store) => store.form.isModalOpen);

  //// данные

  const test =
    "https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals";

  const test2 = "https://c5.radioboss.fm:18084/stream";

  return (
    <>
      {IsOpened && <Modal />}
      <div className="App">
        <h1 className="title">
          Play any audio sources directly in the browser!
        </h1>
        {isPost ? <Player /> : <Form />}
        <p className="text">Without any restrictions for free</p>
        <p className="rules-text">
          By uploading the audio file, you agree to our
          <a href="#" className="span">
            Terms of Service.
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
