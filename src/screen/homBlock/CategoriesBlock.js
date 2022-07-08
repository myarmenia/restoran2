import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  LogBox,
} from 'react-native';
import {useSelector} from 'react-redux';

const CategoriesBlock = ({navigation, item, update}) => {
  const {categories} = useSelector(state => state.home);
  const {restaurants} = useSelector(state => state.restaurant);

  return (
    <View style={{marginLeft: 10}}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              update(() =>
                restaurants.filter(el => el?.desc === item.category),
              );
            }}
            key={index}
            style={styles.btn}>
            <Image source={item.img} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#202124',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    width: 50,
    height: 50,
    borderRadius: 80,
  },
});

export default CategoriesBlock;
