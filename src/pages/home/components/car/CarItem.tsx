import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { car } from "../../../../@types/car";
import {
  carData,
  deleteCarService,
  updateCarService,
} from "../../../../services/cars";
import ConfirmDelete from "../../../../shared/components/ConfirmDelete";
import SweetAlert from "../../../../shared/components/SweetAlert";
import CarModal from "./CarModal";
import { CarItemStyle } from "./style";
import { useDataContext } from "../../../../shared/hooks/useDataContext";

interface props {
  car: car;
}

const CarItem = ({ car }: props) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState(car);
  const [failedModal, setFailedModal] = useState<boolean>(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const { deleteCarFromList } = useDataContext();

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
      deleteCarFromList(car.id);
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

  function formatToBrl(value: number) {
    return value.toFixed(2).replace(".", ",");
  }

  return (
    <CarItemStyle key={updatedData.id}>
      <p>
        <span>Modelo:</span> {updatedData.nome_modelo}
      </p>
      <p>
        <span>Combustivel:</span> {updatedData.combustivel}
      </p>
      <p>
        <span>Valor fipe:</span> {formatToBrl(updatedData.valor)}
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
