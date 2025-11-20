import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";
import type { Props } from "./Props";

export function ProductItem({ data }: Props): React.JSX.Element {
  return (
    <Link href={`/product/${data.id}`} asChild>
      <Pressable style={styles.container}>
        {/*<Image style={styles.img} source={{ uri: data.image }} /> */}
        <View style={styles.info}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#CCCCCC",
    marginRight: 20,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
  },
  description: {
    fontSize: 13,
    color: "#555555",
    marginBottom: 10,
  },
});
