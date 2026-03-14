import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:8000/api";

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};

export async function apiFetch(endpoint: string, options: ApiOptions = {}) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: options.method ?? "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // 🔴 WAJIB ADA
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();

  try {
    const json = JSON.parse(text);

    if (!response.ok) {
      throw new Error(json.message || "API Error");
    }

    return json;
  } catch (error) {
    console.log("API Response bukan JSON:", text);
    throw error;
  }
}