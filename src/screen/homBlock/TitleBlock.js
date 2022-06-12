import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import MapMarkerSvg from "../../assets/svg/homeScreen/MapMarkerSvg";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import SearchHeader from "../../components/headers/SearchHeader";



const TitleBlock = ({ item }) => {
  const { restaurants } = useSelector((state) => state.home);
  return (
    <View>
      <LinearGradient colors={["black", "black"]}>
        <SearchHeader placeholder={"Поиск"} />
        {/* <View style={{ padding: 5 }}>
        <Image source={item.img}/>
      </View>
       */}
      
      
        <View style={{ padding: 5 }}>
          <Text style={{ marginBottom: 10 }}>Название рест.</Text>
          <Text style={styles.categories}>Категория</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <View style={{ paddingTop: 5 }}>
              <MapMarkerSvg />
            </View>
            <View style={{ alignSelf: "baseline" }}>
              <Text style={styles.address}>
                Тверской бульвар, 10с1, Москва 103009 Россия
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={{ color: "#FFFFFF", fontSize: 16, marginTop: 20 }}>
            Выбрать посадочное место
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  categories: {
    fontSize: 20,
    color: "#5F6368",
  },
  address: {
    fontSize: 16,
    color: "#5F6368",
    paddingLeft: 3,
    flexShrink: 1,
  },
});

export default TitleBlock;
