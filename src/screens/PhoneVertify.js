import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Input from '../components/input';
import auth from '@react-native-firebase/auth';
import Vertify from './Vertify';
import {signOut} from '../utils/Auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

const PhoneVertify = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [isSocial, setIsSocial] = useState(1);
  const [isPress, setIsPress] = useState(false);
  const {t} = useTranslation();
  async function verifyPhoneNumber(phoneNumber) {
    try {
      if (phoneNumber.charAt(0) === '0') {
        let a = phoneNumber.substring(1);
        phoneNumber = '+84'.concat(a);
        console.log(phoneNumber);
      }
      const confirmation = await auth().verifyPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Recheck your phone number', 4);
    }
  }
  useEffect(() => {
    if (phoneNumber === '') setIsPress(false);
    else setIsPress(true);
  }, [phoneNumber]);
 
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'flex-end', marginRight: -20, marginTop: 15}}>
          <Icon name="close-circle-outline" size={35} onPress={signOut} />
        </View>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>{t('Confirm your phone number')}</Text>
          <Text style={styles.txtNoti}>{t('clgt')}</Text>
        </View>
        <View style={styles.body}>
          <Input
            keyboardType="numeric"
            placeholder={t('Enter your phone number')}
            onChangeText={text => {
              setPhoneNumber(text);
            }}
          />
          <TouchableOpacity
            style={[
              styles.btnLogin,
              {backgroundColor: !isPress ? '#C5C5C5' : 'red'},
            ]}
            disabled={!isPress}
            onPress={() => {
              verifyPhoneNumber(phoneNumber);
            }}>
            <Text style={{alignSelf: 'center', fontSize: 17, color: 'black'}}>
              {t('Update')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  return (
    <Vertify
      confirm={confirm}
      isSocial={isSocial}
      setHasPhone={setHasPhone}
      setConfirm={setConfirm}
    />
  );
};

export default PhoneVertify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  body: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  txtHeader: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  txtNoti: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    paddingHorizontal: 10,
  },
  //otp-input
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    // width: 30,
    // height: 45,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  //

  btnLogin: {
    // position: 'absolute',
    // bottom: 30,
    // left: 30,
    // right: 30,
    // flex: 1,
    height: 46,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
