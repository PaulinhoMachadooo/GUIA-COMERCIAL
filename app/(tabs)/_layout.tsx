import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "HOME",
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          headerShown: false,
          title: "CATEGORIAS",
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerShown: false,
          title: "SOBRE",
        }}
      />
    </Tabs>
  );
};
/*

            
            */

export default _layout;
