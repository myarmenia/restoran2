import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import MarkSvg from '../assets/svg/homeScreen/MarkSvg';
import {FavoritesData} from '../components/UI/FavoritesData';
import MoreSvg from '../assets/svg/MoreSvg';

const Favorites = ({state}) => {
  return (
    <FlatList
      data={FavoritesData}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      renderItem={({item}) => (
        <View style={styles.container}>
          <TouchableOpacity style={styles.mark}>
            <MarkSvg />
          </TouchableOpacity>

          <View style={styles.subContainer} activeOpacity={0.7}>
            <Image style={styles.img} resizeMode="cover" source={item.img} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.categories}>{item.bookDate}</Text>
            <Text style={styles.categories}>{item.isMenuSelected}</Text>
          </View>
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
    width: 100,
    height: 100,
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

export default Favorites;
