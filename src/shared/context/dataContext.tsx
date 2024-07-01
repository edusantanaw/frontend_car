import { createContext } from "react";
import { car } from "../../@types/car";
import { model } from "../../@types/model";
import { brand } from "../../@types/brand";
import { useFetchList } from "../hooks/useFetch";

type IDataContext = {
  cars: car[];
  models: model[];
  brands: brand[];
  updateListItem: (item: model) => void;
  addModelItem: (item: model) => void;
  addItemToList: (item: brand) => void;
  addCarToList: (item: car) => void;
};

export const DataContext = createContext({} as IDataContext);

interface props {
  children: React.ReactNode;
}

export const DataContextProvider = ({ children }: props) => {
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

  return (
    <DataContext.Provider
      value={{
        models,
        brands: brand,
        cars: cars,
        addItemToList: addItemToList,
        addCarToList,
        updateListItem,
        addModelItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
