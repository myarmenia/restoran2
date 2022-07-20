import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {useState} from 'react';
import {initialState2} from '../../components/UI/DishData';
import MainButton from '../../components/UI/buttons/MainButton';
import DeleteSvg from '../../assets/svg/DeleteSvg';
import LikeComponent from '../../components/UI/LikeComponent';

const MainDishes = ({navigation}) => {
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [productsArray, setProductsArray] = useState(initialState2);

  const goToNextPage = () => {
    navigation.navigate('NameDishScreen')
  }

  return (
    <View>
      <FlatList
        data={productsArray}
        // data={initialState2}
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
                      <Text style={styles.name}>{item.title}</Text>
                    </TouchableOpacity>
                    <View>
                      <LikeComponent />
                    </View>
                  </View>

                  <Text style={styles.categories}>{item.dishes}</Text>
                  {item.isMenuSelected ? null : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <TouchableOpacity onPress ={goToNextPage} style={styles.opacity}>
                        <Text style={{color: '#FFFFFF', marginRight: 5}}>
                          Подробнее
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 4,
                            marginRight: 60,
                          }}></View>
                      </TouchableOpacity>

                      {/* <TouchableOpacity onPress={() => removeUser(index)}> */}
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          setIndex(+index);
                          setOpenModal(true);
                        }}>
                        <MainButton
                          fontSize={17}
                          textBtn={'+ 1000 руб.'}
                          vertical={3}
                        />
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
    marginTop:8
  },
});

export default MainDishes;
