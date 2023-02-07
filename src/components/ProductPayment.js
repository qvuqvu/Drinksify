import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from '../styles/View.Payment.container';
import NumberFormat from 'react-number-format';
import {useTranslation} from 'react-i18next';
/* thanh toán sản phẩm */
const ProductPayment = ({item}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.productPayment}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Image
            source={{uri: item.product.linkImage}}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingStart: 15}}>
          <Text style={styles.textColor}>
            x{item.count} {item.product.name}
          </Text>
          <Text>
            {t('Size')}: <Text style={styles.textColor}> {item.size.name}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.textColor, {fontWeight: '500'}]}>
        <NumberFormat
          value={parseInt(item.total)}
          displayType="text"
          thousandSeparator
          suffix="đ"
          renderText={value => <Text>{value}</Text>}
        />
      </Text>
    </View>
  );
};
/* thanh toán sản phẩm */
export default ProductPayment;
