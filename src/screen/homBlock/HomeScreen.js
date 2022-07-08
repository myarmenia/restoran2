import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CategoriesBlock from "../../screen/homBlock/CategoriesBlock";
import TopRestaurants from "../../components/TopRestaurants";
import SearchHeader from "../../components/headers/SearchHeader";
import { Restaurant } from "../../store/reducers/restaurant/action";

const HomeScreen = ({ navigation }) => {
  const { restaurants } = useSelector((state) => state.restaurant);
  const [rest, setRest] = useState(restaurants);

  const dispatch = useDispatch();
  const goToRestaurantPage = (item) => {
    navigation.navigate("ChooseTable", {
      item,
    });
  };

  useEffect(() => {
    console.log("rest", restaurants);
    setRest(restaurants);
  }, [restaurants]);

  useEffect(() => {
    dispatch(Restaurant());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80 }}>
        <SearchHeader />
        <Text style={styles.text}>Категории</Text>
        <CategoriesBlock navigation={navigation} update={setRest} />
        <Text style={styles.text}>Топ рестораны</Text>
        <TopRestaurants state={rest} />
        <TopRestaurants state={rest} />
        <TopRestaurants state={rest} />
        <TopRestaurants state={rest} />
        <TopRestaurants state={rest} />
        <TopRestaurants state={rest} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    minHeight: Dimensions.get("screen").height,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 10,
    marginLeft: 20,
  },
});

export default HomeScreen;
