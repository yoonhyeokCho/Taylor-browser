import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus";
import AppWithModules from './src/AppWithModules';

export default function App() {
  // LogBox.ignoreAllLogs()
  return (
    <RecoilRoot>
      <RecoilNexus />
      <AppWithModules />
    </RecoilRoot>
  );
}
