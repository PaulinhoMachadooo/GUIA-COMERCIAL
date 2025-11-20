import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Category } from "../types/category";
import { router } from "expo-router";
import React from "react";

type Props = {
  data: Category;
};
export const CategoryItem = ({ data }: Props) => {
  const handleClick = () => {
    router.push(`/categories/${data.id}`);
  };

  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <View>
        <Text style={styles.title}>{data.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: "#112342",
    borderRadius: 10,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 70,
    borderRadius: 10,
  },

  title: {
    fontSize: 24,
    color: "#FFFFFF",
  },
});
