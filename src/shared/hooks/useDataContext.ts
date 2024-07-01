import { useContext } from "react";
import { DataContext } from "../context/dataContext";

export function useDataContext() {
  const data = useContext(DataContext);
  return data;
}
