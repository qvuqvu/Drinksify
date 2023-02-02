import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
const ItemSupport = ({item}) => {
  const press = () => {
    switch (item.type) {
      case 'phone': {
        Linking.openURL(`tel:${item.value}`);
        return;
      }
      case 'email': {
        Linking.openURL('mailto:' + item.value);
        return;
      }
      case 'website': {
        Linking.openURL(item.value);
        return;
      }
      case 'facebook': {
        Linking.openURL('https://www.facebook.com/GongChaVietnam');
        return;
      }
      case 'instagram': {
        Linking.openURL(
          'https://www.instagram.com/gongchavietnam/?fbclid=IwAR3dHSSKh3veA29cfZ1TalLgNZ6I2-ZJJgq-86m5kcUoHSsfg7NkxMcijaU',
        );
        return;
      }
    }
  };
  return (
    <TouchableOpacity
      style={{height: 65, backgroundColor: 'white', flexDirection: 'row'}}
      onPress={press}>
      <View
        style={{
          width: '15%',
          height: 65,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name={item.icon} size={24} color="black" />
      </View>
      <View style={{width: '70%', height: 65, justifyContent: 'center'}}>
        <Text>{item.title}</Text>
        <Text numberOfLines={1}>{item.value}</Text>
      </View>
      <View
        style={{
          width: '15%',
          height: 65,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="chevron-right" size={15} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default ItemSupport;

const styles = StyleSheet.create({});
