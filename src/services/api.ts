import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToLogin } from "../navigation/navigationRef"; // ⬅️ penting

export const API_URL = "http://10.0.2.2:8000";

export const storageUrl = (path?: string) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
};

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};

export async function apiFetch(endpoint: string, options: ApiOptions = {}) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    method: options.method ?? "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();

  let json: any;

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Server tidak merespon dengan benar");
  }

  // 🔥 BEDAKAN LOGIN vs SESSION EXPIRED
  if (response.status === 401) {
    if (token) {
      // ✅ ini session expired
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      resetToLogin();

      throw new Error("SESSION_EXPIRED");
    } else {
      // ✅ ini login gagal
      throw new Error(json.message || "Email atau password salah");
    }
  }

  if (!response.ok) {
    throw new Error(json.message || "Terjadi kesalahan");
  }

  return json;
}
