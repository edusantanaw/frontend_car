import { useRef, useState } from "react";
import { Button } from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import styled from "styled-components";
import { Input } from "../../../shared/components/Input";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import SweetAlert from "../../../shared/components/SweetAlert";

interface props {
  handleClose: () => void;
  action: (name: string) => Promise<Error | null>;
}

const ModalContent = styled.div`
  width: 20%;
  min-height: 25vh;
  align-self: center;
  background-color: #262627;
  margin-inline: auto;
  padding: 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  #error {
    color: #f70505;
  }
`;

export default function CreateBrandModal({ handleClose, action }: props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sweetAlert, setSweetAlert] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);

  async function handleAction() {
    setError(() => null);
    const name = nameRef.current?.value;
    if (!name) {
      setError("o campo nome é obrigatorio!");
      return;
    }
    setLoading(() => true);
    const response = await action(name);
    await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // testing loading
    setLoading(() => false);
    if (response) setError(response.message);
    else setSweetAlert(true);
  }

  return (
    <Modal onClose={handleClose}>
      <ModalContent>
        <h2>Criar nova marca</h2>
        <Input
          width="80%"
          ref={nameRef}
          type="string"
          placeholder="Digite o nome da marca"
        />
        {!loading ? (
          <Button width="80%" title="Criar" action={handleAction} />
        ) : (
          <LoadingSpinner />
        )}
        {error && <span id="error">{error}</span>}
        {sweetAlert && (
          <SweetAlert
            message="Marca criada com sucesso!"
            onConfirm={handleClose}
          />
        )}
      </ModalContent>
    </Modal>
  );
}
