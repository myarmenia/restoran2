import React, {useEffect, useState} from 'react';
import {AutoStack} from './AutoStack';
import {SummaryNavigation} from './SummaryNavigation';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AutoSignIn } from "../store/reducers/auth/action";

const Route = () => {
  const [localAuth, setLocalAuth] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    authCheck();
  }, []);

  const authCheck = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      dispatch(AutoSignIn());
      setLocalAuth(true);
    }
  };

  useEffect(() => {
    console.log('auth', auth);
    if (auth.canAuth) {
      setLocalAuth(true);
    } else {
      setLocalAuth(false);
    }
  }, [auth.canAuth]);

  return localAuth ? <SummaryNavigation /> : <AutoStack />;
  // return <SummaryNavigation />;
};

export default Route;
