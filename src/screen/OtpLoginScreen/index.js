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
import qs from 'qs';
import Modal from 'react-native-modal';
import ColorCode from '../../Util/Color_Value';
import Constants from '../../Util/Config/Constants';
import { connect } from 'react-redux';

   export default function LoginActivity({navigation}) {

    const[Name,setName] = useState('')
    const[password,setpassword]=useState('')
    const[BtnName,setBtnName] =useState('Login')
    const[TermVisible,setTermVisible] =useState(false)
    const[spinner,setspinner] =useState(false)
    const[Term,setTerm] =useState("Lorem ipsum dolor sit amet" +
                "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam"
                + "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit"
                + "in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui"
                + "officia deserunt mollit anim id est laborum."
                + "Curabitur pretium tincidunt lacus.Nulla gravida orci a odio.Nullam varius,"
                + "turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin"
                + "mauris.Integer in mauris eu nibh euismod gravida.Duis ac tellus et risus vulputate "
                + "vehicula.Donec lobortis risus a elit.Etiam tempor.Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis,"
                + "id tincidunt sapien risus a quam.Maecenas fermentum consequat mi.Donec fermentum.Pellentesque malesuada nulla a mi.Duis sapien sem,"
                + "aliquet nec, commodo eget, consequat quis, neque.Aliquam faucibus, elit ut dictum aliquet,"
                + "felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.Cras mollis scelerisque nunc."
                + "Nullam arcu.Aliquam consequat.Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi.Aenean magna nisl,"
                + "mollis quis, molestie eu, feugiat in, orci.In hac habitasse platea dictumst")
   
    useEffect(()=> {
        const Username = navigation.getParam('USERNAME')
       setName(Username)
    })
    
    logicdata=() =>{
    setTermVisible(false)
    navigation.navigate('DashboardScreen');
    }

      submitbtn = () =>{
       // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if (Name == '') {
            Toast.show('Please enter valid e-mail address.')
        } else if(password == ''){
            Toast.show('Please enter password.')
    
        } else{
        
           setspinner(true)
                const data = qs.stringify({
                     username: Name,
                     password: password,
                    grant_type: 'password',
                });
                const headers = {
                    // 'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
                Axios.post(LoginApi.LoginUrl,
                    data,
                    {headers}
                ).then(p => {
                    if (p.data.status == 'TRUE') {
                        console.log('hhhhhhhhhh'+(p.data.USER_ID))
                        AsyncStorage.setItem(Constants.access_token, p.data.access_token);
                        AsyncStorage.setItem(Constants.tokentype, p.data.token_type)
                        AsyncStorage.setItem(Constants.user_id, p.data.USER_ID);
                        AsyncStorage.setItem(Constants.firstname, p.data.FIRST_NAME);
                        AsyncStorage.setItem(Constants.system_roll_code, p.data.SYSTEM_ROLE_CODE);
                        AsyncStorage.setItem(Constants.emergencyname, p.data.EMERGENCY_NAME);
                        AsyncStorage.setItem(Constants.mobilenumber, p.data.MOBILE_NO);
                        AsyncStorage.setItem(Constants.emergencynumber, p.data.EMERGENCY_CONTACT);
                        if (p.data.DATA_PRIVACY == 'Y') {
                             navigation.navigate('DashboardScreen');
                                setTermVisible(false)
            
                        }else{
                             setTermVisible(true)
                        }
                            setspinner(false)

                    } else {
                        Toast.show(p.data.error_description);
                        setspinner(false)
                    }
                }).catch(Error);

        }

    }
    // submitbtn=()=> {
    //     if (Name !== '') {
    //         if (password !== '') {
    //            setspinner(true)
    //             const data = qs.stringify({
    //                 username: Name,
    //                 password: password,
    //                 grant_type: 'password',
    //             });
    //             const headers = {
    //                 // 'Accept': 'application/x-www-form-urlencoded',
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             };
    //             Axios.post(LoginApi.LoginUrl,
    //                 data,
    //                 {headers}
    //             ).then(p => {
    //                 if (p.data.status == 'TRUE') {
    //                     console.log('hhhhhhhhhh'+JSON.stringify(p.data))
    //                     AsyncStorage.setItem(Constants.token, p.data.access_token);
    //                     AsyncStorage.setItem(Constants.tokentype, p.data.token_type)
    //                     AsyncStorage.setItem(Constants.user_id, p.data.USER_ID);
    //                     AsyncStorage.setItem(Constants.firstname, p.data.FIRST_NAME);
    //                     AsyncStorage.setItem(Constants.system_roll_code, p.data.SYSTEM_ROLE_CODE);
    //                     AsyncStorage.setItem(Constants.emergencyname, p.data.EMERGENCY_NAME);
    //                     AsyncStorage.setItem(Constants.mobilenumber, p.data.MOBILE_NO);
    //                     AsyncStorage.setItem(Constants.emergencynumber, p.data.EMERGENCY_CONTACT);
    //                     if (p.data.DATA_PRIVACY == 'Y') {
    //                          navigation.navigate('DashboardScreen');
    //                             setTermVisible(false)
            
    //                     }else{
    //                          setTermVisible(true)
    //                     }
    //                         setspinner(false)

    //                 } else {
    //                     Toast.show(p.data.error_description);
    //                     setspinner(false)
    //                 }
    //             }).catch(Error);

    //         } else {
    //             Toast.show('Please Enter Vaild OTP');
    //         }
    //     } else {
    //         Toast.show('Please Enter Vaild Email id');
    //     }

    // }



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
                {/* <View style={LoginStyle.ViewContain1}> */}
                <View style={[LoginStyle.containersecond]}>

                    <View style={{ padding: 4, borderColor: ColorCode.StatusBar }}>
                        <Text style={{ fontSize: 20, marginTop: 16, alignItems: 'center', color: ColorCode.StatusBar, fontFamily: "Gilroy-Bold", }}>Login</Text>
                        
                        <TextInput
                            placeholder="Enter Username"
                            defaultValue={Name}
                            //labelFontSize={14}
                            editable={false}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType='email-address'
                            onChangeText={(Name) => {
                                setName(Name)
                            }}
                        />
