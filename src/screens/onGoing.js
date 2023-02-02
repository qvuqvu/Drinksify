import {ScrollView, RefreshControl, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemInOder from '../components/ItemInOder';
import fireStore from '@react-native-firebase/firestore';
import COLORS from '../common/Color';
import {useDispatch, useSelector} from 'react-redux';
import fireauth from '@react-native-firebase/auth';
import {
  selectShippingOrders,
  addShippingOrder,
  resetShippingOrder,
} from '../redux/orderDetailSlide';
import NothingToShow from '../components/NothingToShow';

const OnGoing = () => {
  const dispatch = useDispatch();
  const Orders = useSelector(selectShippingOrders);
  const loadOrder = async () => {
    await fireStore()
      .collection('Orders')
      .where('state', '==', 'shipping')
      .where('userID', '==', fireauth().currentUser.uid)
      .onSnapshot(snap => {
        const temp = [];
        dispatch(resetShippingOrder());
        snap.forEach(documentSnapshot => {
          temp.push(documentSnapshot.data());
        });
        temp.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        dispatch(addShippingOrder(temp));
      });
  };

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    loadOrder();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(resetShippingOrder());
    loadOrder();
    setRefreshing(false);
  };
  if (Orders.length == 0)
    return <NothingToShow uri={require('../assets/empty.json')} />;
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={COLORS.custom}
          />
        }>
        {Orders.map((item, index) => (
          <View key={index}>
            <ItemInOder item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OnGoing;
