import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = ({uri, title, backgroundColor}) => {
  if(backgroundColor)
    return(
      <View style={[StyleSheet.absoluteFillObject, styles.container, backgroundColor={backgroundColor}]}>
      <LottieView source={uri} autoPlay loop />
      <View style={{position: 'absolute', bottom: 120}}>
        <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>
          {title}
        </Text>
      </View>
    </View>
    )
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView  source={uri} autoPlay loop />
      <View style={{position: 'absolute', bottom: 120}}>
        <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
});

export default Loading;
