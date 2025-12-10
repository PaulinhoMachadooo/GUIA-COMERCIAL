// WebViewScreen.js
import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WebViewScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: "https://guiamaisportofeliz.com.br/categorias/" }} // Substitua pelo seu URL
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Garante que o webview não sobreponha a barra de status ou a tab bar
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;
