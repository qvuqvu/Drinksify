import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import COLORS from '../common/Color';
import React, {useState, useEffect} from 'react';
import Input from '../components/input';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {googleLogin, signIn, onFacebookButtonPress} from '../utils/Auth';
import auth from '@react-native-firebase/auth';
import Vertify from './Vertify';
import {useTranslation} from 'react-i18next';
const SignIn = ({navigation}) => {
  GoogleSignin.configure({
    webClientId:
      '385704122512-fd8dtsc2mepjba96hkkastnr2h0ahf9m.apps.googleusercontent.com',
  });
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const signIn = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show('Logged in', ToastAndroid.SHORT);
      })
      .catch(err => {
        Alert.alert('error', err.toString());
        // ToastAndroid.show(err, ToastAndroid.LONG)
        console.log(err);
      });
  };
  const validate = () => {
    Keyboard.dismiss();
    if (!inputs.email) {
      handleErrors('please input email', 'email');
    }
    if (!inputs.password) {
      handleErrors('Please input password', 'password');
    }
    if (inputs.email != '' && inputs.password != '') {
      signIn(inputs.email, inputs.password);
    }
  };
  const handleErrors = (errorsMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorsMessage}));
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const [confirm, setConfirm] = useState(null);
  const [phone, setPhone] = useState('');
  const [isPress, setIsPress] = useState(false);
  const {t} = useTranslation();
  async function signInWithPhoneNumber(phoneNumber) {
    const format = /[!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?]+/;
    const formatphone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (format.test(phoneNumber) || !formatphone.test(phoneNumber)) {
      ToastAndroid.show('Số điện thoại chưa đúng', 3);
      return;
    }
    try {
      if (phoneNumber.charAt(0) === '0') {
        let a = phoneNumber.substring(1);
        phoneNumber = '+84'.concat(a);
        console.log(phoneNumber);
      }
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      await setConfirm(confirmation);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Số điện thoại chưa đúng', 4);
    }
  }
  useEffect(() => {
    if (phone == '') setIsPress(false);
    else setIsPress(true);
  }, [phone]);
  if (!confirm)
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require('../assets/background.jpg')}
              style={styles.imgBackground}
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.name}>Giải khát ngay với Drinksify !</Text>
            <View style={{height: 130}}>
              <Input
                placeholder="Email"
                iconName="envelope"
                keyboardType="email-address"
                onChangeText={text => handleOnChange(text, 'email')}
                error={errors.email}
                onFocus={() => handleErrors(null, 'email')}
              />

              <Input
                placeholder="Mật khẩu"
                iconName="lock"
                password
                onChangeText={text => handleOnChange(text, 'password')}
                error={errors.password}
                onFocus={() => handleErrors(null, 'password')}
              />
            </View>
            <TouchableOpacity
              style={styles.btnLogin3}
              activeOpacity={0.8}
              onPress={validate}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
            <Text style={styles.OtherSignIn}>- {t('Or')} -</Text>
            <TouchableOpacity
              style={styles.gg}
              activeOpacity={0.7}
              onPress={() => {
                googleLogin();
              }}>
              <Image
                style={styles.imggg}
                source={require('../assets/google.png')}
              />
              <View style={styles.txtgg}>
                <Text style={{color: '#000', fontSize: 16}}>
                  {t('Continue with')} google
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.footer1}>
              <Text style={{fontSize: 16}}>Bạn chưa có tài khoản? </Text>
              <Text
                style={{fontSize: 16, color: COLORS.custom, fontWeight: '600'}}
                onPress={() => navigation.navigate('Register')}>
                Đăng ký
              </Text>
            </View>
            {/* Button sign in with facebook
            <TouchableOpacity
              style={styles.gg}
              activeOpacity={0.7}
              onPress={onFacebookButtonPress}>
              <Image
                style={styles.imggg}
                source={require('../assets/facebook.png')}
              />
              <View style={styles.txtgg}>
                <Text style={{color: '#000', fontSize: 16}}>
                  {t('Continue with')} facebook
                </Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  return (
    <Vertify confirm={confirm} phoneNumber={phone} setConfirm={setConfirm} />
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  imgBackground: {
    bottom: 20,
    width: 400,
    height: 250,
  },
  footer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footer: {
    flex: 2.8,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignContent: 'space-around',
    paddingTop: 40,
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 29,
    color: COLORS.custom,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginVertical: 25,
  },
  btnLogin3: {
    height: 45,
    backgroundColor: COLORS.custom,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  btnLogin: {
    backgroundColor: COLORS.custom,
    height: 46,
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnLogin1: {
    backgroundColor: '#C5C5C5',
    height: 46,
    justifyContent: 'center',
    borderRadius: 10,
  },
  OtherSignIn: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 30,
  },
  gg: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#ffff',
    borderRadius: 20,
    borderColor: '#C5C5C5',
    borderWidth: 1.5,
    height: 42,
    alignItems: 'center',
    // paddingLeft: 48,
    justifyContent: 'center',
  },
  imggg: {
    width: 24,
    height: 24,
  },
  txtgg: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
  },
  txtSignin: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'white',
  },
});
