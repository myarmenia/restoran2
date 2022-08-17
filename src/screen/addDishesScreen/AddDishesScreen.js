import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddSvg from '../../assets/svg/AddSvg';
import AddDishes from '../../components/AddDishes';
import {Menus} from '../../store/reducers/restaurant/action';
import LoadingComponent from '../../components/loadingComponent';
const AddDishesScreen = ({navigation}) => {
  const {yourOrder, reserveOrders, restaurants} = useSelector(
    state => state.restaurant,
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getRestName = id => {
    return restaurants.filter(el => el.id === id)[0].name;
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingComponent /> : <></>}
      <ScrollView>
        {Object.values(yourOrder).length ? (
          Object.values(yourOrder).map(elem => {
            console.log(elem);
            return (
              <>
                <View style={styles.header}>
                  <Text style={styles.text}>
                    Бронь в {getRestName(elem?.restaurant_id)} в{' '}
                    {elem?.coming_date} на {elem?.people_nums}{' '}
                    {elem?.people_nums >= 1 && elem?.people_nums <= 4
                      ? 'человекa'
                      : 'человек'}
                  </Text>
                </View>
                <View style={styles.line} />
                <View style={[styles.add, {justifyContent: 'flex-end'}]}>
                  <Text style={[styles.text, {marginRight: 15}]}>
                    Добавить Блюда
                  </Text>
                  <TouchableOpacity
                    onPress={async () => {
                      await dispatch(Menus(elem?.restaurant_id));
                      navigation.navigate('MenuCategoriesScreen');
                    }}>
                    <AddSvg />
                  </TouchableOpacity>
                </View>
                <View style={styles.line} />
                <AddDishes
                  data={elem}
                  restId={elem?.restaurant_id}
                  menu={elem?.menus}
                  menuDesc={reserveOrders[elem?.restaurant_id]}
                  navigation={navigation}
                  setLoading={setLoading}
                />
              </>
            );
          })
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: Dimensions.get('window').height - 170,
            }}>
            <Text style={{color: '#fff'}}>Корзина пуста</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  line: {
    backgroundColor: '#17181B',
    width: '100%',
    height: 1.5,
    marginBottom: 8,
  },

  header: {
    marginBottom: 20,
    paddingHorizontal: 30,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#17181B',
  },
  add: {
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#17181B',
    marginBottom: 5,
  },
});

export default AddDishesScreen;
