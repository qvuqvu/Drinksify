import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {chooseVoucher} from '../redux/voucherSlice';
import {useNavigation} from '@react-navigation/native';
import {calculatorTotal, TotalAmount} from '../utils/solveVoucher';
import {useTranslation} from 'react-i18next';
const {width, height} = Dimensions.get('window');
const ItemVoucher = ({item, type}) => {
  const [time, setTime] = useState();
  const [isExpired, setIsExpired] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getTime = time => {
    const end = new Date(time * 1000);
    const now = new Date();
    const temp = Math.floor(
      (end.getTime() - now.getTime()) * (2.77777778 * 0.0000001),
    );
    if (temp <= 24) {
      setTime(t('Expires in') + temp + t('hours'));
      setIsExpired(true);
    } else {
      setTime(t('Expired') + end.toLocaleDateString());
    }
  };
  const total = calculatorTotal();
  const amount = TotalAmount();
  const add = () => {
    if (item.type == 'total') {
      if (total >= parseInt(item.condition)) {
        const action = chooseVoucher(item);
        dispatch(action);
        Alert.alert(t('Notification'), t('Use voucher successfully!'), [
          {
            text: 'OK',
            onPress: () => {
              setModalVisible(false);
            },
          },
        ]);
      } else {
        Alert.alert(t('Notification'), t('You are not eligible to use!'));
      }
    } else {
      if (amount >= item.count) {
        const action = chooseVoucher(item);
        dispatch(action);
        Alert.alert(t('Notification'), t('Use voucher successfully!'), [
          {
            text: 'OK',
            onPress: () => {
              setModalVisible(false);
            },
          },
        ]);
      } else {
        Alert.alert(t('Notification'), t('You are not eligible to use!'));
      }
    }
  };
  useEffect(() => {
    getTime(item.end.seconds);
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setModalVisible(true);
      }}>
      <View
        style={{
          width: 120,
          height: 120,
          backgroundColor: '#FFF',
          justifyContent: 'center',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderStyle: 'dotted',
        }}>
        <Image
          source={{uri: item.image}}
          style={{height: 90, width: 90, alignSelf: 'center'}}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#fff',
          height: 120,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            borderRadius: 20,
            width: 10,
            height: 10,
            backgroundColor: '#F2F2F2',
            marginTop: -7,
          }}></View>
        <View style={{height: 100, justifyContent: 'space-around'}}>
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
          <IonIcon name="ellipse" size={5} color="#ccc" />
        </View>
        <View
          style={{
            borderRadius: 20,
            width: 10,
            height: 10,
            backgroundColor: '#F2F2F2',
            marginBottom: -7,
          }}></View>
      </View>
      <View
        style={{
          width: width - 150,
          height: 120,
          backgroundColor: 'white',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          justifyContent: 'space-between',
          paddingVertical: 20,
          paddingLeft: 10,
        }}>
        {/* Title */}
        <View style={{}}>
          <Text style={{fontSize: 15, color: '#000'}} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        {/* End Time */}
        {isExpired && (
          <View>
            <Text style={{color: 'red'}}>{time}</Text>
          </View>
        )}
        {!isExpired && (
          <View>
            <Text>{time}</Text>
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#F5F5F5',
            marginTop: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <IonIcon
            name="close-outline"
            size={24}
            color="black"
            style={styles.closebtn}
            onPress={() => {
              setModalVisible(false);
            }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              flex: 1,
              marginTop: 45,
              marginHorizontal: 35,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: '500', marginTop: 20}}>Drinksify</Text>
              <Text
                style={{
                  textAlign: 'center',
                  width: 250,
                  fontWeight: '500',
                  fontSize: 18,
                  color: 'black',
                  marginTop: 10,
                }}>
                {item.title}
              </Text>
            </View>
            <View
              style={{
                height: 2,
                backgroundColor: '#F5F5F5',
                marginHorizontal: 10,
                marginVertical: 20,
              }}
            />
            <Image
              source={{uri: item.image}}
              style={{
                height: 200,
                width: 200,
                alignSelf: 'center',
                marginTop: 30,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                borderRadius: 20,
                height: 40,
                justifyContent: 'center',
                width: 170,
                alignSelf: 'center',
                marginTop: 20,
              }}
              onPress={add}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 16,
                  alignSelf: 'center',
                }}>
                Sử dụng ngay
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: 2,
                backgroundColor: '#F5F5F5',
                marginHorizontal: 10,
                marginVertical: 20,
              }}
            />
            <Text style={{alignSelf: 'center', fontSize: 16}}>
              Ngày hết hạn:{' '}
              {new Date(item.end.seconds * 1000).toLocaleDateString()}
            </Text>
            <View
              style={{
                height: 2,
                backgroundColor: '#F5F5F5',
                marginHorizontal: 10,
                marginVertical: 20,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                paddingHorizontal: 25,
                fontSize: 15,
              }}>
              {item.content.replace(/\\n/g, '\n')}
            </Text>
            <View style={{height: 50}} />
          </ScrollView>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ItemVoucher;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: 140,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closebtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
