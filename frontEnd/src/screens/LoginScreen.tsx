import React from "react";
import {
  Text,
  TextInput,
  Button,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AuthLayout from "../layouts/AuthLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import * as yup from "yup";
import api from "../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../auth/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export default function LoginScreen({ navigation }: Props) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const [showUsers, setShowUsers] = useState(false); // Ahora sí declarado correctamente

  const sampleUsers = [
    {
      email: "cuentaejemplo123@ejemplo.com",
      password: "123456",
    },
    { email: "micuenta@gmail.com", password: "12345678" },
    { email: "cuenta@cuenta.com", password: "1234567" },
    { email: "pruebaapp1@cuenta.com", password: "1234567" },
  ];
  const email = watch("email");
  const password = watch("password");

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setServerError(null);
      setLoading(true);
      const response = await api.post("/auth/login", data);

      const token = response.data.session.access_token;
      const user = response.data.user;

      await login(token, user);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      setServerError(
        err.response?.data?.error || "Ocurrió un error al iniciar sesión",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Iniciar sesión">
      <View style={{ gap: 16 }}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"white"}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: "#515966",
            padding: 12,
            borderRadius: 8,
            color: "white",
          }}
          value={email} // <-- ahora toma el valor actual
          onChangeText={(text) => setValue("email", text)}
        />
        {errors.email && (
          <Text style={{ color: "red", marginTop: -10 }}>
            {errors.email.message}
          </Text>
        )}
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={"white"}
          secureTextEntry
          style={{
            backgroundColor: "#515966",
            padding: 12,
            borderRadius: 8,
            color: "white",
          }}
          value={password} // <-- también acá
          onChangeText={(text) => setValue("password", text)}
        />
        {errors.password && (
          <Text style={{ color: "red", marginTop: -10 }}>
            {errors.password.message}
          </Text>
        )}

        {serverError && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {serverError}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(handleLogin)}
          style={{
            backgroundColor: loading ? "#ccc" : "#DC3545",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 10,
          }}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold" }}>Ingresar</Text>
          )}
        </TouchableOpacity>

        <Button
          title="¿No tenés cuenta? Registrate"
          onPress={() => navigation.navigate("Registro")}
          color="#0D6EFD"
        />
      </View>

      {/* Botón para desplegar usuarios */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Elegir usuario de prueba"
          onPress={() => setShowUsers(!showUsers)}
          color="#0D6EFD"
        />
      </View>

      {/* Lista de usuarios */}
      {showUsers && (
        <View style={styles.userList}>
          {sampleUsers.map((user, index) => (
            <TouchableOpacity
              key={index}
              style={styles.userButton}
              onPress={() => {
                setValue("email", user.email);
                setValue("password", user.password);
                setShowUsers(false); // Cierra la lista
              }}
            >
              <Text style={styles.userText}>{user.email}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  userList: {
    marginTop: 10,
    backgroundColor: "#1c2a3a",
    borderRadius: 8,
    padding: 10,
  },
  userButton: {
    paddingVertical: 8,
  },
  userText: {
    color: "white",
    fontSize: 16,
  },
});
