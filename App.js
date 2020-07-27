import React from "react";
import Route from './src/Navigate';
import { Platform ,SafeAreaView} from 'react-native';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
//import StatusBar from '../Assets/StatusBar';

export default function App() {
    return (
    <SafeAreaView style={{flex:1}}>
    <Provider store={Store}>
    <Route/>
    </Provider>
   
    </SafeAreaView>
    )
  }
  