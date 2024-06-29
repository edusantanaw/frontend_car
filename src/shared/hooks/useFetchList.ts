import { useEffect, useState } from "react";
import Api from "../utils/Api";
import { AxiosError } from "axios";

type props = {
  route: string;
  dependences?: unknown[];
};

export function useFetchListHook<T>({ route, dependences = [] }: props) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fethApi();
  }, dependences);

  async function fethApi() {
    setLoading(() => true);
    try {
      const response = await Api.get(route);
      setData(response.data);
    } catch (error) {
      const { response } = error as AxiosError<string>;
      if (typeof response?.data === "string") setError(response.data);
      else console.log(response?.data);
    }
    setLoading(() => false);
  }

  return {
    data,
    loading,
    error,
  };
}
