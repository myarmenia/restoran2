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
  const [filteredItem, setFilteredItem] = useState(-1);

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
              if (index !== filteredItem) {
                setFilteredItem(index);
                update(() =>
                  restaurants.filter(el => el?.desc === item.category),
                );
              } else {
                setFilteredItem(-1);
                update(() => restaurants);
              }
            }}
            key={index}
            style={styles.btn}>
            <Image source={item.img} />
            {filteredItem !== index && filteredItem !== -1 && (
              <View style={styles.childOverlay} />
            )}
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
  childOverlay: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 0.6,
    position: 'absolute',
  },
});

export default CategoriesBlock;
