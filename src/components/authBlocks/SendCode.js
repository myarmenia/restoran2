import React, {memo, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import MainButton from '../UI/buttons/MainButton';

const SendCode = () => {
    const [value, setValue] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Введите код подтверждения</Text>
            <TextInput
                style={styles.input}
                value={value}
                textContentType="telephoneNumber"
                dataDetectorTypes="phoneNumber"
                keyboardType="phone-pad"
                autoCompleteType="cc-number"
                placeholder="код из SMS"
                placeholderTextColor={'#5F6368'}
                maxLength={4}
                onChangeText={text => {
                    setValue(text);
                }}
            />
            <Text style={styles.sendText}>
                на номер +7 XXX XXXX XXX отправлен код подтверждения
            </Text>
            <MainButton textBtn={'Войти'}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        minHeight: Dimensions.get('screen').height,
        paddingHorizontal: 46
    },
    input: {
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        fontSize: 18,
        paddingLeft: 30,
        backgroundColor: "#202124",
        color: "white",
    },
    title: {
        color: "#ffffff",
        fontSize: 16,
        lineHeight: 19,
        paddingTop: 40
    },
    sendText: {
        color: "#5F6368",
        fontSize: 12,
        lineHeight: 14,
        paddingBottom: 35
    }
});

export default memo(SendCode);
