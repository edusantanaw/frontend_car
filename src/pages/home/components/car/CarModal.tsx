import { useState } from "react";
import styled from "styled-components";
import { car } from "../../../../@types/car";
import { model } from "../../../../@types/model";
import { carData } from "../../../../services/cars";
import { Button } from "../../../../shared/components/Button";
import { Input } from "../../../../shared/components/Input";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import Modal from "../../../../shared/components/Modal";
import SweetAlert from "../../../../shared/components/SweetAlert";

interface props {
  editMode?: boolean;
  models: model[];
  car?: car;
  handleClose: () => void;
  addCarToList: (data: car) => void;
  action: (data: carData) => Promise<Error | null>;
}

const FormStyle = styled.div`
  width: 30em;
  min-height: 32em;
  align-self: center;
  margin-inline: auto;
  background-color: #262627;
  padding: 2em 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 5px 1px #686869be;
  select {
    width: 100%;
    padding: 1em;
  }

  #error {
    color: #e40c0c;
  }
`;

type fuel = "FLEX" | "DIESEL";

const currentDate = new Date();

const CarModal = ({ editMode, handleClose, models, action }: props) => {
  const [fuel, setFuel] = useState<fuel>("DIESEL");
  const [dors, setDors] = useState<number>(2);
  const [color, setColor] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [modelId, setModelId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sweetAlert, setSweetAlert] = useState<boolean>(false);

  function parseNumber(value: string, prev: number) {
    const parsed = Number(value);
    if (isNaN(parsed)) return prev;
    return Number(Number(parsed).toFixed(0));
  }

  function validateFields(fields: carData): string | null {
    if (!fields.ano) return "O ano é obrigatorio!";
    if (!fields.cor) return "O cor é obrigatorio!";
    if (!fields.modelo_id) return "O modelo é obrigatorio!";
    if (!fields.num_portas) return "O número de portas é obrigatorio!";
    if (fields.ano >= currentDate.getFullYear() + 1)
      return "O ano deve ser menor que o ano atual!";
    if (fields.ano <= 1870) return "O ano deve ser maior que 1870!";
    return null;
  }

  function getFields(): carData {
    return {
      ano: year!,
      combustivel: fuel,
      cor: color!,
      modelo_id: modelId!,
      num_portas: dors,
    };
  }

  async function handleAction() {
    setError(null);
    setLoading(true);
    const fields = getFields();
    const maybeError = validateFields(fields);
    if (maybeError) {
      setError(maybeError);
      setLoading(false);
      return;
    }
    const response = await action(fields);
    if (response) setError(response.message);
    else setSweetAlert(true);
    setLoading(false);
  }

  return (
    <Modal onClose={handleClose}>
      <FormStyle>
        <h2>{editMode ? "Editar" : "Criar"} carro</h2>
        <select value={modelId!} onChange={(e) => setModelId(e.target.value)}>
          <option value="">Selecione o modelo</option>
          {models.map((e) => (
            <option value={e.id}>{e.nome}</option>
          ))}
        </select>
        <select value={fuel} onChange={(e) => setFuel(e.target.value as fuel)}>
          <option value="FLEX">FLEX</option>
          <option value="DIESEL">DIESEL</option>
        </select>
        <Input
          value={color}
          placeholder="Digite a cor"
          onChange={(e) => setColor(e.target.value)}
        />
        <Input
          value={year}
          placeholder="Digite o ano"
          onChange={(e) => setYear(parseNumber(e.target.value, year))}
        />
        <Input
          value={dors}
          placeholder="Digite o número de portas"
          onChange={(e) => setDors(parseNumber(e.target.value, dors))}
        />
        {error && <span id="error">{error}</span>}
        {!loading ? (
          <Button title={editMode ? "Editar" : "Criar"} action={handleAction} />
        ) : (
          <LoadingSpinner />
        )}
        {sweetAlert && (
          <SweetAlert
            message={editMode ? "Editado com sucesso!" : "Criado com sucesso!"}
            onConfirm={handleClose}
          />
        )}
      </FormStyle>
    </Modal>
  );
};

export default CarModal;
