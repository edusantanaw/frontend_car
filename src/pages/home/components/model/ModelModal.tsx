import { useState } from "react";
import styled from "styled-components";
import {
  createModelService,
  updateModelService,
} from "../../../../services/models";
import { Button } from "../../../../shared/components/Button";
import Modal from "../../../../shared/components/Modal";
import { useDataContext } from "../../../../shared/hooks/useDataContext";
import ModelForm, { modelDataType } from "./ModelForm";

interface props {
  handleClose: () => void;
}

const ModalContent = styled.div`
  align-self: center;
  margin-inline: auto;
  padding: 1em;
  min-width: 20em;
  min-height: 10em;
  background-color: #1b1a1a;
  margin-inline: auto;
  background-color: #262627;
  padding: 2em 0.5em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 5px 1px #686869be;

  .quest {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }

  .actions {
    display: flex;
    gap: 1em;
  }
  #select_model {
    width: 90%;
    padding: 1em;
  }
`;

type option = "edit" | "create";

const ModelModal = ({ handleClose }: props) => {
  const [selectedOption, setSelectedOptin] = useState<option | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const { addModelItem, updateListItem, models, brands } = useDataContext();

  async function handleCreateModel(data: modelDataType) {
    try {
      const response = await createModelService({
        marca_id: data.brand,
        nome: data.name,
        valor_fipe: Number(data.value),
      });
      addModelItem(response);
      return null;
    } catch (error) {
      return error as Error;
    }
  }

  async function handleEditModel(data: modelDataType) {
    try {
      const response = await updateModelService(selectedModelId!, {
        marca_id: data.brand,
        nome: data.name,
        valor_fipe: Number(data.value),
      });
      updateListItem(response);
      return null;
    } catch (error) {
      return error as Error;
    }
  }

  const selectedModel = models.find((e) => e.id === selectedModelId);

  return (
    <Modal onClose={handleClose}>
      <ModalContent>
        {!selectedOption && (
          <div className="quest">
            <p>Qual opção deseja escolher?</p>
            <div className="actions">
              <Button
                title="Criar"
                background="#d60b0b"
                action={() => setSelectedOptin("create")}
              />
              <Button
                title="Editar"
                background="#1b09be"
                action={() => setSelectedOptin("edit")}
              />
            </div>
          </div>
        )}
        {selectedOption === "create" && (
          <ModelForm
            action={handleCreateModel}
            brands={brands}
            handleClose={handleClose}
          />
        )}
        {selectedOption === "edit" && (
          <>
            {selectedModel ? (
              <ModelForm
                handleClose={handleClose}
                editMode={true}
                action={handleEditModel}
                brands={brands}
                model={selectedModel}
              />
            ) : (
              <select
                name="model"
                value={selectedModelId ?? ""}
                onChange={(e) => setSelectedModelId(e.target.value)}
                id="select_model"
              >
                <option>Selecione o modelo</option>
                {models.map((e) => (
                  <option value={e.id}>{e.nome}</option>
                ))}
              </select>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModelModal;
