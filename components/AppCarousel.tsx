import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import React from "react";

export default function AppCarousel(): React.JSX.Element {
  const [pagingEnabled, setPagingEnabled] = useState(true);
  const width = Dimensions.get("window").width;

  const list = [
    {
      id: 1,
      title: "San Marino",
    },
    {
      id: 2,
      title: "Fran Pet",
    },
    {
      id: 3,
      title: "Publi+",
    },
    {
      id: 4,
      title: "Casa Vasconcelos+",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        width={width}
        height={width / 2}
        data={list}
        autoPlay={true}
        pagingEnabled={pagingEnabled}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <View style={styles.CarouselItem}>
            <Image style={styles.img} source={item.image} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  CarouselItem: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  },
  img: {
    width: "85%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#CFCFCF",
    backgroundColor: "#d3d3d3",
  },
});
