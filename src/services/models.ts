import { AxiosError } from "axios";
import { model } from "../@types/model";
import Api from "../shared/utils/Api";

type modelData = {
  nome: string;
  valor_fipe: number;
  marca_id: string;
};

async function deleteModelService() {}

async function createModelService(data: modelData) {
  try {
    const response = await Api.post<model>("/api/model", data);
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<string>;
    if (response && typeof response.data === "string") {
      throw new Error(response.data);
    }
    throw new Error("erro desconhecido!");
  }
}

async function updateModelService(id: string, data: modelData) {
  try {
    const response = await Api.put<model>(`/api/model/${id}`, data);
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<string>;
    if (response && typeof response.data === "string") {
      throw new Error(response.data);
    }
    throw new Error("erro desconhecido!");
  }
}

export { deleteModelService, createModelService, updateModelService };
