import React from "react";
import { Text, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import VirtualizedView from "../../utils/VirtualizedView";
import SimpleHeader from '../../components/headers/SimpleHeader';
import { useSelector } from "react-redux";
import CustomInput from '../../components/UI/inputs/CustomInput'
import TextArea from '../../components/UI/textArea/TextArea'
import MainButton from '../../components/UI/buttons/MainButton'





const FeedBackScreen = () => {
  const { restaurants } = useSelector((state) => state.home);

  return (
    <View>
      <LinearGradient colors={["black", "black"]}>
        {/*<VirtualizedView>*/}
       <SimpleHeader title={'История заказов'}/>
          <Text style={styles.text}>Свяжитесь с нами, если есть проблема</Text>
          <View style={{marginBottom:-12}}>
            <CustomInput placeholder={'Тема'}/>
          </View>
          <TextArea placeholder={'Сообщение'}/>
          <View style={{marginTop:30, marginBottom:150}}>
              <MainButton textBtn={'Отправить'}/>
          </View>
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

export default FeedBackScreen;
