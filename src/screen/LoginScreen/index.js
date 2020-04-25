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
//import { TextField , OutlinedTextField} from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import LoginStyle from './style';
import LoginApi from '../../Util/ApiCollection';
import StatusBar from '../../Assets/StatusBar';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import qs from 'qs';
//import PasswordInputText from 'react-native-hide-show-password-input';
import ColorCode from '../../Util/Color_Value';

export default class LoginActivity extends React.Component {
    _isMounted = false;
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            BtnName: 'Generate OTP',
            spinner: false,
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    submitbtn() {
       
        if (this.state.Name !== '') {
             this.setState({
            spinner:true
        })
            Axios.get("http://Devapi.tatadisasterresponse.com/api/get-app-otp-generate?email=" + this.state.Name, {
                headers: {
                    'Authorization': 'bearer ' + this.state.AccessToken
                }
            }).then((response) => {
                if (response.data.status == true) {
                    this.props.navigation.navigate('OtpLoginScreen', {
                        USERNAME: this.state.Name
                    });
                    Toast.show(response.data.response)
                    this.setState({
                    
                        spinner:false,
                    })
                } else {
                    this.setState({
                        spinner:false
                    })
                    Toast.show(response.data.response)
                }



            })
        } else {
            Toast.show('Please Enter Mobile/Email ID');
        }
        // } else {
        //     if (this.state.Name !== '') {
        //         if (this.state.password == '') {
        //             this.setState({
        //                 spinner: true
        //             })
        //             const data = qs.stringify({
        //                 username: this.state.Name,
        //                 password: this.state.password,
        //                 grant_type: 'password',
        //             });
        //             const headers = {
        //                 // 'Accept': 'application/x-www-form-urlencoded',
        //                 'Content-Type': 'application/x-www-form-urlencoded',
        //             };
        //             Axios.post(LoginApi.LoginUrl,
        //                 data,
        //                 headers
        //             ).then(p => {
        //                 if (p.data.status == 'TRUE') {
        //                     // AsyncStorage.setItem('ProfileData',p.data.access_token);
        //                     AsyncStorage.setItem('access_token', p.data.access_token);
        //                     AsyncStorage.setItem('token_type', p.data.token_type)
        //                     AsyncStorage.setItem('USER_ID', p.data.USER_ID);
        //                     AsyncStorage.setItem('FIRST_NAME', p.data.FIRST_NAME);
        //                     AsyncStorage.setItem('SYSTEM_ROLE_CODE', p.data.SYSTEM_ROLE_CODE);
        //                     AsyncStorage.setItem('EmergencyName', p.data.EMERGENCY_NAME);
        //                     AsyncStorage.setItem('MobileNumber', p.data.MOBILE_NO);
        //                     AsyncStorage.setItem('EmergencyNumber', p.data.EMERGENCY_CONTACT);
        //                     this.props.navigation.navigate('DashboardStack');
        //                     this.setState({
        //                         spinner: false,
        //                     });

        //                 } else {
        //                     Toast.show(p.data.error_description);
        //                     this.setState({
        //                         spinner: false,
        //                     });
        //                 }
        //             }).catch(Error);

        //         } else {
        //             Toast.show('Please Enter Vaild Password');
        //         }
        //     } else {
        //         Toast.show('Please Enter Vaild Email id');
        //     }
        // }
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
                        <TextInput
                            placeholder="Enter Registered Email or Phone Number"
                            //value={this.state.Name}
                            //labelFontSize={14}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType='email-address'
                            onChangeText={(Name) => {
                                this.setState({ Name })
                            }}
                        />
<View style={{backgroundColor:'#001630',width:'99%',alignItems:'center', height: 1}}></View>
                         {/* <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/> */}
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
            </View>
        );
    }
}


