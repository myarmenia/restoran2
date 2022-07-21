import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {useState} from 'react';
import {initialState2} from './UI/DishData';
import MainButton from '../components/UI/buttons/MainButton';
import CallSvg from '../assets/svg/callSvg/CallSvg';
import DeleteSvg from '../assets/svg/DeleteSvg';
import LikeComponent from '../components/UI/LikeComponent';
import DeleteModal from '../components/UI/DeleteModal';
import {useDispatch} from 'react-redux';
import {changeMenu} from '../store/reducers/restaurant/slice';

const AddDishes = (menu, menuDesc) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [productsArray, setProductsArray] = useState(menu);

  useEffect(() => {
    setProductsArray(menu);
  }, [menu]);

  useEffect(() => {
    dispatch(changeMenu(productsArray));
  }, [productsArray]);

  return (
    <View>
      <View>
        {openModal && (
          <DeleteModal
            productsArray={productsArray}
            setProductsArray={setProductsArray}
            index={index}
            setOpenModal={setOpenModal}
          />
        )}
      </View>

      <FlatList
        data={productsArray}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        renderItem={({item, index}) => (
          <View>
            <View style={styles.container}>
              <View style={styles.subContainer} activeOpacity={0.7}>
                <View style={{flex: 2, marginRight: 15}}>
                  <TouchableOpacity>
                    <Image
                      style={styles.img}
                      resizeMode="cover"
                      source={item.img}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 7}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity>
                      <Text style={styles.name}>{menuDesc[index]?.name}</Text>
                    </TouchableOpacity>
                    <View>
                      <LikeComponent />
                    </View>
                  </View>

                  <Text style={styles.categories}>{menuDesc[index]?.desc}</Text>
                  {item.isMenuSelected ? null : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <TouchableOpacity style={styles.opacity}>
                        <Text style={{color: '#FFFFFF', marginRight: 5}}>
                          Подробнее
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 4,
                            marginRight: 60,
                          }}
                        />
                      </TouchableOpacity>

                      {/* <TouchableOpacity onPress={() => removeUser(index)}> */}
                      <TouchableOpacity
                        style={{marginLeft: 100}}
                        onPress={() => {
                          setIndex(+index);
                          setOpenModal(true);
                        }}>
                        <DeleteSvg />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.line} />
          </View>
        )}
      />
      {/* <View style={[styles.line, {marginTop: 10}]} /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: 30,
          marginTop: 15,
        }}>
        <Text style={{color: '#5F6368', fontSize: 14, marginRight: 10}}>
          Общее:
        </Text>
        <Text style={{color: '#5F6368', fontSize: 14}}>8 000 рублей</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: 30,
          marginTop: 10,
        }}>
        <Text style={{color: '#5F6368', fontSize: 14, marginRight: 10}}>
          Оплата за обслуживание Х%:{' '}
        </Text>
        <Text style={{color: '#5F6368', fontSize: 14}}>800 рублей</Text>
      </View>

      <View style={[styles.line, {marginTop: 15}]} />
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2}} />
        <Text style={{color: '#FFFFFF', fontSize: 20, flex: 3}}>
          К оплате 8 800 рублей
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <View style={{flex: 1}} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 12, color: '#5F6368', marginRight: 15}}>
            Для обратной связи.
          </Text>
          <CallSvg />
        </View>
      </View>
      <View style={{marginVertical: 20, marginHorizontal: 10, marginTop: 25}}>
        <MainButton textBtn={'Добавить меню к бронированию'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000000',
    flexDirection: 'row',
    marginTop: 8,
  },

  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  img: {
    marginBottom: 10,
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  name: {
    color: '#fff',
    fontSize: 17,
    marginBottom: 5,
  },
  categories: {
    fontSize: 11,
    color: '#5F6368',
  },
  opacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  line: {
    backgroundColor: '#17181B',
    width: '100%',
    height: 1.5,
    marginBottom: 3,
  },
});

export default AddDishes;
