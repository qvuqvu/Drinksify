import React from 'react';
import {TouchableOpacity, Text, Alert} from 'react-native';
import COLORS from '../common/Color';
import styles from '../styles/View.OrderDetail';
import fireStore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {
  setTrueWaitForDelete,
  setFalseWaitForDelete,
} from '../redux/orderDetailSlide';
import {useTranslation} from 'react-i18next';

export default BtnCancel = ({orderID}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const createTwoButtonAlert = () =>
    Alert.alert(t('Cancel order'), t('Order will be canceled'), [
      {
        text: t('Cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: t('OK'), onPress: () => cancelOrder()},
    ]);

  const cancelOrder = async () => {
    let historyID = '';
    dispatch(setTrueWaitForDelete());
    await fireStore()
      .collection('OrderHistories')
      .where('orderID', '==', orderID)
      .get()
      .then(query => {
        query.forEach(doc => {
          historyID = doc.id;
        });
      });

   
