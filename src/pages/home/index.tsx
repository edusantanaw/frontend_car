import { useState } from "react";
import { AiOutlineControl } from "react-icons/ai";
import { FaCar } from "react-icons/fa6";
import { IoLogoModelS } from "react-icons/io";
import styled from "styled-components";
import { createBrandService } from "../../services/brand";
import { carData, createCarService } from "../../services/cars";
import { Button } from "../../shared/components/Button";
import { useDataContext } from "../../shared/hooks/useDataContext";
import BrandList from "./components/brand/BrandList";
import BrandModal from "./components/brand/BrandModal";
import CarModal from "./components/car/CarModal";
import ModelModal from "./components/model/ModelModal";

const HomeContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 4em 7em;
  color: #fff;
  background-color: #030211;
`;

const Header = styled.div`
  padding-bottom: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .actions {
    display: flex;
    gap: 2em;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  color: #ee0571;
`;

const Home = () => {
  const [brandModal, setBrandModal] = useState<boolean>(false);
  const [modelModal, setModelModal] = useState<boolean>(false);
  const [carModal, setCarModal] = useState<boolean>(false);

  const { addCarToList, addItemToList, brands } = useDataContext();

  async function handleCreateBrand(name: string) {
    try {
      const newBrand = await createBrandService(name);
      addItemToList(newBrand);
      return null;
    } catch (error) {
      return error as Error;
    }
  }

  async function handleCreateCar(data: carData) {
    try {
      const newCar = await createCarService(data);
      const { modelo, ...rest } = newCar;
      addCarToList({
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

  return (
    <HomeContainer>
      <Header>
        <Title>Desafio Frontend WSWORK</Title>
        <div className="actions">
          <Button
            action={() => setBrandModal(true)}
            title="Nova Marca"
            Icon={AiOutlineControl}
            background="#40bb10"
          />
          <Button
            action={() => setCarModal(true)}
            title="Novo carro"
            Icon={FaCar}
          />
          <Button
            action={() => setModelModal(true)}
            title="Modelo"
            Icon={IoLogoModelS}
            background="#ff1818"
          />
        </div>
      </Header>
      <BrandList brands={brands} />
      {brandModal && (
        <BrandModal
          action={handleCreateBrand}
          handleClose={() => setBrandModal(false)}
        />
      )}
      {modelModal && <ModelModal handleClose={() => setModelModal(false)} />}
      {carModal && (
        <CarModal
          handleClose={() => setCarModal(false)}
          action={handleCreateCar}
        />
      )}
    </HomeContainer>
  );
};

export default Home;
