import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onRemoveModal}></div>;
};

const ModalContent = (props) => {
  return (
    <div className="modal" id="modal">
      <div className="modal_content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onRemoveModal={props.onRemoveModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalContent>{props.children}</ModalContent>,
        portalElement
      )}
      <Backdrop />
    </>
  );
};
export default Modal;
