import React from 'react';
import {
    Image,
    StatusBar,
    Text,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import Axios from 'axios';
import { TextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import LoginStyle from './style';
import LoginApi from '../../util/ApiCollection';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import qs from 'qs';
import PasswordInputText from 'react-native-hide-show-password-input';
import ColorCode from '../../util/Color_Value';
export default class LoginActivity extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            password: '',
            SHAPassword: '',
            spinner: false,
        }
    }
    submitbtn = async () => {
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
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                };
                Axios.post(LoginApi.LoginUrl,
                    data,
                    headers
                ).then(p => {
                    if (p.data.status == 'TRUE') {
                        // AsyncStorage.setItem('ProfileData',p.data.access_token);
                        AsyncStorage.setItem('access_token', p.data.access_token);
                        AsyncStorage.setItem('token_type', p.data.token_type)
                        AsyncStorage.setItem('USER_ID', p.data.USER_ID);
                        AsyncStorage.setItem('FIRST_NAME', p.data.FIRST_NAME);
                        AsyncStorage.setItem('SYSTEM_ROLE_CODE', p.data.SYSTEM_ROLE_CODE);
                        AsyncStorage.setItem('SYSTEM_ROLE_NAME', p.data.SYSTEM_ROLE_NAME);
                        // AsyncStorage.setItem('.expires',p.data.expires);
                        AsyncStorage.setItem('SYSTEM_ROLE_ID', p.data.SYSTEM_ROLE_ID);
                        this.props.navigation.navigate('DashboardStack');

                        //             // "access_token": "IFt6R5VqdzQYRZxiAbEDA1AgT50cudCaUgXZ6yS8W2Noo_iUksFnXzMzOEa3eVLxBGkdJMESsZfJ3d3H8cI-_ofkf65sg0q_a-cSxzHgetoex8yYe2C8YzdlQzCa_S9qU6kMnoctzKdvtTuTzIgaiPi30jfoisGEdPY0ACox9SRLPNtQT_umRX1rAn0Iz1fF3jSJbh30Yl3CizB5bL3upSoGcmazoXC-F9I-i0Sp6YikTEfZPlAV0X_vJiQ4PPGA861u06tydB16zsQXq2M3fItF1PcXBlVgSo8zdUzHBc7TODZ8rn0WIMEqeQvSFKFU-Tdi4XD61CHexVlO-o_blWHc8TCAZ1WU1ZemYNxFH___95BBGsI2Lu1PKFIyriK7FsjsGyVeGFJjE-kfX6Hfr0KdRu7f7i9UHpCiHNh1f-iGrn51l8lqJkWwN1E3CLdz0i-3YeAd1Gpc_R1tNEU5rp_whwq5U4wSg-bbTrZjba4",
                        //             // "token_type": "bearer",
                        //             // "expires_in": 86399,
                        //             // "status": "TRUE",
                        //             // "response": "User login is successful.",
                        //             // "USER_ID": "1",
                        //             // "FIRST_NAME": "Saurabh",
                        //             // "INITIAL_LOGIN": "1",
                        //             // "TEMP_LOGIN": "0",
                        //             // "PASSWORD_EXPIRE": "0",
                        //             // "SYSTEM_ROLE_ID": "19",
                        //             // "SYSTEM_ROLE_CODE": "DV",
                        //             // "SYSTEM_ROLE_NAME": "Developer",
                        //             // "PASSWORD_CHANGE_HOUR_COUNT": "1392",
                        //             // "USER_ORGANISATION_ID": "1",
                        //             // "USER_ORGANISATION_NAME": "Tangent Tech Solutions",
                        //             // ".issued": "Mon, 06 Jan 2020 11:25:30 GMT",
                        //             // ".expires": "Tue, 07 Jan 2020 11:25:30 GMT"
                        this.setState({
                            spinner: false,
                        });

                    } else {
                        Toast.show(p.data.response);
                        this.setState({
                            spinner: false,
                        });
                    }
                }).catch();
                // const formData = new FormData();
                // formData.append('username', this.state.Name);
                // formData.append('password', this.state.SHAPassword);
                // formData.append('grant_type', 'password');
                // Axios.post(LoginApi.LoginUrl, formData,
                //     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
                //     .then(p => {
                //         if (p.data.status == 'TRUE') {
                //             console.log('[rohigrjkbvfjkvbj')
                //             this.props.navigation.navigate('DashboardStack')
                //             // "access_token": "IFt6R5VqdzQYRZxiAbEDA1AgT50cudCaUgXZ6yS8W2Noo_iUksFnXzMzOEa3eVLxBGkdJMESsZfJ3d3H8cI-_ofkf65sg0q_a-cSxzHgetoex8yYe2C8YzdlQzCa_S9qU6kMnoctzKdvtTuTzIgaiPi30jfoisGEdPY0ACox9SRLPNtQT_umRX1rAn0Iz1fF3jSJbh30Yl3CizB5bL3upSoGcmazoXC-F9I-i0Sp6YikTEfZPlAV0X_vJiQ4PPGA861u06tydB16zsQXq2M3fItF1PcXBlVgSo8zdUzHBc7TODZ8rn0WIMEqeQvSFKFU-Tdi4XD61CHexVlO-o_blWHc8TCAZ1WU1ZemYNxFH___95BBGsI2Lu1PKFIyriK7FsjsGyVeGFJjE-kfX6Hfr0KdRu7f7i9UHpCiHNh1f-iGrn51l8lqJkWwN1E3CLdz0i-3YeAd1Gpc_R1tNEU5rp_whwq5U4wSg-bbTrZjba4",
                //             // "token_type": "bearer",
                //             // "expires_in": 86399,
                //             // "status": "TRUE",
                //             // "response": "User login is successful.",
                //             // "USER_ID": "1",
                //             // "FIRST_NAME": "Saurabh",
                //             // "INITIAL_LOGIN": "1",
                //             // "TEMP_LOGIN": "0",
                //             // "PASSWORD_EXPIRE": "0",
                //             // "SYSTEM_ROLE_ID": "19",
                //             // "SYSTEM_ROLE_CODE": "DV",
                //             // "SYSTEM_ROLE_NAME": "Developer",
                //             // "PASSWORD_CHANGE_HOUR_COUNT": "1392",
                //             // "USER_ORGANISATION_ID": "1",
                //             // "USER_ORGANISATION_NAME": "Tangent Tech Solutions",
                //             // ".issued": "Mon, 06 Jan 2020 11:25:30 GMT",
                //             // ".expires": "Tue, 07 Jan 2020 11:25:30 GMT"
                //             console.log('')
                //             // AsyncStorage.setItem('Arn_id', JSON.stringify(p.data.data.arn_id))
                //             // AsyncStorage.setItem('NAME', p.data.data.name)
                //             // AsyncStorage.setItem('mobile', p.data.data.mobile)
                //           //  this.props.navigation.navigate('RootStack')
                //             this.setState({
                //                 spinner: false,
                //             });
                //         } else {
                //             Toast.show('please enter vaild Email and Password ');
                //             this.setState({
                //                 spinner: false,
                //             });
                //         }
                //     }).catch(error => {
                //         console.log("api error:" + error);
                //         Toast.show('responce' + error)
                //         this.setState({
                //             spinner: false,
                //         });
                //     });

                //console.log('rohit' + this.state.SHAPassword)
            } else {
                Toast.show('Please Enter Vaild Password');
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
                <View style={LoginStyle.HeaderBackground}>

                </View>
                <ScrollView style={{ flex: 1, marginTop: 10 }}>
                    <View style={LoginStyle.containersecond}>
                        <Image style={{ alignItems: 'center', width: '99%', justifyContent: 'center', height: 68 }} resizeMode={'stretch'} source={require('../../images/tsg_logo.png')} />
                        <Text style={{ fontSize: 22, alignItems: 'center', color: '#001630', fontFamily: "Gilroy-Bold", }}>Login</Text>
                        <TextField
                            label="Enter Username"
                            value={this.state.Name}
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType='email-address'
                            onChangeText={(Name) => {
                                this.setState({ Name })
                            }}
                        />
                        <TextField
                            value={this.state.password}
                            label="Password"
                            TextInput="password"
                            secureTextEntry={true}
                            returnKeyType='done'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            onChangeText={(password) => {
                                this.setState({ password })
                            }} /> 
                        {/* <View>
                            <PasswordInputText
                                value={this.state.password}
                                onChangeText={(password) => this.setState({ password }) }></PasswordInputText>
                        
                        </View> */}
                        {/* <TouchableOpacity
                            onPress={this.getforget}>
                            <Text style={LoginStyle.TextFoget}>Problem with login ?</Text>
                        </TouchableOpacity> */}
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={LoginStyle.AddToCardBtn}
                                onPress={() => this.submitbtn()}>
                                <Text style={LoginStyle.TextStyle}>Secure Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <StatusBar
                        backgroundColor={ColorCode.StatusBar}
                        barStyle='light-content'
                    />
                </ScrollView>
            </View>
        );
    }
}


