import styled from "styled-components";
import { car } from "../../../../@types/car";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import {
  carData,
  deleteCarService,
  updateCarService,
} from "../../../../services/cars";
import CarModal from "./CarModal";
import { model } from "../../../../@types/model";
import ConfirmDelete from "../../../../shared/components/ConfirmDelete";
import SweetAlert from "../../../../shared/components/SweetAlert";

interface props {
  car: car;
  models: model[];
}

const CarItemStyle = styled.li`
  border: 1px solid #c3c3c3;
  list-style: none;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-weight: 300;
  font-size: 0.9em;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 1px #ee0571;
  position: relative;
  span {
    color: #ee0571;
    font-weight: 500;
    font-size: 1.1em;
  }

  .action {
    position: absolute;
    right: 1em;
    display: flex;
    gap: 0.5em;
  }
  .icon {
    font-size: 1.05em;
    cursor: pointer;
  }
`;

const CarItem = ({ car, models }: props) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState(car);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [failedModal, setFailedModal] = useState<boolean>(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  async function editCar(data: carData) {
    try {
      const response = await updateCarService(car.id, data);
      const { modelo, ...rest } = response;
      setUpdatedData({
        ...rest,
        modelo_id: modelo.id,
        marca_id: modelo.marca_id.id,
        valor: modelo.valor_fipe,
        nome_modelo: modelo.nome,
      });
      return null;
    } catch (error) {
      return error as Error;
    }
  }

  async function handleDelete() {
    try {
      await deleteCarService(car.id);
      setDeleted(true);
    } catch (error) {
      const { message } = error as Error;
      setFailedMessage(message);
      setFailedModal(true);
    }
  }

  function handleConfirmFailedModal() {
    setFailedMessage(null);
    setFailedModal(false);
  }

  if (deleted) return <></>;

  return (
    <CarItemStyle key={updatedData.id}>
      <p>
        <span>Modelo:</span> {updatedData.nome_modelo}
      </p>
      <p>
        <span>Combustivel:</span> {updatedData.combustivel}
      </p>
      <p>
        <span>Valor fipe:</span> {updatedData.valor}
      </p>
      <p>
        <span>Ano:</span> {updatedData.ano}
      </p>
      <p>
        <span>Cor:</span> {updatedData.cor}
      </p>
      <p>
        <span>Portas:</span> {updatedData.num_portas}
      </p>
      <div className="action">
        <FaEdit
          onClick={() => setEditModal(true)}
          className="icon"
          color="#446beb"
        />
        <FaTrash
          onClick={() => setDeleteModal(true)}
          className="icon"
          color="#ff0000"
        />
      </div>
      {editModal && (
        <CarModal
          editMode={true}
          car={updatedData}
          action={editCar}
          handleClose={() => setEditModal(false)}
          models={models}
        />
      )}
      {deleteModal && (
        <ConfirmDelete
          cancelAction={() => setDeleteModal(false)}
          deleteAction={handleDelete}
        />
      )}
      {failedModal && (
        <SweetAlert
          message={failedMessage ?? "Erro"}
          onConfirm={handleConfirmFailedModal}
          type="failed"
        />
      )}
    </CarItemStyle>
  );
};

export default CarItem;
