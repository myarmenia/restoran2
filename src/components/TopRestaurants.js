import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import MarkSvg from '../assets/svg/homeScreen/MarkSvg';

const TopRestaurants = ({state, navigation}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={state}
      keyExtractor={(item, index) => index.toString()}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      renderItem={({item}) => (
        <View style={styles.container}>
          <TouchableOpacity style={styles.mark}>
            <MarkSvg choosed={item.choosed} />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={goToTitleBlock}
            style={styles.subContainer}
            activeOpacity={0.7}>
            <Image style={styles.img} resizeMode="cover" source={item.img} />
            <Text style={styles.name}>Название рест.</Text>
            <Text style={styles.categorie}>Категория</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202124',
    paddingHorizontal: 5,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 0.5,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginBottom: 10,
    borderRadius: 50,
    width: 90,
    height: 125,
  },
  mark: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  categories: {
    fontSize: 14,
    color: '#5F6368',
  },
});

export default TopRestaurants;
