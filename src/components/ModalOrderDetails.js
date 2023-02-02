import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectModal, openOrClose, selectOrder} from '../redux/orderDetailSlide';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../common/Color';
import {selectAllProduct} from '../redux/orderDetailSlide';
import OrderDetail from './OrderDetail';
import HistoryOrder from './HistoryOrder';
import Loading from './Loading';
import {useTranslation} from 'react-i18next';
import {Divider} from 'react-native-paper';
import FormatNumber from '../utils/FormatNumber';
import NumberFormat from 'react-number-format';

export default ModalOrderDetails = () => {
  const modalVisible = useSelector(selectModal);
  const arrProduct = useSelector(selectAllProduct);
  const {t} = useTranslation();

  return (
    <View style={{height: '100%'}}>
      <Modal animationType="slide" visible={modalVisible}>
        <Header />
        {arrProduct.length != 0 ? (
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {arrProduct.map((item, index) => (
                <View key={index}>
                  <OrderDetail item={item} />
                </View>
              ))}
              <Total />
              <HistoryOrder />

              <View height={70} />
            </ScrollView>
            <BtnClose />
          </View>
        ) : (
          <Loading
            uri={require('../assets/lf30_editor_fhzlpncq.json')}
            title={t('Loading...')}
          />
        )}
      </Modal>
    </View>
  );
};

const BtnClose = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(openOrClose());
  };
  return (
    <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
      <Ionicons
        name="close-circle"
        style={{fontSize: 50, color: COLORS.custom}}
      />
    </TouchableOpacity>
  );
};

const Header = () => {
  const {t} = useTranslation();
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
      }}>
      <Text style={{fontWeight: '600', color: COLORS.custom, fontSize: 18}}>
        {t('Order detail')}
      </Text>
    </View>
  );
};

const Total = () => {
  const {t} = useTranslation();
  const order = useSelector(selectOrder);
  return (
    <View style={{marginTop: 10, backgroundColor: 'white', padding: 15}}>
      <Text
        style={{
          alignSelf: 'center',
          color: 'black',
          fontSize: 17,
          fontWeight: '600',
        }}>
        {t('Total')}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{t('Merchandise Subtotal')}</Text>
        <Text>
          <FormatNumber number={order.totalBeforeCheckout} />
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{t('Decrease price')}</Text>
        <Text>
          -<FormatNumber number={order.decreasePrice} />
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <Text>{t('Shipping Subtotal')}</Text>
        <Text>
          <FormatNumber number={30000} />
        </Text>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 15,
        }}>
        <Text style={{fontSize: 17, color: COLORS.custom}}>{t('Total')}</Text>
        <Text>
          <NumberFormat
            value={parseInt(order.totalCost)}
            displayType="text"
            thousandSeparator
            suffix="đ"
            renderText={value => (
              <Text style={{color: COLORS.custom, fontSize: 17}}>{value}</Text>
            )}
          />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',

    shadowColor: '#000',
    height: '95%',
  },
  closeBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignSelf: 'center',
    bottom: 15,
    transparent: true,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
