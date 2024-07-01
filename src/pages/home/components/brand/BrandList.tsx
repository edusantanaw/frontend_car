import { brand } from "../../../../@types/brand";
import { useDataContext } from "../../../../shared/hooks/useDataContext";
import { List } from "../style/list";
import BrandListItem from "./BrandListItem";

interface props {
  brands: brand[];
}

const BrandList = ({ brands }: props) => {
  const { cars } = useDataContext();

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
