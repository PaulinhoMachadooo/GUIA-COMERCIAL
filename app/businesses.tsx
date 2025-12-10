import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { categories } from "../data/index";
import React from "react";

export default function BusinessesScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams();
  const [webViewBusiness, setWebViewBusiness] = React.useState<any>(null);

  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Categoria não encontrada</Text>
      </View>
    );
  }

  if (webViewBusiness) {
    return (
      <View style={styles.container}>
        <View style={styles.webViewHeader}>
          <TouchableOpacity
            onPress={() => setWebViewBusiness(null)}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          {/*<Text style={styles.webViewTitle}>{webViewBusiness.name}</Text>*/}
        </View>
        <WebView
          source={{ uri: webViewBusiness.externalUrl }}
          style={styles.webView}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </View>
    );
  }

  const renderBusiness = ({ item }) => (
    <View style={{ flex: 1 }}>
      {item.isSimpleAd ? (
        <View style={styles.simpleAdCard}>
          <View style={styles.simpleAdContent}>
            <Text style={styles.simpleAdName}>{item.name}</Text>
            <Text style={styles.simpleAdPhone}>{item.tel}</Text>
            <Text style={styles.simpleAdAddress}>{item.address}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.businessItem}
          onPress={() => {
            if (item.externalUrl) {
              setWebViewBusiness(item);
            } else {
              router.push({
                pathname: "/details",
                params: { id: item.id, categoryId: categoryId },
              });
            }
          }}
        >
          <View
            style={{
              padding: 10,
              marginBottom: 7,
              marginTop: 7,
              borderRightColor: "#e2e8f0",
              borderRightWidth: 1,
            }}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={styles.businessImage}
            />
          </View>
          <View style={styles.businessInfo}>
            <Text style={styles.businessName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/categories")}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.categoryTitle}>{category.name}</Text>
      </View>
      <FlatList
        data={category.businesses}
        renderItem={renderBusiness}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    width: "auto",
    marginBottom: 50, //VERSÃO 54 ESPAÇO TAB BAR
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
    marginTop: 20,
  },
  categoryTitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "600",
    color: "#64748b",
  },
  listContainer: {
    padding: 16,
  },
  businessItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 4,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  businessImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  businessInfo: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    marginRight: 10,
  },
  businessName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#112342",
    marginBottom: 4,
    textAlign: "center",
  },
  businessCategory: {
    fontSize: 14,
    color: "#0891b2",
    marginBottom: 4,
  },
  businessAddress: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  ratingContainer: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  ratingText: {
    color: "#d97706",
    fontWeight: "600",
  },
  simpleAdItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#ff5e00",
  },
  simpleAdInfo: {
    gap: 4,
  },
  simpleAdName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#112342",
    marginBottom: 4,
  },
  simpleAdPhone: {
    fontSize: 14,
    color: "#0891b2",
    fontWeight: "500",
  },
  simpleAdAddress: {
    fontSize: 13,
    color: "#64748b",
  },
  simpleAdCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ff5e00",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  simpleAdContent: {
    gap: 4,
  },
  simpleAdName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  simpleAdPhone: {
    fontSize: 14,
    color: "#ff5e00",
    fontWeight: "600",
  },
  simpleAdAddress: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  webViewContainer: {
    flex: 1,
  },
  webViewHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  webViewTitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "600",
    color: "#64748b",
  },
  webView: {
    flex: 1,
  },
});
