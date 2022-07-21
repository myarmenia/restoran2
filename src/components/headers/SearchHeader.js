import React, {memo, useState} from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import SearchBtn from '../../assets/svg/header/SearchBtn';

const SearchHeader = ({setSearchTerm, searchTerm, setTextInputFocussed}) => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
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
          value={searchTerm}
        />
        <TouchableOpacity style={styles.search}>
          <SearchBtn />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
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
  search: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
