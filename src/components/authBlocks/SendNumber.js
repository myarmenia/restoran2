import React, { memo, useState } from 'react'
import {Text, View, StyleSheet, TextInput} from 'react-native'
import { mainStyles } from '../../globalStyles/mainStyles';
import MainButton from '../UI/buttons/MainButton';
 
const SendNumber = ({setShowSendCode}) => {
 
const [value, setValue] = useState('')
 
return (
<View>
<Text>Ваш номер телефона</Text>
<TextInput
value={value}
textContentType='telephoneNumber'
dataDetectorTypes='phoneNumber'
keyboardType='phone-pad'
autoCompleteType='cc-number'
placeholder ="+7 XXX XXXX XXX"
placeholderTextColor={'#5F6368'}
onChangeText={(text)=> {
let x = text.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
let num = !x[2] ? x[1] : '+ (' + x[1] + ') ' + x[2] + (x[3]? '-' + x[3]:x[3]) + (x[4] ? '-' + x[4] : '');
setValue(num) 
}}/>
<Text>Отправим на этот номер код подтверждения</Text>
<MainButton action={() => setShowSendCode(true)} textBtn={'Получить SMS с кодом'} /> 
</View>
)
}
 
const styles = StyleSheet.create({
 
});
 
export default memo(SendNumber)