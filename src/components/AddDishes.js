import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useState } from "react";
import { initialState2 } from "../components/UI/DishData";
import MoreSvg from "../assets/svg/MoreSvg";
import MainButton from "../components/UI/buttons/MainButton";
import CallSvg from '../assets/svg/callSvg/CallSvg'



const AddDishes = ({ state }) => {
  const [someState, setSomeState] = useState(initialState2);
  return (
    <View>
<FlatList
      data={initialState2}

      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View>
        <View style={styles.container}>
          <View style={styles.subContainer} activeOpacity={0.7}>
            <View style={{ flex: 2, marginRight: 15 }}>
              <Image style={styles.img} resizeMode="cover" source={item.img} />
            </View>
            <View style={{ flex: 7 }}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.categories}>{item.dishes}</Text>
              {item.isMenuSelected ? null : (
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom:5}}>
                  <TouchableOpacity style={styles.opacity}>
                    <Text style={{ color: "#FFFFFF", marginRight: 5 }}>
                      Подробнее
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                        marginRight:60
                      }}
                    >
                      <MoreSvg />
                      <MoreSvg />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MainButton textBtn={"+ 1000 руб."} vertical={2}/>
                  </TouchableOpacity>
                </View>
              )}
              
            </View> 
          </View>
         
          
        </View>
        <View style={styles.line}></View> 
      
       </View>
      )}
    />
     <Text style={{color:'#5F6368', fontSize:18, textAlign:'center',marginTop:60}}>
        К оплате 4 000 рублей. Оплатить на месте.
        </Text>

        <View style={{flexDirection:'row', marginTop:25}}>
              <View style={{flex:1}}>

              </View>
              <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
                <Text style={{fontSize:12, color:'#5F6368', marginRight:15}}>
                  Для обратной связи. 
                </Text>
                <CallSvg/>
              </View>
        </View>
<View style={{marginTop:20, marginHorizontal:10}}>
    <MainButton textBtn={'Добавить меню к бронированию'}/>
</View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000000",
    flexDirection: "row",
    marginTop:8, 
  },

  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  img: {
    marginBottom: 10,
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  name: {
    color: "#fff",
    fontSize: 17,
    marginBottom: 5,
  },
  categories: {
    fontSize: 9,
    color: "#5F6368",
  },
  opacity: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom:5
  },
  line:{
    backgroundColor:'#17181B', 
    width:'100%',
     height:1.5, 
     marginBottom:3
}
});

export default AddDishes;
