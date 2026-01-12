import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

export default function WebViewScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const webViewRef = useRef<WebView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (webViewRef.current) {
      const urlWithCacheBuster = url
        ? `${url}?t=${Date.now()}`
        : `https://guiacategorias.online?t=${Date.now()}`;
      webViewRef.current.reload();
    }
  }, [url]);

  const finalUrl = url || "https://guiacategorias.online";
  const urlWithCacheBuster = `${finalUrl}${
    finalUrl.includes("?") ? "&" : "?"
  }t=${Date.now()}`;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.webViewContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <WebView
          ref={webViewRef}
          source={{ uri: urlWithCacheBuster }}
          style={styles.webView}
          javaScriptEnabled
          scalesPageToFit
          cacheMode="LOAD_NO_CACHE"
          cacheEnabled={false}
          incognito={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
