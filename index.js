/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import './src/lang/i18next';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
