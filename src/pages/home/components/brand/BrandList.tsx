import { brand } from "../../../../@types/brand";
import { car } from "../../../../@types/car";
import BrandListItem from "./BrandListItem";
import { List } from "../style/list";
import { model } from "../../../../@types/model";

interface props {
  brands: brand[];
  cars: car[];
  models: model[];
}

const BrandList = ({ brands, cars, models }: props) => {
  function getCarsByBrandId(id: string) {
    return cars.filter((e) => e.marca_id === id);
  }

  return (
    <List>
      {brands.map((e) => (
        <BrandListItem
          models={models}
          key={e.id}
          cars={getCarsByBrandId(e.id)}
          data={e}
        />
      ))}
    </List>
  );
};

export default BrandList;
