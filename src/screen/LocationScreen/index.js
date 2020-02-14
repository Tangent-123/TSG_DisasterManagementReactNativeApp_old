import React from 'react';
import {
    Image,
    StatusBar,
    Text,
    ScrollView,
    TouchableOpacity,
    Picker,
    View
} from 'react-native';
// import Axios from 'axios';
import { TextField } from 'react-native-material-textfield';
// import AsyncStorage from '@react-native-community/async-storage';
// import Toast from 'react-native-simple-toast';
import LocationStyle from './style';
import colors from '../../util/Color_Value';
import qs from 'qs';
//import MapView from 'react-native-maps'
// import LoginApi from '../../../util/ApiCollection';
// import Spinner from 'react-native-loading-spinner-overlay';
export default class LocationScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            password: '',
            spinner: false,
            latitude: null,
            longitude: null,
            error: null,
        }
    }
    getback = () => {
        this.props.navigation.navigate('DashboardStack');
    }
    componentDidMount() {
        // const data = qs.stringify({
        //     username: this.state.Name,
        //     password: hash,
        //     grant_type: 'password',
        // });
        // const headers = {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // };
        // Axios.post(LoginApi.LoginUrl,
        //     data,
        //     headers
        // ).then(p => {
        //     if (p.data.status == 'TRUE') {
        //        // AsyncStorage.setItem('ProfileData',p.data.access_token);
        //         AsyncStorage.setItem('access_token',p.data.access_token);
        //         AsyncStorage.setItem('USER_ID',p.data.USER_ID);
        //         AsyncStorage.setItem('FIRST_NAME',p.data.FIRST_NAME);
        //         AsyncStorage.setItem('SYSTEM_ROLE_CODE',p.data.SYSTEM_ROLE_CODE);
        //         AsyncStorage.setItem('SYSTEM_ROLE_NAME',p.data.SYSTEM_ROLE_NAME);
        //        // AsyncStorage.setItem('.expires',p.data.expires);
        //         this.props.navigation.navigate('DashboardStack');

        //         //             // "access_token": "IFt6R5VqdzQYRZxiAbEDA1AgT50cudCaUgXZ6yS8W2Noo_iUksFnXzMzOEa3eVLxBGkdJMESsZfJ3d3H8cI-_ofkf65sg0q_a-cSxzHgetoex8yYe2C8YzdlQzCa_S9qU6kMnoctzKdvtTuTzIgaiPi30jfoisGEdPY0ACox9SRLPNtQT_umRX1rAn0Iz1fF3jSJbh30Yl3CizB5bL3upSoGcmazoXC-F9I-i0Sp6YikTEfZPlAV0X_vJiQ4PPGA861u06tydB16zsQXq2M3fItF1PcXBlVgSo8zdUzHBc7TODZ8rn0WIMEqeQvSFKFU-Tdi4XD61CHexVlO-o_blWHc8TCAZ1WU1ZemYNxFH___95BBGsI2Lu1PKFIyriK7FsjsGyVeGFJjE-kfX6Hfr0KdRu7f7i9UHpCiHNh1f-iGrn51l8lqJkWwN1E3CLdz0i-3YeAd1Gpc_R1tNEU5rp_whwq5U4wSg-bbTrZjba4",
        //         //             // "token_type": "bearer",
        //         //             // "expires_in": 86399,
        //         //             // "status": "TRUE",
        //         //             // "response": "User login is successful.",
        //         //             // "USER_ID": "1",
        //         //             // "FIRST_NAME": "Saurabh",
        //         //             // "INITIAL_LOGIN": "1",
        //         //             // "TEMP_LOGIN": "0",
        //         //             // "PASSWORD_EXPIRE": "0",
        //         //             // "SYSTEM_ROLE_ID": "19",
        //         //             // "SYSTEM_ROLE_CODE": "DV",
        //         //             // "SYSTEM_ROLE_NAME": "Developer",
        //         //             // "PASSWORD_CHANGE_HOUR_COUNT": "1392",
        //         //             // "USER_ORGANISATION_ID": "1",
        //         //             // "USER_ORGANISATION_NAME": "Tangent Tech Solutions",
        //         //             // ".issued": "Mon, 06 Jan 2020 11:25:30 GMT",
        //         //             // ".expires": "Tue, 07 Jan 2020 11:25:30 GMT"
        //         this.setState({
        //             spinner: false,
        //         });

        //     } else {
        //         Toast.show(p.data.Message);
        //         this.setState({
        //             spinner: false,
        //         });
        //     }
        // }).catch();
    }

    getlogin = () => {
        this.props.navigation.navigate('DashboardStack')
        if (this.state.Name !== '') {
            if (this.state.password !== '') {

                //  this.getApiLogin();
            } else {
                //  Toast.show('Please Enter Vaild Password');
            }
        } else {
            //  Toast.show('Please Enter Vaild Email id');
        }
    }
    // getApiLogin() {
    //     this.setState({
    //         spinner: true,
    //     });
    //     const formData = new FormData();
    //     formData.append('username', this.state.Name);
    //     formData.append('password', this.state.password);
    //     formData.append('loginType', '2');
    //     Axios.post(LoginApi.LoginUrl, formData,
    //         { headers: { 'Content-Type': 'multipart/form-data' } })
    //         .then(p => {
    //             if (p.data.status == true) {
    //                 AsyncStorage.setItem('Arn_id', JSON.stringify(p.data.data.arn_id))
    //                 AsyncStorage.setItem('NAME', p.data.data.name)
    //                 AsyncStorage.setItem('mobile', p.data.data.mobile)
    //                 this.props.navigation.navigate('RootStack')
    //                 this.setState({
    //                     spinner: false,
    //                 });
    //             } else {
    //                 Toast.show('please enter vaild Email and Password ');
    //                 this.setState({
    //                     spinner: false,
    //                 });
    //             }
    //         }).catch(error => {
    //             console.log("api error:" + error);
    //             Toast.show('responce' + error)
    //             this.setState({
    //                 spinner: false,
    //             });
    //         });

    // }

    render() {
        return (
            <View style={LocationStyle.ViewContain}>
                {/* <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={LoginStyle.spinnerTextStyle}
                /> */}
                <View style={LocationStyle.HeaderBackground}>
                    <TouchableOpacity
                        onPress={this.getback} >
                        <Image source={require('../../images/arrow.png')} style={{ width: 30, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={LocationStyle.headerItem}>Location</Text>
                    </View>
                </View>
                <ScrollView style={{ flex: 1, marginTop: 10 }}>
                    <View style={{ flex: 1, marginTop: 4, }}>
                        {/* <Text style={InvestDetailsStyle.TextGreenColor1}>Tr Mode</Text> */}
                        <View style={{ marginTop: 0 }}>
                            <Picker
                                mode='dropdown'
                                style={{ fontSize: FontSizeValue.NinteenPoint, color: '#4E5764', fontFamily: "Gilroy-Medium", }}
                                //   itemTextStyle={{ fontSize: 19, color: '#4E5764', fontFamily: "Gilroy-Medium", }}

                                //  textStyle={{ fontSize: 19, color: '#4E5764', fontFamily: "Gilroy-Medium", }}
                                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: 'Gilroy-Bold', fontSize: FontSizeValue.SeventeenPoint }}
                                selectedValue={this.state.mode}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ mode: itemValue })
                                }>
                                <Picker.Item label='Physical' value='p' color='#4E5764' />
                                <Picker.Item label='Demat' value='d' color='#4E5764' />
                            </Picker>
                            <View style={{ height: .8, backgroundColor: '#000000', marginLeft: 8, marginRight: 8, marginTop: 4 }} />
                            <StatusBar
                                backgroundColor='#3386FF'
                                barStyle='light-content'
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


