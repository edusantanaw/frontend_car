import { useState } from "react";
import {
  createModelService,
  updateModelService,
} from "../../../../services/models";
import { Button } from "../../../../shared/components/Button";
import Modal from "../../../../shared/components/Modal";
import { useDataContext } from "../../../../shared/hooks/useDataContext";
import ModelForm, { modelDataType } from "./ModelForm";
import { ModalContent } from "./style";

interface props {
  handleClose: () => void;
}

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
