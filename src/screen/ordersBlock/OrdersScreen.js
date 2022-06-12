import { Text, StyleSheet, View } from "react-native";

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Order</Text>
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

export default OrdersScreen;
