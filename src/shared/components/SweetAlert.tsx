import { BiError } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { SweetStyle } from "../styles/sweetAlert";
import { Button } from "./Button";
import Modal from "./Modal";

interface props {
  onConfirm: () => void;
  message: string;
  type?: "success" | "failed";
}

const SweetAlert = ({ message, onConfirm, type }: props) => {
  return (
    <Modal onClose={() => null}>
      <SweetStyle color={type === "failed" ? "#e40707" : "#05df4d"}>
        <p>{message}</p>
        {type === "failed" ? (
          <BiError className="icon" />
        ) : (
          <FaCheck className="icon" />
        )}
        <Button autoFocus={true} action={onConfirm} title="Confirmar" />
      </SweetStyle>
    </Modal>
  );
};

export default SweetAlert;
