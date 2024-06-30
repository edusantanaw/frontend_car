import { useEffect, useRef, useState } from "react";
import { Button } from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import styled from "styled-components";
import { Input } from "../../../shared/components/Input";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import SweetAlert from "../../../shared/components/SweetAlert";
import delay from "../../../shared/utils/delay";

interface props {
  handleClose: () => void;
  action: (name: string) => Promise<Error | null>;
  editMode?: boolean;
  defaultValue?: string;
}

const ModalContent = styled.div`
  width: 18em;
  min-height: 28vh;
  align-self: center;
  background-color: #262627;
  margin-inline: auto;
  padding: 2em 0.5em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 5px 1px #686869be;
  #error {
    color: #f70505;
  }
`;

export default function BrandModal({
  handleClose,
  action,
  editMode,
  defaultValue,
}: props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sweetAlert, setSweetAlert] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function getFields() {
    const fields = {
      name: nameRef.current?.value,
    };
    return fields;
  }

  async function handleAction() {
    const fields = getFields();
    setError(() => null);
    if (!fields.name) {
      setError("o campo nome é obrigatorio!");
      return;
    }
    setLoading(() => true);
    const response = await action(fields.name);
    await delay(0.5); // testing loading
    setLoading(() => false);
    if (response) setError(response.message);
    else setSweetAlert(true);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.toUpperCase() === "ENTER") handleAction();
  }

  return (
    <Modal onClose={handleClose}>
      <ModalContent>
        <h2>{editMode ? "Editar" : "Criar nova"} marca</h2>
        <Input
          width="80%"
          ref={nameRef}
          type="string"
          placeholder="Digite o nome da marca"
          defaultValue={defaultValue ?? ""}
          onKeyPress={handleKeyPress}
        />
        {!loading ? (
          <Button
            width="80%"
            title={editMode ? "Editar" : "Criar"}
            action={handleAction}
          />
        ) : (
          <LoadingSpinner />
        )}
        {error && <span id="error">{error}</span>}
        {sweetAlert && (
          <SweetAlert
            message={`Marca ${editMode ? "editada" : "criada"} com sucesso!`}
            onConfirm={handleClose}
          />
        )}
      </ModalContent>
    </Modal>
  );
}
