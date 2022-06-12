import React, { useState } from 'react';
import { View, Text, Button,TouchableOpacity } from 'react-native';
import MainButton from '../../UI/buttons/MainButton'



const Counter = () => {
    const [count, setCount] = useState(0);
   return (

    <View style={{flexDirection:'row', alignItems:'center', marginBottom:50,  width:'30%'}}>
            <View>
                <MainButton action={() => {setCount(count + 1)}} textBtn={"+"}
                width={60} horizontal={20} background={'red'}/>  
            </View>
              
           <View style={{width:30, height:40, backgroundColor:'silver'}}>

           </View>
          
          <View>
                <MainButton action={() => {setCount(count - 1)}} textBtn={"-"}
                width={60} horizontal={20} background={'red'}/>          
          </View>
                  
    </View>
    
        
      

        
   );
}
export default Counter;