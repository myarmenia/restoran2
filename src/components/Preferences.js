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
import {PreferencesData} from "./UI/PreferencesData";
import MoreSvg from '../assets/svg/MoreSvg';

const Preferences = ({state}) => {
  return (
    <FlatList
      data={PreferencesData}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      renderItem={({item}) => (
        <View style={styles.container}>
          <View style={styles.subContainer} activeOpacity={0.7}>
            <Image style={styles.img} resizeMode="cover" source={item.img} />
            <Text style={styles.name}>{item.title}</Text>
          </View>
          <Text style={styles.text1}>{item.text}</Text>
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
  name: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  categories: {
    fontSize: 14,
    color: '#5F6368',
  },
  text1: {
    fontSize: 12,
    color: '#5F6368',
    textAlign: 'center',
  },
});

export default Preferences;
