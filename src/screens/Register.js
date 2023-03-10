import {StyleSheet, Text, View, TouchableOpacity, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import Input from '../components/input';
import {signUp} from '../utils/Auth';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {signOut} from '../utils/Auth';
import COLORS from '../common/Color';
import {t} from 'i18next';
import {useTranslation} from 'react-i18next';

const Register = ({setProfileUpdated}) => {
  const {t} = useTranslation();
  const [date, setDate] = useState(new Date());
  const [openpicker, setOpenPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [genderFill, setGenderFill] = useState(true);
  const [items, setItems] = useState([
    {label: t('nam'), value: t('nam')},
    {label: t('nữ'), value: t('nữ')},
  ]);
  const [inputs, setInputs] = useState([]);
  const [errors, setErrors] = useState({});
  const UpdateProfile = async () => {
    // console.log(inputs)

    await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .set(inputs)
      .then(() => {});
    await auth().currentUser.updateProfile({displayName: inputs.name});
    setProfileUpdated(true);

  };
  const validate = () => {
    let isFull = true;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const PhoneFormatCharacter = /[!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?]+/;
    const phoneFormat = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    Keyboard.dismiss();
    if (!auth().currentUser?.email)
      if (!inputs.email) {
        isFull = false;
        handleErrors(t('Please enter your email'), 'email');
      } else if (!inputs?.email.match(validRegex)) {
        isFull = false;
        handleErrors(t('Email is wrong format'), 'email');
      }
    if (!inputs?.name) {
      isFull = false;
      handleErrors(t('Please enter your name'), 'name');
    }
    if (!inputs?.dateofbirth) {
      isFull = false;
      handleErrors(t('Please enter your birthday'), 'dateofbirth');
    } else if (new Date().getFullYear() - date.getFullYear() < 15) {
      isFull = false;
      handleErrors(t('You are under 15 years old'), 'dateofbirth');
    }
    if (!inputs?.gender) {
      setGenderFill(false);
    }
    if (!inputs.phone) {
      handleErrors('Nhập số điện thoại', 'phone');
    } else if (
      !inputs.phone.match(phoneFormat) ||
      inputs.phone.match(PhoneFormatCharacter)
    ) {
      ToastAndroid.show('Kiểm tra số điện thoại', 3);
      return;
    }
    if (!inputs.password) {
      handleErrors('Please input password', 'password');
    }
    if (!inputs.confirmpassword) {
      handleErrors('Please input confirm password', 'confirmpassword');
    }
    if (inputs.password && inputs.password.length < 8) {
      ToastAndroid.show('Mật khẩu phải nhiều hơn 7 ký tự', 3);
    }
    if (
      inputs.email != '' &&
      inputs.password != '' &&
      inputs.confirmpassword != '' &&
      inputs.name != '' &&
      inputs.phone != '' &&
      inputs.dateofbirth != '' &&
      inputs.gender != ''
    ) {
      if (inputs.password == inputs.confirmpassword) {
        signUp(inputs);
        // console.log(inputs)
      } else {
        ToastAndroid.show('Hai mật khẩu không giống nhau', 3);
      }
    } else {
      ToastAndroid.show('Nhập đầy đủ thông tin', 3);
    }

    // console.log(value)

    if (isFull) {
      console.log('first');

      // setInputs(prevState => ({...prevState, ['dateofbirth']: date}))
      UpdateProfile();
    }
    // if (inputs.email != '' && inputs.password != '') {
    //   signIn(inputs.email, inputs.password);
    // }
  };

  const handleErrors = (errorsMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorsMessage}));
  };

  const handleOnChange = (text, input) => {
    handleErrors(null, input);
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const SetProfile = async () => {
    // console.log('first');
    // await auth().currentUser.updateProfile({displayName: displayName});
  };
  useEffect(() => {
    if (auth().currentUser) {
      setInputs(prevState => ({
        ...prevState,
        phoneNumber: auth().currentUser.phoneNumber || '',
        email: auth().currentUser.email || '',
      }));
    }
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <Icon name="chevron-back-outline" size={30} onPress={signOut} />
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            flex: 1,
            marginLeft: -25,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: '#000'}}>
            {t('Create account')}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#ccc',
          marginBottom: 50,
          marginTop: 5,
          marginHorizontal: -10,
        }}></View>
      <Input
        placeholder={t('Enter your name')}
        onChangeText={text => {
          handleOnChange(text, 'name');
        }}
        error={errors.name}
      />
      <Input
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={text => handleOnChange(text, 'email')}
        error={errors.email}
        onFocus={() => handleErrors(null, 'email')}
      />
      {/* {!auth().currentUser.email && (
        <Input
          keyboardType="email-address"
          placeholder={t('Enter your email')}
          onChangeText={text => {
            handleOnChange(text, 'email');
          }}
          error={errors.email}
        />
      )} */}
      <Input
        editable={false}
        value={date.toLocaleDateString()}
        placeholder={t('Choose birthday')}
        iconName={'calendar'}
        onPress={() => {
          setOpenPicker(true);
        }}
        onChangeText={text => {
          handleOnChange(text, 'dateofbirth');
        }}
        error={errors.dateofbirth}
      />
      <DropDownPicker
        placeholder={t('Choose gender')}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={value => {
          setValue(value);
        }}
        setItems={setItems}
        onChangeValue={() => {
          setInputs(prevState => ({...prevState, ['gender']: value}));
          setGenderFill(true);
        }}
      />
      {!genderFill && (
        <Text style={{marginLeft: 6, fontSize: 12, color: 'red'}}>
          {t('Please select your gender')}
        </Text>
      )}
      <TouchableOpacity style={styles.btnLogin} onPress={() => validate()}>
        <Text style={styles.btnRegister}>{t('Create account')}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={openpicker}
        date={date}
        onConfirm={date => {
          setOpenPicker(false);
          setDate(date);
          setInputs(prevState => ({
            ...prevState,
            ['dateofbirth']: date,
          }));
        }}
        onCancel={() => {
          setOpenPicker(false);
        }}
      />
      <View style={{marginTop: 20}}>
        <Input
          placeholder="Số điện thoại"
          keyboardType="numeric"
          onChangeText={text => handleOnChange(text, 'phone')}
          error={errors.phone}
          onFocus={() => handleErrors(null, 'phone')}
        />
      </View>

      <Input
        placeholder="Mật khẩu"
        password
        onChangeText={text => handleOnChange(text, 'password')}
        error={errors.password}
        onFocus={() => handleErrors(null, 'password')}
      />
      <Input
        placeholder="Xác nhận mật khẩu"
        password
        onChangeText={text => handleOnChange(text, 'confirmpassword')}
        error={errors.confirmpassword}
        onFocus={() => handleErrors(null, 'confirmpassword')}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  btnLogin: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    flex: 1,
    backgroundColor: COLORS.custom,
    height: 46,
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnRegister: {
    alignSelf: 'center',
    fontSize: 17,
    color: 'white',
  },
});
