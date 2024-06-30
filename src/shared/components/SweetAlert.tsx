import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import { Button } from "./Button";
import Modal from "./Modal";
import { BiError } from "react-icons/bi";

interface props {
  onConfirm: () => void;
  message: string;
  type?: "success" | "failed";
}

const SweetStyle = styled.div<{ color: string }>`
  margin-inline: auto;
  align-self: center;
  width: 20em;
  height: 22em;
  background-color: #262627;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  justify-content: center;
  gap: 2em;
  z-index: 200;
  border-radius: 10px;
  .icon {
    font-size: 7em;
    color: ${(p) => p.color};
    padding: 0.2em;
    border-radius: 50%;
    border: 2px solid ${(p) => p.color};
  }
  p {
    font-size: 1.1em;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const SweetAlert = ({ message, onConfirm, type }: props) => {
  return (
    <Modal onClose={() => null}>
      <SweetStyle color={type === "failed" ? "#e40707" : "#05df4d"}>
        <p>{message}</p>
        {type === "failed" ? <BiError className="icon"/> : <FaCheck className="icon" />}
        <Button autoFocus={true} action={onConfirm} title="Confirmar" />
      </SweetStyle>
    </Modal>
  );
};

export default SweetAlert;
