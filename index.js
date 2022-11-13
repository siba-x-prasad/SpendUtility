/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LauncherApp from './src/app/screens/LauncherApp'

AppRegistry.registerComponent(appName, () => LauncherApp);
