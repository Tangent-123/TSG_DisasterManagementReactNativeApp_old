import React, { useState, useEffect } from "react";

import {
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import LoginStyle from './style';
import LoginApi from '../../Util/ApiCollection';
import StatusBar from '../../Assets/StatusBar';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import BaseUrl from '../../Util/ApiCollection';
import qs from 'qs';
import Constants from '../../Util/Config/Constants';

import ColorCode from '../../Util/Color_Value';
import { connect } from 'react-redux';

export default function LoginActivity({navigation}) {
      const [Name, setName] = useState('')
      const [BtnName,setBtnName] = useState('Generate OTP')
      const [spinner,setspinner] = useState(false)
     // const [navigateTo,setnavigateTo]:useState(props.navigation.getParam('navigateTo')),


    submitbtn =()=> {
        if (Name !== '') {
            setspinner(true)
            Axios.get(BaseUrl.getAppOtpGenerate +Name, {
                headers: {
                    'Authorization': 'bearer ' 
                }
            }).then((response) => {
                if (response.data.status == true) {
                    navigation.navigate('OtpLoginScreen', {
                        USERNAME: Name
                    });
                    Toast.show(response.data.response)
                   setspinner(false)
                } else {
                   setspinner(false)
                    Toast.show(response.data.response)
                }

            })
        } else {
            Toast.show('Please Enter Mobile/Email ID');
        }
    }


        return (
            <View style={LoginStyle.ViewContain}>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={LoginStyle.spinnerTextStyle}
                />
                <View style={{ padding: 10, marginTop: 30, marginLeft: 4, width: '99%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ alignItems: 'center', width: '98%' }} resizeMode={'stretch'} source={require('../../images/logoTSG.jpg')} />
                    <Text style={{ fontSize: 18, marginTop: 10, marginLeft: 2, color: ColorCode.StatusBar, }}>Disaster Management App</Text>
                </View>

                <View style={[LoginStyle.containersecond]}>

                    <View style={{ padding: 4, borderColor: ColorCode.StatusBar }}>
                        <Text style={{ fontSize: 20, marginTop: 16, alignItems: 'center', color: ColorCode.StatusBar, fontFamily: "Gilroy-Bold", }}>Login</Text>
                        <TextInput
                            placeholder="Enter Registered Email or Phone Number"
                            value={Name}
                            //labelFontSize={14}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType='email-address'
                            onChangeText={(Name) => {
                               setName(Name)
                            }}
                        />
<View style={{backgroundColor:'#001630',width:'99%',alignItems:'center', height: 1}}></View>
 
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={LoginStyle.AddToCardBtn}
                                onPress={() => this.submitbtn()}>
                                <Text style={LoginStyle.TextStyle}>{BtnName}</Text>
                            </TouchableOpacity>
                        </View>
            
                    </View>
                </View>
               <StatusBar/>
            </View>
        );
    }


