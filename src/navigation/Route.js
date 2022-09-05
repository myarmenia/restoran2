import React, {useEffect, useState} from 'react';
import {Dimensions, Modal, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AutoSignIn} from '../store/reducers/auth/action';
import NetInfo from '@react-native-community/netinfo';
import PusherNative from 'pusher-js/react-native';
import Echo from 'laravel-echo';
import {PUSHER_APP_KEY, PUSHER_APP_CLUSTER} from '@env';
import {AutoStack} from './AutoStack';
import {SummaryNavigation} from './SummaryNavigation';
import NoConnectionScreen from '../screen/noConnectionScreen/NoConnectionScreen';
import NotificationComponent from '../components/notificationComponent/NotificationComponent';

const Route = () => {
  const {canAuth} = useSelector(state => state.auth);
  const {user} = useSelector(state => state.auth);
  const [localAuth, setLocalAuth] = useState(false);
  const [netInfo, setNetInfo] = useState(null);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    NetInfo.fetch().then(connectionInfo => {
      setNetInfo(connectionInfo.isConnected);
    });
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    authCheck();
  }, []);

  const authCheck = async () => {
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');
    const userParseData = JSON.parse(userData);
    if (token && userParseData?.phone_number) {
      await dispatch(AutoSignIn());
      setLocalAuth(true);
      await listenMessages();
    }
  };

  const listenMessages = async () => {
    PusherNative.logToConsole = true;
    let options = {
      broadcaster: 'pusher',
      key: `${PUSHER_APP_KEY}`,
      cluster: `${PUSHER_APP_CLUSTER}`,
      encrypted: false,
      wsHost: 'tap-table.ru',
      wsPort: 6001,
      wssPort: 6001,
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
    };
    let PusherClient = new PusherNative(options.key, options);
    const echo = new Echo({
      broadcaster: 'pusher',
      client: PusherClient,
      ...options,
    });
    await echo.channel(`notific.${user?.id}`).listen('.NOTIFIC', e => {
      setNotification(e);
      console.log('notification ----> ', e);
    });
  };

  useEffect(() => {
    setLocalAuth(canAuth);
  }, [canAuth]);

  return (
    <>
      <Modal transparent={true} animationType="fade" visible={!!notification}>
        <NotificationComponent
          notification={notification}
          setNotification={setNotification}
        />
      </Modal>
      {netInfo || netInfo === null ? (
        localAuth || canAuth ? (
          <SummaryNavigation />
        ) : (
          <AutoStack />
        )
      ) : (
        <NoConnectionScreen />
      )}
    </>
  );
};

export default Route;
