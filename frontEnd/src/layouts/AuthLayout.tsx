import { View, Text, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: Props) {
  return (
    <LinearGradient
      colors={["#151F2E", "#10002B"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.inner}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
});
