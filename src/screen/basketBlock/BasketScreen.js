import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const BasketScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Basket</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 30,
    backgroundColor: "black",
  },
});

export default BasketScreen;
