import React, { Component } from 'react';

import {
    Image,

    Text,
    ScrollView,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import Axios from 'axios';
//import { TextField, OutlinedTextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import LoginStyle from './style';
import LoginApi from '../../Util/ApiCollection';
import StatusBar from '../../Assets/StatusBar';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import qs from 'qs';
import Modal from 'react-native-modal';
//import PasswordInputText from 'react-native-hide-show-password-input';
import ColorCode from '../../Util/Color_Value';
var Count = 0;

export default class LoginActivity extends React.Component {
    _isMounted = false;
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            password: '',
            BtnName: 'Login',
            TermVisible: false,
            spinner: false,
        }
    }
    componentWillMount() {
        const Username = this.props.navigation.getParam('USERNAME')
        this.setState({
            Name: Username
        })
    }
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    logicdata() {
        this.setState({
            // LoginValue:'',
            TermVisible: false
        });
        this.props.navigation.navigate('DashboardScreen');

    }
    submitbtn() {
        if (this.state.Name !== '') {
            if (this.state.password !== '') {
                this.setState({
                    spinner: true
                })
                const data = qs.stringify({
                    username: this.state.Name,
                    password: this.state.password,
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
                        console.log('rohit'+JSON.stringify(p.data));
                        
                        // AsyncStorage.setItem('ProfileData',p.data.access_token);
                        AsyncStorage.setItem('access_token', p.data.access_token);
                        AsyncStorage.setItem('token_type', p.data.token_type)
                        AsyncStorage.setItem('USER_ID', p.data.USER_ID);
                        AsyncStorage.setItem('FIRST_NAME', p.data.FIRST_NAME);
                        AsyncStorage.setItem('SYSTEM_ROLE_CODE', p.data.SYSTEM_ROLE_CODE);
                        AsyncStorage.setItem('EmergencyName', p.data.EMERGENCY_NAME);
                        AsyncStorage.setItem('MobileNumber', p.data.MOBILE_NO);
                        AsyncStorage.setItem('EmergencyNumber', p.data.EMERGENCY_CONTACT);
                        if (p.data.DATA_PRIVACY == 'Y') {
                             this.props.navigation.navigate('DashboardScreen');
                            this.setState({
                                TermVisible: false
                            })
                        }else{
                             this.setState({
                                TermVisible: true
                            })
                        }

                        this.setState({
                            spinner: false,

                        });

                    } else {
                        Toast.show(p.data.error_description);
                        this.setState({
                            spinner: false,
                        });
                    }
                }).catch(Error);

            } else {
                Toast.show('Please Enter Vaild OTP');
            }
        } else {
            Toast.show('Please Enter Vaild Email id');
        }

    }


    render() {
        return (
            <View style={LoginStyle.ViewContain}>
                <Spinner
                    visible={this.state.spinner}
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
                        {/* <TextInput
                            PlaceHolder="Enter Username"
                            value={this.state.Name}
                            returnKeyType='next'
                            labelFontSize={14}
                            editable={false}
                            labelTextStyle={{ color: ColorCode.StatusBar, }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType='email-address'
                            onChangeText={(Name) => {
                                this.setState({ Name })
                            }}
                        /> */}
                        <TextInput
                            placeholder="Enter Username"
                            defaultValue={this.state.Name}
                            //labelFontSize={14}
                            editable={false}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType='email-address'
                            onChangeText={(Name) => {
                                this.setState({ Name })
                            }}
                        />
<View style={{backgroundColor:'#001630',width:'99%',alignItems:'center', height: 1}}></View>
                        {/* <OutlinedTextField
                            label="Enter OTP"
                            value={this.state.password}
                            returnKeyType='done'
                            labelFontSize={14}
                            labelTextStyle={{ color: ColorCode.StatusBar, }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType='number-pad'
                            onChangeText={(password) => {
                                this.setState({ password })
                            }}
                        /> */}
                        <TextInput
                            placeholder="Enter OTP"
                            //value={this.state.Name}
                            //labelFontSize={14}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType='number-pad'
                            onChangeText={(password) => {
                                this.setState({ password })
                            }}
                        />
<View style={{backgroundColor:'#001630',width:'99%',alignItems:'center', height: 1}}></View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={LoginStyle.AddToCardBtn}
                                onPress={() => this.submitbtn()}>
                                <Text style={LoginStyle.TextStyle}>{this.state.BtnName}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* </View> */}
                    </View>
                </View>
                <StatusBar/>
                <View>
                    <Modal isVisible={this.state.TermVisible}>
                        <View style={{ width: '100%', borderRadius: 10, justifyContent: 'center', backgroundColor: '#fff' }}>
                            <ScrollView style={{ margin: 10, padding: 10 }}>
                                <View style={{ justifyContent: 'center', marginTop: 4, alignItems: 'center' }}>
                                    <Text style={{ width: '99%', height: '99%' }}>{this.state.Term}</Text>
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
}


