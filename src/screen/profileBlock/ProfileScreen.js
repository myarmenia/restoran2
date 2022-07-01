import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import ProfileSvg from "../../assets/svg/ProfileSvg";
import LinearGradient from "react-native-linear-gradient";
import EditSvg from "../../assets/svg/edit/EditSvg";
import { signOut } from "../../store/reducers/auth/slice";
import { useDispatch } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
        <View>
          <View style={{ flexDirection: "row", marginHorizontal: 40 }}>
            <View style={{ flex: 2 }}>
              <ProfileSvg />
            </View>
            <View style={{ flex: 4, marginTop: 8 }}>
              <Text style={{ fontSize: 18, color: "#FFFFFF", marginBottom: 8 }}>
                Имя Фамилия
              </Text>
              <Text style={{ fontSize: 12, color: "#FFFFFF" }}>
                Пол, возраст
              </Text>
            </View>
            <View style={{ flex: 0.5, marginTop: 8 }}>
              <EditSvg />
            </View>
          </View>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              marginTop: 25,
              marginLeft: 40,
            }}
          >
            +7 777 8888 999
          </Text>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              marginTop: 8,
              marginBottom: 30,
              marginLeft: 40,
            }}
          >
            example@gmail.com
          </Text>
        </View>
        <View
          style={{ backgroundColor: "#17181B", height: 1.5, marginTop: 40 }}
        ></View>
        <Text
          onPress={() => navigation.navigate("OrderHistory")}
          style={{
            color: "#5F6368",
            fontSize: 18,
            marginTop: 15,
            marginLeft: 40,
          }}
        >
          История заказов
        </Text>
        <View
          style={{ backgroundColor: "#17181B", height: 1.5, marginTop: 15 }}
        ></View>
        <Text
          style={{
            color: "#5F6368",
            fontSize: 18,
            marginTop: 15,
            marginLeft: 40,
          }}
        >
          Предпочтения
        </Text>
        <View
          style={{ backgroundColor: "#17181B", height: 1.5, marginTop: 15 }}
        ></View>
        <Text
          onPress={() => navigation.navigate("Favorites")}
          style={{
            color: "#5F6368",
            fontSize: 18,
            marginTop: 15,
            marginLeft: 40,
          }}
        >
          Избранные
        </Text>
        <View
          style={{ backgroundColor: "#17181B", height: 1.5, marginTop: 15 }}
        ></View>
        <Text
          onPress={() => navigation.navigate("FeedBack")}
          style={{
            color: "#5F6368",
            fontSize: 18,
            marginTop: 15,
            marginLeft: 40,
          }}
        >
          Обратная связь
        </Text>
        <View
          style={{ backgroundColor: "#17181B", height: 1.5, marginTop: 15 }}
        ></View>
        <View
          style={{ backgroundColor: "#17181B", height: 1.5, marginTop: 55 }}
        ></View>
        <TouchableOpacity onPress={() => dispatch(signOut())}>
          <Text
            style={{
              color: "#5F6368",
              fontSize: 18,
              marginTop: 15,
              marginLeft: 40,
              marginBottom: 80,
            }}
          >
            Выход
          </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#000000",
    minHeight: Dimensions.get('screen').height,
  },
});

export default ProfileScreen;
