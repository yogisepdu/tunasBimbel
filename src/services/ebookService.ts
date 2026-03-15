import { apiFetch } from "./api";
import { EbookType } from "../types/EbookType";

export const getEbooks = async (): Promise<EbookType[]> => {
  try {
    const res = await apiFetch("/chapters");

    if (!res || !Array.isArray(res.data)) {
      console.log("Invalid chapters response:", res);
      return [];
    }

    return res.data;
  } catch (error: any) {
    console.log("getEbooks error:", error?.message);
    return [];
  }
};
