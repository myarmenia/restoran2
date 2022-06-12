import React from "react";
import { Text, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import AddSvg from '../../assets/svg/AddSvg';
 import AddDishes from '../../components/AddDishes';
 import VirtualizedView from "../../utils/VirtualizedView";
 



const AddDishesScreen = () => {
  const { restaurants } = useSelector((state) => state.home);

  return (
    <View>
      <LinearGradient colors={["black", "black"]}> 
      <VirtualizedView>
        <View style={styles.header}>
            <Text style={styles.text}>
                Бронь в “Название рест.” в ДД.ММ, 17:30
            </Text>
        </View>
        <View style={styles.line}></View>
    <View style={[styles.add, {justifyContent:'flex-end'}]}>
            <Text style={[styles.text, {marginRight:20}]}>
                Добавить Блюда
            </Text>
            <AddSvg/>
    </View>
        <View style={styles.line}></View> 
            <AddDishes/>

            <View style={{ backgroundColor:'#000000', height:200}}>
            <Text stytle={{color:'#5F6368', fontSize:18,textAlign:'center', color:'white'}}>
                 К оплате 4 000 рублей. Оплатить на месте.
            </Text>
      </View>
      </VirtualizedView>

      </LinearGradient>
  
  
      
      
    </View>
  );
};

const styles = StyleSheet.create({
    text:{
        color:'#FFFFFF',
         fontSize:17
    },
    line:{
        backgroundColor:'#17181B', 
        width:'100%', height:1.5,
        marginBottom:8
    },

header: {
    height: 70,
    paddingHorizontal: 30,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems:'center',
    borderBottomColor: '#17181B',
  },
  add:{
    height: 50,
    paddingHorizontal: 30,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems:'center',
    borderBottomColor: '#17181B',
    marginBottom:5
  }

 
 
});

export default AddDishesScreen;



