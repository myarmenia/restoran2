import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import logoImg from '../../assets/img/home/dishes/4.png';
import TextArea from '../../components/UI/textArea/TextArea';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from '../../components/UI/buttons/MainButton';
import AddedCartModal from '../../components/UI/AddedCartModal';
import {useDispatch, useSelector} from 'react-redux';
import SimpleHeader from '../../components/headers/SimpleHeader';
import {addDish} from '../../store/reducers/restaurant/slice';
import LoadingComponent from '../../components/loadingComponent';

const NameDishScreen = ({navigation, route}) => {
  const {byId} = useSelector(({restaurant}) => restaurant);
  const [count, setCount] = useState(1);
  const [sum, setSum] = useState(0);
  const [price, setPrice] = useState(0);
  const [comment, setComment] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modalVisible = async () => {
    setLoading(true);
    await dispatch(
      addDish([
        route.params.restId,
        byId?.id,
        {
          id: byId?.id,
          count: count,
          comment: comment || 'Без изменений',
        },
        {
          name: byId?.name,
          desc: byId?.desc,
          price: byId?.price,
        },
      ]),
    );
    setCount(1);
    setPrice(+byId?.price);
    setSum(+byId?.price);
    await setLoading(false);
    setOpenModal(true);
  };

  useEffect(() => {
    setPrice(+byId?.price);
    setSum(+byId?.price);
  }, []);

  const Decrease = () => {
    setCount(count - 1);
    if (count <= 1) {
      setCount(1);
      setSum(price);
    }
    setSum(prev => (prev -= price));
  };

  const Increase = () => {
    setCount(prev => prev + 1);
    setSum(prev => prev + price);
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingComponent /> : <></>}
      {openModal ? (
        <AddedCartModal dishName={byId?.name} setOpenModal={setOpenModal} />
      ) : (
        <></>
      )}
      <ScrollView
        style={{
          paddingTop: Platform.OS === 'ios' ? 30 : 0,
        }}>
        <SimpleHeader title={'Основные Блюда'} right={-40} />

        <View style={{alignItems: 'center', marginTop: 30}}>
          <Image source={logoImg} />
        </View>
        {/* <AddedCartModal/> */}
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 15,
          }}>
          {byId?.name}
        </Text>
        <Text
          style={{
            color: '#5F6368',
            fontSize: 13,
            marginTop: 10,
            marginHorizontal: 30,
          }}>
          {byId?.desc}
        </Text>
        <TextArea
          text={comment}
          onChangeText={setComment}
          placeholder={'Оставить комментарии'}
        />

        <View style={{flexDirection: 'row', marginHorizontal: 30}}>
          <Text style={{fontSize: 16, color: '#FFFFFF', marginRight: 80}}>
            Количество порций
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={Decrease}
              disabled={count <= 1}
              style={{
                width: 40,
                height: 34,
                backgroundColor: '#202124',
                borderRadius: 45,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              }}>
              <Text
                style={{color: '#FFFFFF', textAlign: 'center', marginTop: 7}}>
                -
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: 25,
                height: 34,
                backgroundColor: '#17181B',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 7,
                  color: '#5F6368',
                }}>
                {count}
              </Text>
            </View>
            <TouchableOpacity
              onPress={Increase}
              style={{
                width: 40,
                height: 34,
                backgroundColor: '#202124',
                borderRadius: 45,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
              }}>
              <Text
                style={{color: '#FFFFFF', textAlign: 'center', marginTop: 7}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {sum ? (
          <Text
            style={{
              color: '#FFFFFF',
              textAlign: 'right',
              paddingHorizontal: 30,
              marginTop: 10,
              fontSize: 16,
            }}
            setSum={setSum}>
            {sum} руб.
          </Text>
        ) : (
          <></>
        )}
        <View style={{marginHorizontal: 30, marginTop: 15, marginBottom: 40}}>
          <MainButton textBtn={'Добавить в корзину'} goTo={modalVisible} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
  },

  separator: {
    height: 12,
  },
});

export default NameDishScreen;
