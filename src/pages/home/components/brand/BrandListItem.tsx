import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { brand } from "../../../../@types/brand";
import {
  deleteBrandService,
  updateBrandService,
} from "../../../../services/brand";
import ConfirmDelete from "../../../../shared/components/ConfirmDelete";
import SweetAlert from "../../../../shared/components/SweetAlert";
import BrandModal from "./BrandModal";
import { ListItem } from "../style/list";
import { car } from "../../../../@types/car";

interface props {
  data: brand;
  cars: car[];
}

const ItemHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2em;
  .action {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .icon {
    font-size: 1.1em;
    cursor: pointer;
  }
`;

const Cars = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 1em;
  width: 90%;
  li {
    border: 1px solid #c3c3c3;
    list-style: none;
    padding: 1em;
  }
`;

const BrandListItem = ({ data, cars }: props) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState(data);
  const [failedModal, setFailedModal] = useState<boolean>(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  if (deleted) return <></>;

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
      const response = await deleteBrandService(data.id);
      console.log(response);
      setDeleted(true);
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
        <p>Marca: {updatedData.nome_marca}</p>
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
      <Cars>
        {cars.map((e) => (
          <li key={e.id}>Modelo: {e.nome_modelo}</li>
        ))}
      </Cars>
    </ListItem>
  );
};

export default BrandListItem;
