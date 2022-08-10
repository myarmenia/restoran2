import React, {memo, useState} from 'react';
import {View, TextInput, StyleSheet, Dimensions, Platform} from 'react-native';
import SearchBtn from '../../assets/svg/header/SearchBtn';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SearchHeader = ({
  setSearchTerm,
  searchTerm,
  setTextInputFocussed,
  addAbsolute,
  navigation,
  temporarySearchResults = [],
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginHorizontal: !addAbsolute
            ? 0.05 * Dimensions.get('window').width
            : 0,
        },
      ]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Поиск"
          placeholderTextColor={'#5F6368'}
          onFocus={() => {
            setTextInputFocussed
              ? setTextInputFocussed(true)
              : console.log('no');
          }}
          onChangeText={e => {
            setSearchTerm(e);
          }}
          returnKeyType={'search'}
          onSubmitEditing={function (e) {
            navigation.navigate('SearchScreen', {
              data: temporarySearchResults,
              navigation: navigation,
            });
            setSearchTerm('');
          }}
          value={searchTerm}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchScreen', {
              data: temporarySearchResults,
              navigation: navigation,
            });
            setSearchTerm('');
          }}
          style={styles.search}>
          <SearchBtn />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    // backgroundColor: '#000000',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    paddingHorizontal: 18,
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: 18,
    color: '#fff',
    height: 50,
    lineHeight: 23,
    justifyContent: 'flex-start',
    paddingVertical: 4,
    width: 0.75 * Dimensions.get('screen').width,
  },
  // search: {
  //   height: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  clear: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    padding: 4,
    borderRadius: 15,
    elevation: 3,
  },
  placeholderStyle: {
    fontSize: 13,
    textAlign: 'center',
  },
});

export default memo(SearchHeader);
