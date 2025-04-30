import React from "react";
import {
  TextInput,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AuthLayout from "../layouts/AuthLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackParamList";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios";
import { useState } from "react";
import { AxiosError } from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Registro">;

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

export default function RegisterScreen({ navigation }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: { email: string; password: string }) => {
    try {
      setServerError(null);
      setLoading(true);

      await api.post("/auth/register", data);

      navigation.navigate("Login");
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      setServerError(
        err.response?.data?.error || "Ocurrió un error al registrarse",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Registrate">
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
          onChangeText={(text) => setValue("email", text)}
          {...register("email")}
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
          onChangeText={(text) => setValue("password", text)}
          {...register("password")}
        />
        {errors.password && (
          <Text style={{ color: "red", marginTop: -10 }}>
            {errors.password.message}
          </Text>
        )}

        {serverError && (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 8 }}>
            {serverError}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(handleRegister)}
          style={{
            backgroundColor: loading ? "#ccc" : "#DC3545",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Registrarse
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
