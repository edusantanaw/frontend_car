import { brand } from "../../../../@types/brand";
import { car } from "../../../../@types/car";
import BrandListItem from "./BrandListItem";
import { List } from "../style/list";

interface props {
  brands: brand[];
  cars: car[];
}

const BrandList = ({ brands, cars }: props) => {
  function getCarsByBrandId(id: string) {
    return cars.filter((e) => e.marca_id === id);
  }

  return (
    <List>
      {brands.map((e) => (
        <BrandListItem key={e.id} cars={getCarsByBrandId(e.id)} data={e} />
      ))}
    </List>
  );
};

export default BrandList;
