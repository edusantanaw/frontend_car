import React from "react";
import { ModalContainer } from "../styles/modal";

interface props {
  children: React.ReactNode;
  onClose: () => void;
}


const Modal = ({ children, onClose }: props) => {
  return (
    <ModalContainer>
      {children}
      <div className="close" onClick={onClose} />
    </ModalContainer>
  );
};

export default Modal;
