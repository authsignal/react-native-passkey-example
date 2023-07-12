import {AppRegistry} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';
import './src/config';

AppRegistry.registerComponent(appName, () => App);
