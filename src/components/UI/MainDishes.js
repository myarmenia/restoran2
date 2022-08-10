import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {useState} from 'react';
import MainButton from '../../components/UI/buttons/MainButton';
import LikeComponent from '../../components/UI/LikeComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  MenusByMenuID,
  Preferences,
} from '../../store/reducers/restaurant/action';
import {addDish} from '../../store/reducers/restaurant/slice';
import AddedCartModal from './AddedCartModal';

const MainDishes = ({navigation, restId, setLoading}) => {
  const [openModal, setOpenModal] = useState('');
  const [choosed, setChoosed] = useState([]);
  const {menu, preference} = useSelector(({restaurant}) => restaurant);
  const dispatch = useDispatch();
  useEffect(() => {
    const newVal = preference?.map(el => el?.id);
    setChoosed(newVal);
  }, [preference]);
  const goToNextPage = async id => {
    setLoading(true);
    await dispatch(MenusByMenuID(id));
    await setLoading(false);
    navigation.navigate('NameDishScreen', {
      restId: restId,
    });
  };

  return (
    <View style={styles.container}>
      {openModal ? (
        <AddedCartModal dishName={openModal} setOpenModal={setOpenModal} />
      ) : (
        <></>
      )}
      <FlatList
        data={menu}
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
                      source={
                        item?.img ||
                        require('../../assets/img/home/dishes/1.png')
                      }
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
                      <Text style={styles.name}>{item?.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        setLoading(true);
                        setChoosed(prev => {
                          const arr = prev;
                          if (!arr.includes(item?.id)) {
                            arr.push(item?.id);
                          } else {
                            return arr.filter(el => el !== item?.id);
                          }
                          return arr;
                        });
                        await dispatch(Preferences({id: item?.id}));
                        await setLoading(false);
                      }}>
                      <LikeComponent choosed={choosed.includes(item?.id)} />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.categories}>{item?.desc}</Text>
                  {item.isMenuSelected ? null : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => goToNextPage(item?.id)}
                        style={styles.opacity}>
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
                      <MainButton
                        fontSize={17}
                        textBtn={`+ ${item?.price} руб`}
                        vertical={5}
                        horizontal={10}
                        goTo={async () => {
                          setLoading(true);
                          await dispatch(
                            addDish([
                              restId,
                              item?.id,
                              {
                                id: item?.id,
                                count: 1,
                                comment: '',
                              },
                              {
                                name: item?.name,
                                desc: item?.desc,
                                price: item?.price,
                              },
                            ]),
                          );
                          await setLoading(false);
                          setOpenModal(item?.name);
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.line} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: '#000000',
    // flexDirection: 'row',
    marginTop: 8,
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
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
    marginTop: 8,
  },
});

export default MainDishes;
