import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SectionList,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ItemProduct from '../components/itemProduct';
import firestore from '@react-native-firebase/firestore';
import HeaderOrder from '../components/headerOrder';
import ItemCategory from '../components/itemCategory';
import COLORS from '../common/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {useTranslation} from 'react-i18next';
const Order = () => {
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState([]);
  const [topping, setTopping] = useState([]);
  const [size, setSize] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const navigation = useNavigation();
  const orders = useSelector(state => state.orders.list);
  const {t} = useTranslation();
  const [dataCategory, setDataCategory] = useState([
    {
      title: t('Trà sữa'),
      index: 0,
      select: 'true',
    },
    {
      title: t('Trà'),
      index: 1,
      select: 'false',
    },
    {
      title: t('Đá xay'),
      index: 2,
      select: 'false',
    },
    {
      title: t('Sinh tố'),
      index: 4,
      select: 'false',
    },
    {
      title: t('Cà phê'),
      index: 5,
      select: 'false',
    },
    {
      title: t('Nước ép'),
      index: 7,
      select: 'false',
    },
  ]);
  const sectionRef = useRef(null);
  const getToppings = async () => {
    const temp = [];
    await firestore()
      .collection('Toppings')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          temp.push(documentSnapshot.data());
        });
      });
    return temp;
  };
  const getSizes = async () => {
    const temp = [];
    await firestore()
      .collection('Sizes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          temp.push(documentSnapshot.data());
        });
      });
    return temp;
  };
  const navPayment = () => {
    if (orders.length > 0) navigation.push('Payment');
  };
  const getData = async () => {
    const dataTS = [];
    const dataT = [];
    const dataL = [];
    const dataDX = [];
    const dataST = [];
    const dataCF = [];
    const dataNE = [];
    const dataSC = [];
    const temp = [];
    await firestore()
      .collection('Products')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().type === 'Trà sữa') {
            dataTS.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Trà') {
            dataT.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Đá xay') {
            dataDX.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Sinh tố') {
            dataST.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Cà phê') {
            dataCF.push(documentSnapshot.data());
          } else if (documentSnapshot.data().type === 'Nước ép') {
            dataNE.push(documentSnapshot.data());
          }
          temp.push(documentSnapshot.data());
        });
      });
    setDataAll(temp);
    const tempSection = [
      {
        title: t('Trà sữa'),
        data: dataTS,
      },
      {
        title: t('Trà'),
        data: dataT,
      },
      {
        title: t('Đá xay'),
        data: dataDX,
      },
      {
        title: t('Latte'),
        data: dataL,
      },
      {
        title: t('Sinh tố'),
        data: dataST,
      },
      {
        title: t('Cà phê'),
        data: dataCF,
      },
      {
        title: t('Nước ép'),
        data: dataNE,
      },
    ];
    return tempSection;
  };
  const addSection = async () => {
    const data = await getData();
    const datatopping = await getToppings();
    const dataSizes = await getSizes();
    setSection(data);
    setTopping(datatopping);
    setSize(dataSizes);
    setLoading(false);
  };
  useEffect(() => {
    addSection();
  }, []);
  const scroll = index => {
    if (index == 0) {
      sectionRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: index,
        viewPosition: 0,
      });
    } else {
      sectionRef.current.scrollToLocation({
        animated: true,
        itemIndex: -1,
        sectionIndex: index,
        viewPosition: 0,
      });
    }
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderOrder data={dataAll} topping={topping} size={size} />
        <FlatList
          style={{
            height: 50,
            backgroundColor: 'white',
            paddingLeft: 8,
            marginRight: 8,
          }}
          horizontal={true}
          data={dataCategory}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <ItemCategory
              item={item}
              dataCategory={dataCategory}
              setDataCategory={setDataCategory}
              scroll={scroll}
            />
          )}
          keyExtractor={(item, index) => item + index}
        />
        <SectionList
          showsVerticalScrollIndicator={false}
          ref={sectionRef}
          sections={section}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <ItemProduct item={item} topping={topping} size={size} />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
                marginLeft: 16,
                marginVertical: 10,
              }}>
              {title}
            </Text>
          )}
        />
        {orders.length > 0 && (
          <View style={styles.count}>
            <Text style={{fontSize: 12, color: 'white'}}>{orders.length}</Text>
          </View>
        )}
        {orders.length > 0 && (
          <TouchableOpacity
            style={styles.btnfl}
            activeOpacity={1}
            onPress={navPayment}>
            <Icon name="cart-outline" color="white" size={24} />
          </TouchableOpacity>
        )}
      </View>
      {loading && (
        <Loading
          uri={require('../assets/loading.json')}
          title={t('Loading...')}
        />
      )}
    </>
  );
};

export default Order;

const styles = StyleSheet.create({
  btnfl: {
    backgroundColor: COLORS.custom,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 15,
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    backgroundColor: '#BC945D',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 48,
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
