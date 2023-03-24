import ReactDOM from "react-dom";
import style from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { switchModal } from "../../services/actions/form";

const modalRootElement = document.getElementById("modal");

const Modal = () => {
  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div className={style.warningIcon}></div>
      <div className={style.textCell}>
        <p className={style.caption}>Warning</p>
        <p className={style.decription}>Unsuitable link, choose another one</p>
      </div>
      <button
        onClick={() => dispatch(switchModal(false))}
        type="button"
        className={style.closeIcon}
      ></button>
    </div>,
    modalRootElement
  );
};

export default Modal;
