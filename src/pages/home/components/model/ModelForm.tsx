import React, { useState } from "react";
import { brand } from "../../../../@types/brand";
import { model } from "../../../../@types/model";
import { Input } from "../../../../shared/components/Input";
import styled from "styled-components";
import { Button } from "../../../../shared/components/Button";
import { removeNotBrlValue } from "../../../../shared/utils/removeNotBrlValue";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import SweetAlert from "../../../../shared/components/SweetAlert";

export type modelDataType = {
  name: string;
  value: string;
  brand: string;
};

interface props {
  editMode?: boolean;
  action: (data: modelDataType) => Promise<Error | null>;
  brands: brand[];
  model?: model | null;
  handleClose: () => void;
}

const FormStyle = styled.div`
  width: 30em;
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;

  select {
    padding: 1em;
    border: none;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
  }
`;

const ModelForm = ({ editMode, model, brands, action, handleClose }: props) => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>(
    model?.marca_id.id ?? brands[0].id
  );
  const [name, setName] = useState<string>(model?.nome ?? "");
  const [value, setValue] = useState<string>(String(model?.valor_fipe ?? ""));
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleAction() {
    if (error) setError(() => null);
    setLoading(() => true);
    const response = await action({
      brand: selectedBrandId,
      name,
      value,
    });
    if (response) setError(response.message);
    else setShowSweetAlert(true);
    setLoading(() => false);
  }

  const isEnableButton = name.length === 0 || value.length === 0;

  return (
    <FormStyle>
      <h2>{editMode ? "Editar" : "Criar novo"} modelo</h2>
      <Input
        value={name}
        placeholder="Digite o nome do modelo"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        value={value}
        onChange={(e) => setValue(removeNotBrlValue(e.target.value))}
        placeholder="Digite o valor fipe do moelo"
      />
      <select
        style={{ width: "100%" }}
        value={selectedBrandId}
        onChange={(e) => setSelectedBrandId(e.target.value)}
      >
        {brands.map((e) => (
          <option value={e.id} key={e.id}>
            {e.nome_marca}
          </option>
        ))}
      </select>
      {!loading ? (
        <Button
          title={editMode ? "Editar" : "Criar"}
          width="100%"
          action={handleAction}
          disabled={isEnableButton}
        />
      ) : (
        <LoadingSpinner />
      )}
      {error && <span>{error}</span>}
      {showSweetAlert && (
        <SweetAlert
          message={editMode ? "Editado com sucesso!" : "Criado com sucesso!"}
          onConfirm={handleClose}
        />
      )}
    </FormStyle>
  );
};

export default ModelForm;
