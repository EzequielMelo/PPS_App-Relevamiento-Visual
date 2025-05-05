import axios from "axios";
import Constants from "expo-constants"; // Asegúrate de importar Constants

// Si estás usando Expo, puedes obtener la URL desde los extras
const backendUrl =
  Constants.expoConfig?.extra?.backendUrl || "http://192.168.1.36:3000/api"; // URL por defecto para desarrollo local

/*
const backendUrl =
  Constants.expoConfig?.extra?.backendUrl ||
  process.env.EXPO_PUBLIC_API_URL ||
  "https://proyecto-mobileapp.onrender.com/api";
 */

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
