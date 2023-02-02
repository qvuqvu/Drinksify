import {View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import COLORS from '../common/Color';
import {changeNote, selectNote} from '../redux/orderSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const Note = () => {
  const dispatch = useDispatch();
  const note = useSelector(selectNote);
  const {t} = useTranslation();

  return (
    <View style={{marginTop: 15}}>
      <TextInput
        placeholder={t('Notes for orders')}
        value={note}
        onChangeText={note => dispatch(changeNote(note))}
        activeUnderlineColor={COLORS.custom}
        style={{backgroundColor: 'white', height: 40}}
      />
    </View>
  );
};

export default Note;
