import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import VirtualizedView from "../../utils/VirtualizedView";
import SearchHeader from '../../components/headers/SearchHeader';


const SearchScreen = () => {
  return (
    <View>
      <LinearGradient colors={["black", "black"]}>
        {/*<VirtualizedView>*/}
       <SearchHeader/>

        {/*</VirtualizedView>*/}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    fontSize: 22,
    color: "#FFFFFF",
    marginBottom: 35,
    marginLeft: 40,
  },


});

export default SearchScreen;
