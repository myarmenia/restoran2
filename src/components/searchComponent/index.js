import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import SearchHeader from '../headers/SearchHeader';
import React, {useMemo, useState} from 'react';
import {Restaurants} from '../../store/reducers/restaurant/action';
import {useDispatch} from 'react-redux';

const SearchComponent = ({data, navigation, addAbsolute}) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [textInputFocussed, setTextInputFocussed] = useState(false);
  const temporarySearchResults = useMemo(() => {
    const list = data.filter(item => {
      return item?.name.includes(searchTerm);
    });
    return list;
  }, [searchTerm]);

  const renderSearchList = () => {
    return (
      <View style={styles.searchList}>
        {temporarySearchResults.length === 0 && (
          <View style={styles.searchListItem}>
            <Text style={styles.searchListItemText}>No match found</Text>
          </View>
        )}
        {temporarySearchResults.map((elem, index) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                await dispatch(Restaurants(elem?.id));
                navigation.navigate('RestTitle');
              }}
              key={index}
              style={styles.searchListItem}>
              <Text style={styles.searchListItemText}>{elem?.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 10,
        left: 0,
        width: addAbsolute
          ? 0.9 * Dimensions.get('window').width
          : Dimensions.get('window').width,
        zIndex: 100,
        padding: 0,
      }}>
      <SearchHeader
        addAbsolute={addAbsolute}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setTextInputFocussed={setTextInputFocussed}
      />
      {textInputFocussed && (
        <ScrollView
          style={{
            position: 'absolute',
            backgroundColor: '#000000',
            top: Platform.OS === 'ios' ? 75 : 50,
            left: 0,
            zIndex: 100,
            width: Dimensions.get('window').width,
            maxHeight: 300,
          }}>
          {searchTerm.length > 0 && renderSearchList()}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  formField: {
    backgroundColor: '#F4F4F4',
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    fontSize: 18,
    height: 50,
  },
  searchList: {
    paddingLeft: 16,
  },
  searchListItem: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    paddingRight: 16,
    borderColor: '#DBDBDB',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchListItemText: {
    fontSize: 20,
    maxWidth: '85%',
    color: '#5F6368',
  },
});

export default SearchComponent;
