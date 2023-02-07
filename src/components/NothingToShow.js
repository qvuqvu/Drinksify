import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {useTranslation} from 'react-i18next';

const NothingToShow = ({uri}) => {
  const {t} = useTranslation();
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView source={uri} autoPlay loop />
      <View style={{position: 'absolute', bottom: 80}}>
        <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
          {t('Nothing to show')} !
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1,
  },
});

export default NothingToShow;




