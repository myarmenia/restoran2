import { Platform, StyleSheet, View, TextInput } from "react-native";

export default TextArea = ({ placeholder, horizontal }) => {
  return (
    <View style={styles.MainContainer}>
      <TextInput
        style={styles.TextInputStyleClass}
        underlineColorAndroid="transparent"
        placeholder={placeholder ? placeholder : "Email"}
        placeholderTextColor="#5F6368"
        numberOfLines={10}
        multiline={false}
        marginHorizontal={horizontal ? horizontal : 20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    justifyContent: "center",
    margin: 20,
  },

  TextInputStyleClass: {
    // textAlign: 'center',
    height: 50,
    borderColor: "#9E9E9E",
    borderRadius: 20,
    backgroundColor: "#202124",
    height: 250,
    fontSize: 18,
  },
});
