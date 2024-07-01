import { useState } from "react";
import { ModalContent } from "../styles/confirmModal";
import { Button } from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";

interface props {
  deleteAction: () => Promise<void> | void;
  cancelAction: () => void;
}

const ConfirmDelete = ({ deleteAction, cancelAction }: props) => {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleAction() {
    setLoading(() => true);
    await deleteAction();
    setLoading(() => false);
  }

  return (
    <Modal onClose={cancelAction}>
      <ModalContent>
        <p>Realmente deseja remover este item?</p>
        {!loading ? (
          <div className="actions">
            <Button background="#df0505" title="Sim" action={handleAction} />
            <Button background="#132ec7" title="Não" action={cancelAction} />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDelete;
