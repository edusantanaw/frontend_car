import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { brand } from "../../../../@types/brand";
import { car } from "../../../../@types/car";
import {
  deleteBrandService,
  updateBrandService,
} from "../../../../services/brand";
import ConfirmDelete from "../../../../shared/components/ConfirmDelete";
import SweetAlert from "../../../../shared/components/SweetAlert";
import CarList from "../car/CarList";
import { ListItem } from "../../../../shared/styles/list";
import BrandModal from "./BrandModal";
import { ItemHeader } from "./style";
import { useDataContext } from "../../../../shared/hooks/useDataContext";

interface props {
  data: brand;
  cars: car[];
}

const BrandListItem = ({ data, cars }: props) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState(data);
  const [failedModal, setFailedModal] = useState<boolean>(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const { deleteBrandFromList } = useDataContext();

  async function handleUpdate(name: string) {
    try {
      const response = await updateBrandService(data.id, name);
      setUpdatedData(response);
      return null;
    } catch (error) {
      return error as Error;
    }
  }

  async function handleDelete() {
    try {
      await deleteBrandService(data.id);
      deleteBrandFromList(data.id);
    } catch (err) {
      const { message } = err as Error;
      setFailedMessage(message);
      setFailedModal(true);
    }
  }

  function handleConfirmFailedModal() {
    setFailedMessage(null);
    setFailedModal(false);
  }

  return (
    <ListItem>
      {editModal && (
        <BrandModal
          handleClose={() => setEditModal(false)}
          defaultValue={updatedData.nome_marca}
          editMode={true}
          action={handleUpdate}
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
      <ItemHeader>
        <h2>
          <span>Marca:</span> {updatedData.nome_marca}
        </h2>
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
      </ItemHeader>
      <CarList cars={cars} />
    </ListItem>
  );
};

export default BrandListItem;
