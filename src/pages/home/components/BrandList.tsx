import styled from "styled-components";
import { brand } from "../../../@types/brand";
import { car } from "../../../@types/car";

interface props {
  brands: brand[];
  cars: car[]
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ListItem = styled.li`
  width: 100%;
  list-style: none;
  h2 {
    font-size: 1.3em;
  }
  p {
    width: 100%;
    border: 1px solid #c3c3c3;
    padding: 0.5em;
    border-radius: 4px;
  }
`;

const BrandList = ({ brands }: props) => {
  return (
    <List>
      {brands.map((e) => (
        <ListItem key={e.id}>
          <p>Marca: {e.nome_marca}</p>
        </ListItem>
      ))}
    </List>
  );
};

export default BrandList;
