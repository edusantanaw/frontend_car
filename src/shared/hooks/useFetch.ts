import { useEffect, useState } from "react";
import Api from "../utils/Api";
import { AxiosError } from "axios";

type props<T, R> = {
  route: string;
  dependences?: unknown[];
  getResponse: (data: R) => T[];
};

export function useFetchList<T, R>({
  route,
  dependences = [],
  getResponse,
}: props<T, R>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fethApi();
  }, dependences);

  async function fethApi() {
    setLoading(() => true);
    try {
      const response = await Api.get<R>(route, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(getResponse(response.data));
    } catch (error) {
      const { response } = error as AxiosError<string>;
      if (typeof response?.data === "string") setError(response.data);
      else console.log(response?.data); //only for debug;
    }
    setLoading(() => false);
  }

  function addItemToList(item: T) {
    setData((c) => [item, ...c]);
  }

  return {
    data,
    loading,
    error,
    addItemToList,
  };
}
