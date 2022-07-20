import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import FeedBackSvg from '../../assets/svg/FeedBackSvg';
import logoImg from '../../assets/img/home/dishes/4.png';
import TextArea from '../../components/UI/textArea/TextArea';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from '../../components/UI/buttons/MainButton';
import AddedCartModal from '../../components/UI/AddedCartModal';

const NameDishScreen = ({navigation, price = 1000}) => {
  const [count, setCount] = useState(1);
  const [sum, setSum] = useState(1000);

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
    setSum(prev => (prev += price));
  };
  const [openModal, setOpenModal] = useState(false);
  const modalVisible = () => {
    setOpenModal(true);
  };
  return (
    <View style={styles.container}>
      {openModal && <AddedCartModal setOpenModal={setOpenModal} />}
      <ScrollView>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainDishesScreen')
        }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 25,
          }}>
          <View style={{marginRight: 10, marginTop: 17}}>
            <FeedBackSvg />
          </View>
          <Text style={{fontSize: 16, color: '#5F6368', marginTop: 17}}>
            Основные Блюда
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: '100%',
            height: 1.5,
            backgroundColor: '#17181B',
            marginTop: 20,
          }}
        />
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
          Название Блюда
        </Text>
        <Text
          style={{
            color: '#5F6368',
            fontSize: 13,
            marginTop: 10,
            marginHorizontal: 30,
          }}>
          Ингридиенты: куриное филе, помидоры черри, сыр пармезан, хлеб, чеснок,
          Ингридиенты: куриное филе, помидоры черри, сыр пармезан, хлеб,
          чеснок... Ингридиенты: куриное филе, помидоры черри, сыр пармезан,
          хлеб, чеснок...
        </Text>
        <TextArea placeholder={'Оставить комментарии'} />

        <View style={{flexDirection: 'row', marginHorizontal: 30}}>
          <Text style={{fontSize: 16, color: '#FFFFFF', marginRight: 80}}>
            Количество порций
          </Text>
          <View style={{flexDirection: 'row'}}>



            <TouchableOpacity onPress={Decrease} disabled={count <= 1} style={{width: 40, height: 34, backgroundColor: '#202124'}}>
 <Text style={{color:'#FFFFFF', textAlign:'center', marginTop:7}}>
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

            <TouchableOpacity onPress={Increase} style={{width: 40, height: 34, backgroundColor: '#202124'}}>
 <Text style={{color:'#FFFFFF', textAlign:'center', marginTop:7}}>
   +
 </Text>
            </TouchableOpacity>


          </View>
        </View>
        {sum && (
          <Text
            style={{
              color: '#FFFFFF',
              textAlign: 'right',
              paddingHorizontal: 30,
              marginTop: 10,
              fontSize: 16,
            }}
            setSum={setSum}>
            {sum}
          </Text>
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
