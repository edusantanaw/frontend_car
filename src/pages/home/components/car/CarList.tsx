import { car } from "../../../../@types/car";
import CarItem from "./CarItem";
import { Cars } from "./style";

interface props {
  cars: car[];
}

const CarList = ({ cars }: props) => {
  return (
    <Cars>
      {cars.map((car) => (
        <CarItem car={car} key={car.id} />
      ))}
    </Cars>
  );
};

export default CarList;
