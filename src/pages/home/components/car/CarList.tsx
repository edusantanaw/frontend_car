import styled from "styled-components";
import { car } from "../../../../@types/car";
import CarItem from "./CarItem";
import { model } from "../../../../@types/model";

const Cars = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 1.5em;
  width: 100%;
`;

interface props {
  cars: car[];
  models: model[];
}

const CarList = ({ cars, models }: props) => {
  return (
    <Cars>
      {cars.map((car) => (
        <CarItem models={models} car={car} key={car.id} />
      ))}
    </Cars>
  );
};

export default CarList;
