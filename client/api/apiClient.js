import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

const defaultHeaders = async () => {
  const token = await getToken();

  return {
    ...(token && { Authorization: `Bearer ${token}` }), // Siempre agregar el token
  };
};

const request = async (
  endpoint,
  { method = "GET", body, headers = {} } = {}
) => {
  const headersBase = await defaultHeaders();

  const isFormData = body instanceof FormData;

  const config = {
    method,
    headers: {
      ...headersBase, // Siempre agregamos el token aquí
      ...headers,
      ...(isFormData ? {} : { "Content-Type": "application/json" }), // 👈 Solo si no es FormData
    },
    ...(body && { body: isFormData ? body : JSON.stringify(body) }), // No tocamos el Content-Type para FormData
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        router.replace("/login");
      }
      throw new Error(data.message || "Error en la solicitud");
    }

    return data;
  } catch (error) {
    console.error("❌ API error:", error.message);
    throw error;
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
