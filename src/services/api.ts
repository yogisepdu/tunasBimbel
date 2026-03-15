import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = "http://10.0.2.2:8000";

// 🔥 helper untuk file storage
export const storageUrl = (path?: string) => {
  if (!path) return null;

  if (path.startsWith("http")) {
    return path;
  }

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

  if (!response.ok) {
    if (response.status === 401 && token) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      throw new Error("Session habis, silakan login kembali");
    }

    throw new Error(json.message || "Terjadi kesalahan");
  }

  return json;
}
