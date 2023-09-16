import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
// AppRegistry.registerComponent
AppRegistry.registerComponent("main", () => App);
