import { AxiosError } from "axios";
import { brand } from "../@types/brand";
import Api from "../shared/utils/Api";

async function createBrandService(name: string) {
  try {
    const response = await Api.post<brand>("/api/brand", { nome_marca: name });
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<string>;
    if (response && typeof response.data === "string") {
      throw new Error(response.data);
    }
    throw new Error("erro desconhecido!");
  }
}

async function deleteBrandService(id: string) {
  try {
    const response = await Api.delete<string>(`/api/brand/${id}`);
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<string>;
    if (response && typeof response.data === "string") {
      throw new Error(response.data);
    }
    throw new Error("erro desconhecido!");
  }
}

async function updateBrandService(id: string, name: string) {
  try {
    const response = await Api.put<brand>(`/api/brand/${id}`, {
      nome_marca: name,
    });
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<string>;
    if (response && typeof response.data === "string") {
      throw new Error(response.data);
    }
    throw new Error("erro desconhecido!");
  }
}

export { createBrandService, deleteBrandService, updateBrandService };
