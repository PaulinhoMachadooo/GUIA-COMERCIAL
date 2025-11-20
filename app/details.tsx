import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  Pressable,
  Dimensions,
  Animated,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Chrome,
} from "lucide-react-native";
import { useRef, useState, useEffect } from "react";
import { categories } from "../data/index";
import React from "react";
import ImageGallery from "../components/ImageGallery";

const { width } = Dimensions.get("window");

// Default services for different business types
const getDefaultServices = (businessName) => {
  const name = businessName.toLowerCase();

  if (
    name.includes("restaurante") ||
    name.includes("lanchonete") ||
    name.includes("pizzaria")
  ) {
    return ["Delivery", "Balcão", "Mesas", "Wi-Fi", "Estacionamento"];
  } else if (name.includes("farmácia") || name.includes("drogaria")) {
    return ["24h", "Delivery", "Manipulação", "Convênios", "Perfumaria"];
  } else if (name.includes("posto") || name.includes("combustível")) {
    return ["Gasolina", "Álcool", "Diesel", "Conveniência", "Lavagem"];
  } else if (name.includes("pet") || name.includes("veterinária")) {
    return ["Banho", "Tosa", "Consultas", "Vacinas", "Ração"];
  } else if (name.includes("salão") || name.includes("beleza")) {
    return ["Corte", "Escova", "Manicure", "Pedicure", "Coloração"];
  } else if (name.includes("mercado") || name.includes("supermercado")) {
    return ["Açougue", "Padaria", "Hortifrúti", "Delivery", "Cartão"];
  } else if (name.includes("oficina") || name.includes("mecânica")) {
    return ["Revisão", "Freios", "Suspensão", "Elétrica", "Pneus"];
  } else {
    return ["Atendimento", "Qualidade", "Preço Justo", "Experiência"];
  }
};
export default function DetailsScreen() {
  const router = useRouter();
  const { id, categoryId } = useLocalSearchParams();
  const business = categories
    .flatMap((category) => category.businesses)
    .find((business) => business.id === id);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const autoPlay = true;
  const autoPlayInterval = 3000;

  useEffect(() => {
    if (!business) return;

    let interval;

    if (autoPlay) {
      interval = setInterval(() => {
        if (currentIndex === business.images.length - 1) {
          flatListRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
          setCurrentIndex(0);
        } else {
          flatListRef.current?.scrollToOffset({
            offset: (currentIndex + 1) * width,
            animated: true,
          });
          setCurrentIndex(currentIndex + 1);
        }
      }, autoPlayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, autoPlay, autoPlayInterval, business]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image
          source={{ uri: item }}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderDots = () => {
    if (!business) return null;

    return (
      <View style={styles.dotsContainer}>
        {business.images.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    );
  };

  const hasData = (data) => {
    return data !== undefined && data !== null && data !== "";
  };

  const renderSocialMediaIcon = (type, url) => {
    let icon;
    let color;

    switch (type) {
      case "instagram":
        icon = <Instagram size={35} color="#E1306C" />;
        break;
      case "facebook":
        icon = <Facebook size={35} color="#1877F2" />;
        break;
      case "whatsapp":
        icon = <MessageCircle size={35} color="#25D366" />;
        break;
      case "whatsapp2":
        icon = <MessageCircle size={35} color="#25D366" />;
        break;
      case "maps":
        icon = (
          <Image
            source={require("../assets/maps.png")}
            style={{ width: 35, height: 35 }}
          />
        );
        break;
      default:
        return null;
    }

    return (
      <Pressable
        key={type}
        style={[styles.socialIcon]}
        onPress={() => Linking.openURL(url)}
      >
        {icon}
      </Pressable>
    );
  };

  if (!business) {
    return (
      <View style={styles.container}>
        <Text>Estabelecimento não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {business.images && business.images.length > 0 && (
          <View style={styles.carouselContainer}>
            <Animated.FlatList
              ref={flatListRef}
              data={business.images}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              scrollEventThrottle={16}
            />
            {renderDots()}
          </View>
        )}

        <View style={styles.content}>
          {hasData(business.name) && (
            <Text style={styles.name}>{business.name}</Text>
          )}

          {business.socialMedia && business.socialMedia.length > 0 && (
            <View style={styles.socialMediaContainer}>
              <FlatList
                data={business.socialMedia}
                renderItem={({ item }) =>
                  renderSocialMediaIcon(item.type, item.url)
                }
                keyExtractor={(item) => item.type}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.socialMediaList}
              />
            </View>
          )}

          {hasData(business.description) && (
            <Text style={styles.description}>{business.description}</Text>
          )}

          {/* Services Section */}
          {(business.services || getDefaultServices(business.name)).length >
            0 && (
            <View style={styles.servicesSection}>
              <Text style={styles.servicesTitle}>Serviços Oferecidos</Text>
              <View style={styles.servicesContainer}>
                {(business.services || getDefaultServices(business.name)).map(
                  (service, index) => (
                    <View key={index} style={styles.serviceBadge}>
                      <Text style={styles.serviceText}>{service}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          )}
          <View style={styles.infoSection}>
            {hasData(business.phone) && (
              <View style={styles.infoItem}>
                <Phone size={30} color="#0891b2" />
                <Text
                  style={[styles.infoPhoneText, styles.link]}
                  onPress={() => Linking.openURL(`tel:${business.phone}`)}
                >
                  {business.tel}
                </Text>
              </View>
            )}

            {hasData(business.phone2) && (
              <View style={styles.infoItem}>
                <Phone size={30} color="#0891b2" />
                <Text
                  style={[styles.infoPhoneText, styles.link]}
                  onPress={() => Linking.openURL(`tel2:${business.phone2}`)}
                >
                  {business.tel2}
                </Text>
              </View>
            )}

            {hasData(business.address) && (
              <View style={styles.infoItem}>
                <MapPin size={20} color="#0891b2" />
                <Text style={styles.infoText}>{business.address}</Text>
              </View>
            )}

            {hasData(business.email) && (
              <View style={styles.infoItem}>
                <Mail size={20} color="#0891b2" />
                <Text
                  style={[styles.infoText, styles.link]}
                  onPress={() => Linking.openURL(`mailto:${business.email}`)}
                >
                  {business.email}
                </Text>
              </View>
            )}

            {hasData(business.hours) && (
              <View style={styles.infoItem}>
                <Clock size={20} color="#0891b2" />
                <Text style={styles.infoText}>{business.hours}</Text>
              </View>
            )}
          </View>

          {/* Gallery Section */}
          {business.gallery && business.gallery.length > 0 && (
            <View style={styles.gallerySection}>
              <ImageGallery
                images={business.gallery}
                title="Galeria de Fotos"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    marginBottom: 50, //VERSÃO 54 ESPAÇO TAB BAR
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    marginTop: 15,
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a",
  },
  scrollContainer: {
    flex: 1,
  },
  carouselContainer: {
    height: 400,
  },
  carouselItem: {
    width,
    height: 380,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: width,
    height: 380,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#112342",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    color: "#112342",
    marginBottom: 4,
    textAlign: "center",
  },
  category: {
    fontSize: 16,
    color: "#0891b2",
    marginBottom: 8,
  },
  socialMediaContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  socialMediaList: {
    paddingVertical: 8,
  },
  socialIcon: {
    width: 60,
    height: 60,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  infoSection: {
    width: "auto",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#334155",
    flex: 1,
  },
  infoPhoneText: {
    fontSize: 25,
  },
  link: {
    color: "#0891b2",
  },
  servicesSection: {
    marginBottom: 24,
  },
  servicesTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#112342",
    marginBottom: 12,
    textAlign: "center",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  serviceBadge: {
    backgroundColor: "#ff5e00",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  gallerySection: {
    marginTop: 16,
  },
});
