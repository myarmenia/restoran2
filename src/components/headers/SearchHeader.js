
import React, {memo, useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {useRoute} from "@react-navigation/native";
// import {useNavigation} from "@react-navigation/core";
import SearchBtn from '../../assets/svg/header/SearchBtn';


const SearchHeader = (props) => {
    const [value, setValue] = useState('')
    // let navigation = useNavigation();
    let dispatch = useDispatch();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder ="Поиск"
                placeholderTextColor={'#5F6368'}
                onChange={(e) => setValue(e.target.value)}
            />
            <TouchableOpacity style={styles.search}>
                <SearchBtn />
            </TouchableOpacity>
        </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      height: 50,
      paddingHorizontal: 10,
      backgroundColor: '#000000',
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        height: 50,
        borderRadius: 15,
        backgroundColor: '#202124',
        alignItems: "center",
        justifyContent: 'space-between',
        margin: 0,
        paddingHorizontal: 10,
    },
    input: {
        backgroundColor: "transparent",   
        fontSize: 18,
        color: '#fff',
        height: 50,
        lineHeight: 23,
        justifyContent: 'flex-start',
        paddingVertical: 4
    },
    search: {
        width: "10%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    clear: {
        alignItems:"center",
        justifyContent:"center",
      backgroundColor:"#eee",
        padding:4,
        borderRadius:15,
        elevation:3,
    },
    placeholderStyle:{
        fontSize:13,
        textAlign:"center"
    }
});

export default memo(SearchHeader);
