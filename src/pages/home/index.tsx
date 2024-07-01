import styled from "styled-components";
import { brand } from "../../@types/brand";
import { useFetchList } from "../../shared/hooks/useFetch";
import BrandList from "./components/brand/BrandList";
import { FaCar } from "react-icons/fa6";
import { Button } from "../../shared/components/Button";
import { IoLogoModelS } from "react-icons/io";
import { car } from "../../@types/car";
import { model } from "../../@types/model";
import { AiOutlineControl } from "react-icons/ai";
import { useState } from "react";
import BrandModal from "./components/brand/BrandModal";
import { createBrandService } from "../../services/brand";
import ModelModal from "./components/model/ModelModal";
import CarModal from "./components/car/CarModal";
import { carData, createCarService } from "../../services/cars";

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
`;

const Home = () => {
  const [brandModal, setBrandModal] = useState<boolean>(false);
  const [modelModal, setModelModal] = useState<boolean>(false);
  const [carModal, setCarModal] = useState<boolean>(false);

  const { data: brand, addItemToList } = useFetchList<
    brand,
    { brands: brand[] }
  >({
    route: "/api/brand",
    getResponse: (data: { brands: brand[] }) => data.brands,
  });

  const { data: cars, addItemToList: addCarToList } = useFetchList<
    car,
    { cars: car[] }
  >({
    route: "/api/car",
    getResponse: (data: { cars: car[] }) => data.cars,
  });

  const {
    data: models,
    updateListItem,
    addItemToList: addModelItem,
  } = useFetchList<model, { models: model[] }>({
    route: "/api/model",
    getResponse: (data: { models: model[] }) => data.models,
  });

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
      <BrandList brands={brand} cars={cars} />
      {brandModal && (
        <BrandModal
          action={handleCreateBrand}
          handleClose={() => setBrandModal(false)}
        />
      )}
      {modelModal && (
        <ModelModal
          models={models}
          addModelItem={addModelItem}
          brands={brand}
          handleClose={() => setModelModal(false)}
          updateListItem={updateListItem}
        />
      )}
      {carModal && (
        <CarModal
          addCarToList={addCarToList}
          models={models}
          handleClose={() => setCarModal(false)}
          action={handleCreateCar}
        />
      )}
    </HomeContainer>
  );
};

export default Home;
