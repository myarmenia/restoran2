import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Restaurants} from '../../store/reducers/restaurant/action';
import {useDispatch} from 'react-redux';
import SimpleHeader from '../../components/headers/SimpleHeader';

const SearchScreen = ({route}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <SimpleHeader title={'Результат поиска'} />
      {route.params.data.length === 0 && (
        <View style={styles.searchListItem}>
          <Text style={styles.searchListItemText}>Ничего не найдено</Text>
        </View>
      )}
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        {route.params.data.map((elem, index) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                await dispatch(Restaurants(elem?.id));
                route.params.navigation.navigate('RestTitle');
              }}
              key={index}
              style={styles.searchListItem}>
              <Text style={styles.searchListItemText}>{elem?.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
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
    padding: 20,
    backgroundColor: '#000',
    minHeight: Dimensions.get('screen').height,
    height: '100%',
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

export default SearchScreen;
