import { apiFetch } from "./api";
import { EbookType } from "../types/EbookType";

export const getEbooks = async (): Promise<EbookType[]> => {
  const res = await apiFetch("/chapters");

  if (!res || !Array.isArray(res.data)) {
    return [];
  }

  return res.data;
};
