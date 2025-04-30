import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStackParamList";
import animationVideo from "../../assets/anime-project.json";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login"); // Ir a Login después de unos segundos
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Ezequiel Melo - App1</Text>

      <View style={styles.animationContainer}>
        <LottieView
          ref={animation}
          source={animationVideo}
          autoPlay
          loop={false}
          style={{
            width: 300,
            height: 300,
          }}
        />
      </View>

      <Text style={styles.bottomText}>A-141</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151F2E",
    justifyContent: "space-between", // <- separa arriba y abajo
    alignItems: "center",
    paddingVertical: 50, // espacio arriba y abajo
  },
  topText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
