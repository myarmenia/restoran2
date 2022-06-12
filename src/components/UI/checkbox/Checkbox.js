import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Checkbox } from 'react-native-paper';



const MyComponent = ({text}) => {
const [checked, setChecked] = React.useState(false);


   return (
      <SafeAreaView style={styles.container}>
         <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
               setChecked(!checked);
            }}
            rightText={text || "Я согласен(а)"}
            color={'#5F6368'}
            uncheckedColor={'#5F6368'}
         />
      <Text style={{color:'#5F6368', fontSize:16}}>{text}</Text>
      </SafeAreaView>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection:'row',
      alignItems: 'center',
      marginLeft:80
   },
});
export default MyComponent;