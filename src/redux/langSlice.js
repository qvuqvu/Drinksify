import {createSlice} from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
const langSlice = createSlice({
  name: 'lang',
  initialState: 'vn',
  reducers: {
    changeLang: (state, action) => {
        return action.payload
    },
  },
});

export const {changeLang} = langSlice.actions;

export default langSlice.reducer;
