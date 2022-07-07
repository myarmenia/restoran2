import React, {memo, useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import SearchBtn from '../../assets/svg/header/SearchBtn';

const SearchHeader = props => {
  const [value, setValue] = useState('');

  return (
    <View style={{...styles.container, ...props?.style}}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Поиск"
          placeholderTextColor={'#5F6368'}
          onChange={e => setValue(e.target.value)}
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
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 1000
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    borderRadius: 15,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: 18,
    color: '#fff',
    height: 50,
    lineHeight: 23,
    justifyContent: 'flex-start',
    paddingVertical: 4,
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
