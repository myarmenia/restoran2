import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import LoveCheckComponent from './LoveCheckComponent';
import {PreferencesData} from './PreferencesData';
import { useState } from 'react'


const Preferences = (index) => {
  const [productsArray, setProductsArray] = useState(PreferencesData); 

  const clickMe = (index) => {
     setProductsArray(products => products.filter((_, ind) => ind !== index));
  };



  return (
    <View>
    <FlatList
      // data={PreferencesData}
      data={productsArray}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      renderItem={({item, index}) => (
        <View style={styles.container}>
        <TouchableOpacity style={{paddingLeft:115, marginTop:5}} onPress={() => clickMe(index)}> 
            <LoveCheckComponent/>
        </TouchableOpacity>
          <View style={styles.subContainer} activeOpacity={0.7}>
            <Image style={styles.img} resizeMode="cover" source={item.img} />
            <Text style={styles.name}>{item.title}</Text>
          </View>
          <Text style={styles.text1}>{item.text}</Text>
          <Text style={{color:'#FFFFFF', fontSize:12}}>
            Название рест.
          </Text>
        </View>
      )}
    />
    </View>
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



