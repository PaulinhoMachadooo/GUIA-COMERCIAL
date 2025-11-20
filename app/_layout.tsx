import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ title: "categories" }} />
      <Stack.Screen name="product/[id]" options={{ headerShown: true }} />
    </Stack>
  );
}
