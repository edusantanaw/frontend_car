import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { Button } from "./Button";
import Modal from "./Modal";

interface props {
  onConfirm: () => void;
  message: string;
}

const SweetStyle = styled.div`
  margin-inline: auto;
  align-self: center;
  width: 20em;
  height: 22em;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  justify-content: center;
  gap: 2em;
  border-radius: 10px;
  #icon {
    font-size: 7em;
    color: #05df4d;
    padding: 0.2em;
    border-radius: 50%;
    border: 2px solid #05df4d;
  }
  p {
    font-size: 1.1em;
  }
`;

const SweetAlert = ({ message, onConfirm }: props) => {
  return (
    <Modal onClose={() => null}>
      <SweetStyle>
        <p>{message}</p>
        <FaCheck id="icon" />
        <Button action={onConfirm} title="Confirmar" />
      </SweetStyle>
    </Modal>
  );
};

export default SweetAlert;
