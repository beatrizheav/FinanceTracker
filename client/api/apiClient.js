const BASE_URL = "http://192.168.0.164:5001";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

const defaultHeaders = async () => {
  const token = await getToken();

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Función base
const request = async (
  endpoint,
  { method = "GET", body, headers = {} } = {}
) => {
  const headersBase = await defaultHeaders();

  const config = {
    method,
    headers: {
      ...headersBase,
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error en la solicitud");
    }

    return data;
  } catch (error) {
    console.error("❌ API error:", error.message);
    throw error; // para manejarlo donde se use
  }
};

// Métodos predefinidos
const apiClient = {
  get: (endpoint, headers) => request(endpoint, { method: "GET", headers }),
  post: (endpoint, body, headers) =>
    request(endpoint, { method: "POST", body, headers }),
  put: (endpoint, body, headers) =>
    request(endpoint, { method: "PUT", body, headers }),
  delete: (endpoint, headers) =>
    request(endpoint, { method: "DELETE", headers }),
};

export default apiClient;
