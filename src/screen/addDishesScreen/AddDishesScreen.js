import React from "react";
import {Text, StyleSheet, View, Dimensions} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {useSelector} from "react-redux";
import AddSvg from '../../assets/svg/AddSvg';
import AddDishes from '../../components/AddDishes';
import VirtualizedView from "../../utils/VirtualizedView";


const AddDishesScreen = () => {
    const {restaurants} = useSelector((state) => state.restaurant);

    return (
        <View style={styles.container}>
            <VirtualizedView>
                <View style={styles.header}>
                    <Text style={styles.text}>
                        Бронь в “Название рест.” в ДД.ММ, 17:30
                    </Text>
                </View>
                <View style={styles.line}/>
                <View style={[styles.add, {justifyContent: 'flex-end'}]}>
                    <Text style={[styles.text, {marginRight: 20}]}>
                        Добавить Блюда
                    </Text>
                    <AddSvg/>
                </View>
                <View style={styles.line}/>
                <AddDishes/>
            </VirtualizedView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        minHeight: Dimensions.get('screen').height,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 17
    },
    line: {
        backgroundColor: '#17181B',
        width: '100%', height: 1.5,
        marginBottom: 8
    },

    header: {
        height: 70,
        paddingHorizontal: 30,
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#17181B',
    },
    add: {
        height: 50,
        paddingHorizontal: 30,
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#17181B',
        marginBottom: 5
    }


});

export default AddDishesScreen;



