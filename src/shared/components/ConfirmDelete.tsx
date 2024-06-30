import { useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";

interface props {
  deleteAction: () => Promise<void> | void;
  cancelAction: () => void;
}

const ModalContent = styled.div`
  margin-inline: auto;
  align-self: center;
  width: 25em;
  height: 13em;
  background-color: #262627;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  justify-content: center;
  gap: 2em;
  border-radius: 10px;
  .actions {
    display: flex;
    gap: 1em;
  }

  p {
    font-size: 1.2em;
  }
`;

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
