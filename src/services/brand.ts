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
async function deleteBrandService() {}
async function updateBrandService() {}

export { createBrandService, deleteBrandService, updateBrandService };
