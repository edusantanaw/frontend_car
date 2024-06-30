import { brand } from "../../../@types/brand";
import { car } from "../../../@types/car";
import BrandListItem from "./BrandListItem";
import { List } from "./style/list";

interface props {
  brands: brand[];
  cars: car[];
}

const BrandList = ({ brands }: props) => {
  return (
    <List>
      {brands.map((e) => (
        <BrandListItem key={e.id} data={e} />
      ))}
    </List>
  );
};

export default BrandList;