<View style={{backgroundColor:'#001630',width:'99%',alignItems:'center', height: 1}}></View>
                        <TextInput
                            placeholder="Enter OTP"
                            value={password}
                            //labelFontSize={14}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType='number-pad'
                            onChangeText={(password) => {
                        setpassword(password)
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
                        {/* </View> */}
                    </View>
                </View>
                <StatusBar/>
                <View>
                    <Modal isVisible={TermVisible}>
                        <View style={{ width: '100%', borderRadius: 10, justifyContent: 'center', backgroundColor: '#fff' }}>
                            <ScrollView style={{ margin: 10, padding: 10 }}>
                                <View style={{ justifyContent: 'center', marginTop: 4, alignItems: 'center' }}>
                                    <Text style={{ width: '99%', height: '99%' }}>{Term}</Text>
                                </View>
                            </ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                <View style={{ width: '46%', marginLeft: 10 }}>
                                    <TouchableOpacity
                                        style={{
                                            width: '96%',
                                            height: 40,
                                            padding: 4,
                                            backgroundColor: 'green',
                                            justifyContent: 'center',
                                            borderRadius: 4,
                                            alignItems: 'center',
                                            marginTop: 10,
                                        }}
                                        onPress={() => this.logicdata()}>
                                        <Text style={RegStyle.TextStyle}>Accept</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: '46%', marginRight: 10 }}>
                                    <TouchableOpacity
                                        style={{
                                            width: '99%',
                                            height: 40,
                                            padding: 4,
                                            backgroundColor: 'red',
                                            justifyContent: 'center',
                                            borderRadius: 4,
                                            alignItems: 'center',
                                            marginTop: 10,
                                        }}
                                        onPress={() => RNExitApp.exitApp()}>
                                        <Text style={RegStyle.TextStyle}>Cancel </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }




