import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToLogin } from "../navigation/navigationRef";

const envApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

export const API_URL = (
  envApiUrl && envApiUrl.length > 0 ? envApiUrl : "http://10.0.2.2:8000"
).replace(/\/+$/, "");

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiOptions = {
  method?: ApiMethod;
  body?: unknown;
  headers?: Record<string, string>;
};

export class ApiError extends Error {
  status: number;
  data: any;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, data: any = null) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.errors = data?.errors;
  }
}

export async function getStoredToken(): Promise<string | null> {
  return AsyncStorage.getItem("token");
}

export async function clearAuthStorage(): Promise<void> {
  await AsyncStorage.multiRemove(["token", "user"]);
}

export function resolveBackendUrl(url?: string | null): string | null {
  if (!url) {
    return null;
  }

  if (url.startsWith("/")) {
    return `${API_URL}${url}`;
  }

  try {
    const parsed = new URL(url);

    const isInternalPath =
      parsed.pathname.startsWith("/api/") ||
      parsed.pathname.startsWith("/storage/");

    if (isInternalPath) {
      return (
        `${API_URL}` +
        `${parsed.pathname}` +
        `${parsed.search}` +
        `${parsed.hash}`
      );
    }

    return url;
  } catch {
    return url;
  }
}

export const storageUrl = (path?: string | null): string | null => {
  return resolveBackendUrl(path);
};

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getStoredToken();

  return {
    Accept: "application/json",

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
}

function firstValidationError(json: any): string | null {
  if (!json?.errors || typeof json.errors !== "object") {
    return null;
  }

  const first = Object.values(json.errors)
    .flat()
    .find((value) => typeof value === "string");

  return typeof first === "string" ? first : null;
}

function getSafeErrorMessage(status: number, json: any): string {
  if (status >= 500) {
    return "Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.";
  }

  if (status === 403) {
    return typeof json?.message === "string" && json.message.trim()
      ? json.message
      : "Kamu tidak memiliki akses ke materi ini atau masa aktif paket sudah berakhir.";
  }

  if (status === 404) {
    return typeof json?.message === "string" && json.message.trim()
      ? json.message
      : "Data yang diminta tidak ditemukan.";
  }

  if (status === 422) {
    return (
      firstValidationError(json) ??
      (typeof json?.message === "string" && json.message.trim()
        ? json.message
        : "Data yang dikirim belum valid.")
    );
  }

  if (status === 429) {
    return "Terlalu banyak permintaan. Silakan tunggu sebentar lalu coba lagi.";
  }

  if (typeof json?.message === "string" && json.message.trim()) {
    return json.message;
  }

  return "Permintaan tidak dapat diproses.";
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const token = await getStoredToken();

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  let response: Response;

  try {
    response = await fetch(`${API_URL}/api${normalizedEndpoint}`, {
      method: options.method ?? "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...(options.headers ?? {}),
      },

      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError(
      "Tidak dapat terhubung ke server. Periksa koneksi dan alamat API.",
      0,
      null,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  let json: any = null;

  if (text.trim()) {
    try {
      json = JSON.parse(text);
    } catch {
      throw new ApiError(
        response.status >= 500
          ? "Terjadi kesalahan pada server. Silakan coba beberapa saat lagi."
          : "Server tidak merespon dengan format yang benar.",
        response.status,
        null,
      );
    }
  }

  if (response.status === 401) {
    if (token) {
      await clearAuthStorage();

      resetToLogin();

      throw new ApiError("SESSION_EXPIRED", 401, json);
    }

    throw new ApiError(getSafeErrorMessage(401, json), 401, json);
  }

  if (!response.ok) {
    throw new ApiError(
      getSafeErrorMessage(response.status, json),
      response.status,
      json,
    );
  }

  return json as T;
}
