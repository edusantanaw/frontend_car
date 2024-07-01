import { AxiosError } from "axios";
import Api from "../shared/utils/Api";
import { model } from "../@types/model";

export type carData = {
  modelo_id: string;
  ano: number;
  cor: string;
  num_portas: number;
  combustivel: "FLEX" | "DIESEL";
};

export type carReponse = {
  modelo: model;
  ano: number;
  cor: string;
  num_portas: number;
  combustivel: "FLEX" | "DIESEL";
  id: string
};

async function createCarService(data: carData) {
  try {
    const response = await Api.post<carReponse>("/api/car", data);
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<string>;
    if (response && typeof response.data === "string") {
      throw new Error(response.data);
    }
    throw new Error("erro desconhecido!");
  }
}

async function deleteCarService() {}

async function updateCarService() {}

export { createCarService, deleteCarService, updateCarService };
