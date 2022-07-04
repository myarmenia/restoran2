import React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import TopRestaurants from "../../components/TopRestaurants";
import VirtualizedView from "../../utils/VirtualizedView";
import SimpleHeader from '../../components/headers/SimpleHeader';
import Favorites from "../../components/Favorites";
import { useSelector } from "react-redux";

const FavoritesScreen = () => {
  const { restaurants } = useSelector((state) => state.home);

  return (
    <View style={styles.container}>
        <VirtualizedView>
            <SimpleHeader title={'Актуальные брони'}/>
            <Favorites state={restaurants}/>
        </VirtualizedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#000000",
    minHeight: Dimensions.get('window').height,
  },
  text: {
    marginTop: 30,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
    marginLeft: 10,
  },


});

export default FavoritesScreen;
