import axios from "axios";
import Constants from "expo-constants";

const backendUrl =
  Constants.expoConfig?.extra?.backendUrl ||
  process.env.EXPO_PUBLIC_API_URL ||
  "https://proyecto-mobileapp.onrender.com/api";

if (!backendUrl) {
  console.warn("⚠️ No se pudo determinar la URL del backend");
}

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
