import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Button,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {signUp} from '../utils/Auth';
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/input';
import Color from '../common/Color';
const SignUp = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
    lastname: '',
    username: '',
    confirmpassword: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const PhoneFormatCharacter = /[!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?]+/;
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phoneFormat = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    Keyboard.dismiss();
    if (!inputs.email) {
      handleErrors('please input email', 'email');
    }
    else if(!inputs.email.match(emailFormat)){
      ToastAndroid.show('Email sai định dạng', 3)
      return; 
    }
    if (!inputs.password) {
      handleErrors('Please input password', 'password');
    }
    if (!inputs.name) {
      handleErrors('Please input name', 'name');
    }
    if (!inputs.username) {
      handleErrors('Please input username', 'username');
    }
    if(!inputs.phone){
      handleErrors('Nhập số điện thoại', 'phone');
    }
    else if(!inputs.phone.match(phoneFormat) || inputs.phone.match(PhoneFormatCharacter)){
      ToastAndroid.show('Kiểm tra số điện thoại', 3)
      return;
    }
    if (!inputs.confirmpassword) {
      handleErrors('Please input confirm password', 'confirmpassword');
    }
    if(inputs.password.length < 8){
      ToastAndroid.show('Mật khẩu phải nhiều hơn 7 ký tự', 3)
    }
    if (
      inputs.email != '' &&
      inputs.password != '' &&
      inputs.confirmpassword != '' &&
      inputs.username != '' &&
      inputs.phone != '' &&
      inputs.type != ''
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
  };
  const handleErrors = (errorsMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorsMessage}));
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.lbCreate}>Tạo tài khoản</Text>
      {/* <View style={styles.name_lastname}>
        <Input
          style={{marginLeft: -5}}
          placeholder="Your Name"
          onChangeText={text => handleOnChange(text, 'name')}
          error={errors.name}
          onFocus={() => handleErrors(null, 'name')}
        />
        <View style={{margin: 8}} />
        <Input
          style={{marginLeft: -5}}
          placeholder="Your Last name"
          onChangeText={text => handleOnChange(text, 'lastname')}
          error={errors.lastname}
          onFocus={() => handleErrors(null, 'lastname')}
        />
      </View> */}
      <View style={{height: 350, marginTop: 20}}>
        <Input
          placeholder="Tên của bạn"
          onChangeText={text => handleOnChange(text, 'username')}
          error={errors.username}
          onFocus={() => handleErrors(null, 'username')}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => handleOnChange(text, 'email')}
          error={errors.email}
          onFocus={() => handleErrors(null, 'email')}
        />
        <Input
          placeholder="Số điện thoại"
          keyboardType="numeric"
          onChangeText={text => handleOnChange(text, 'phone')}
          error={errors.phone}
          onFocus={() => handleErrors(null, 'phone')}
        />
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
      
      <TouchableOpacity
        style={styles.btnSignUp}
        activeOpacity={0.8}
        onPress={validate}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
          Đăng ký
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  back: {
    height: 24,
    width: 24,
  },
  lbSignUp: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 120,
    color: '#000',
  },
  lbCreate: {
    marginTop: 20,
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name_lastname: {
    flexDirection: 'row',
    marginTop: 30,
  },
  btnSignUp: {
    backgroundColor: Color.custom,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
});
