import React, {useEffect, useState} from 'react';
import {AutoStack} from './AutoStack';
import {SummaryNavigation} from './SummaryNavigation';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signIn} from '../store/reducers/auth/slice';

const Route = () => {
  const dispatch = useDispatch();
  const [hasToken, setHasToken] = useState(false);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!!token) {
      dispatch(signIn());
    }
    setHasToken(!!token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return hasToken ? <SummaryNavigation /> : <AutoStack />;
};

export default Route;
