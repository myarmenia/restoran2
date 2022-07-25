import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LikeComponent from './LikeComponent';
import {Preference, Preferences} from '../../store/reducers/restaurant/action';

const PreferencesComp = index => {
  const {preference} = useSelector(({restaurant}) => restaurant);
  const [choosed, setChoosed] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const newVal = preference?.map(el => el?.id);
    console.log(choosed);
    setChoosed(newVal);
  }, [preference]);

  console.log(preference);

  return (
    <View>
      {preference?.length ? (
        <FlatList
          data={preference}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item, index}) => (
            <View style={styles.container}>
              <TouchableOpacity
                style={{position: 'absolute', right: 15, top: 15}}
                onPress={async () => {
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
                  await dispatch(Preference());
                }}>
                <LikeComponent choosed={choosed.includes(item?.id)} />
              </TouchableOpacity>
              <View style={styles.subContainer} activeOpacity={0.7}>
                <Image
                  style={styles.img}
                  resizeMode="cover"
                  source={
                    item?.img || require('../../assets/img/home/dishes/1.png')
                  }
                />
                <Text style={styles.name}>{item?.name}</Text>
              </View>
              <Text style={styles.text1}>{item?.desc}</Text>
              <Text style={{color: '#FFFFFF', fontSize: 12}}>
                Название рест.
              </Text>
            </View>
          )}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').height - 170,
          }}>
          <Text style={{color: '#fff'}}>У вас нет предпочтений</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202124',
    paddingHorizontal: 5,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 0.5,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginBottom: 10,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  categories: {
    fontSize: 14,
    color: '#5F6368',
  },
  text1: {
    fontSize: 12,
    color: '#5F6368',
    textAlign: 'center',
  },
});

export default PreferencesComp;
