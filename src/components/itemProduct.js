import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FormatNumber from '../utils/FormatNumber';
const ItemProduct = ({item, topping, size}) => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigator.push('Detail', {item: item, topping: topping, size: size});
      }}>
      
      <View style={styles.imgContainer}>
        <Image source={{uri: item.linkImage}} style={styles.img} />
        
      </View>
      <View style={styles.imgContainer2}></View>
      <View style={styles.info}>
        <Text style={{fontWeight: 'bold', marginBottom: 4, color:'black'}} numberOfLines={1}>
          {item.name}
        </Text>
        <FormatNumber number={parseInt(item.price)} />
      </View>
    </TouchableOpacity>
  );
};

export default ItemProduct;

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  imgContainer: {
    height: 120,
    width: 120,
    borderRadius: 120,
    zIndex:1,
    justifyContent: 'center',
  },
  imgContainer2: {
    position: 'absolute',
    zIndex:0,
    height: 80,
    width: 80,
    left: 20,
    top: 40,
    borderRadius: 70,
    backgroundColor: "#fff2d8",
   
  },
  img: {
    height: 110,
    width: 110,
    alignSelf: 'center',
  },
  info: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
});
