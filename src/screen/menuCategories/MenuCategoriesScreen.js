import React, {useState} from 'react';
import {
  Dimensions, Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import SimpleHeader from '../../components/headers/SimpleHeader';
import {Menu} from '../../store/reducers/restaurant/action';
import LoadingComponent from '../../components/loadingComponent';

const MenuCategoriesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {menus, restaurant} = useSelector(({restaurant}) => restaurant);
  const [loading, setLoading] = useState(false);

  useState(() => {
    setLoading(false);
    return () => setLoading(false);
  });

  return (
    <View
      style={{
        backgroundColor: '#000',
        minHeight: Dimensions.get('screen').height,
      }}>
      {loading ? <LoadingComponent /> : <></>}
      <SimpleHeader title={'Меню'} />
      <View style={{paddingHorizontal: 20}}>
        {(Array.isArray(menus) ? menus : Object.values(menus))?.map(
          (elem, index) => (
            <TouchableOpacity
              onPress={async () => {
                setLoading(true);
                await dispatch(Menu({id: restaurant?.id, catId: elem?.id}));
                await setLoading(false);
                navigation.navigate('MainDishesScreen', {
                  restId: restaurant?.id,
                });
              }}
              key={index}
              style={styles.searchListItem}>
              <Text style={styles.searchListItemText}>{elem?.name}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
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

export default MenuCategoriesScreen;
