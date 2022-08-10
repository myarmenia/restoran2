import React, {useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';

const titleDef = 'Топ Ресторанов';

const CategoriesBlock = ({update, setTitle}) => {
  const {restaurants, kitchen} = useSelector(state => state.restaurant);
  const [filteredItem, setFilteredItem] = useState(-1);

  return (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={kitchen}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              if (index !== filteredItem) {
                setFilteredItem(index);
                update(() =>
                  restaurants.filter(el =>
                    el?.kitchen_categories?.reduce((last, next) => {
                      if (next?.name === item.name) {
                        return true;
                      } else {
                        return last;
                      }
                    }, false),
                  ),
                );
                setTitle(item.name);
              } else {
                setFilteredItem(-1);
                update(() => restaurants);
                setTitle(titleDef);
              }
            }}
            key={index}
            style={[
              styles.btn,
              filteredItem !== index && filteredItem !== -1
                ? {opacity: 0.5}
                : {opacity: 1},
            ]}>
            <Text style={{color: 'white'}}>{item.name}</Text>
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
    marginRight: 10,
    padding: 10,
    borderRadius: 80,
  },
  childOverlay: {
    borderRadius: 80,
    backgroundColor: 'black',
    opacity: 0.6,
    padding: 10,
    position: 'absolute',
  },
});

export default CategoriesBlock;
