import React from 'react';
import {
    Image,
    StatusBar,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
// import Axios from 'axios';
import { TextField } from 'react-native-material-textfield';
// import AsyncStorage from '@react-native-community/async-storage';
// import Toast from 'react-native-simple-toast';
import LoginStyle from './style';
import colors from '../../util/Color_Value';
// import LoginApi from '../../../util/ApiCollection';
// import Spinner from 'react-native-loading-spinner-overlay';
export default class EmergencyScreen  extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            password: '',
            spinner: false,
        }
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
    getback = () => {
        this.props.navigation.navigate('DashboardStack')
    }
    render() {
        return (
            <View style={MFStyle.mainContent}>
                {/* <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={LoginStyle.spinnerTextStyle}
                /> */}
              <View style={MFStyle.HeaderBackground}>
                <TouchableOpacity
                    onPress={this.getback} >
                    <Image source={require('../../images/arrow.png')} style={{ width: 30, height: 20, marginRight: 20 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={MFStyle.HeaderText}>Emergency</Text>
                </View>
            </View>
                {/* <ScrollView style={{ flex: 1, marginTop: 10 }}>
                    <View style={MFStyle.containersecond}>
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
                        <TouchableOpacity
                            onPress={this.getforget}>
                            <Text style={MFStyle.TextFoget}>Problem with login ?</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={MFStyle.AddToCardBtn}
                                onPress={this.getlogin}>
                                <Text style={MFStyle.TextStyle}>Secure Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <StatusBar
                        backgroundColor='#3386FF'
                        barStyle='light-content'
                    />
                </ScrollView> */}
                {/* <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={MFStyle.AddToCardBtn}
                                onPress={this.getlogin}>
                                <Text style={MFStyle.TextStyle}>Secure Login</Text>
                            </TouchableOpacity>
                        </View> */}
            </View>
        );
    }
}
const MFStyle = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    HeaderText: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: 10,
        fontFamily: "Gilroy-Bold",
    },
    mainContent2: {
        flex: 1,
        justifyContent: 'center'
    },
    HeaderBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        backgroundColor: '#3386FF',
      //  marginLeft: 4,
        height: 60,

    },
    PickerView: {
        padding: 4,
        borderWidth: 1,
        width: '96%',
        marginLeft: 8,
        marginRight: 16,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button1: {
        // width: '48%',
        height: 90,
        // borderColor: Colors.Appcolor,
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        shadowRadius: 10,
        elevation: 1,
         marginTop: 4,
    },
    button2: {
        // width: '48%',
        height: 90,
        // borderColor: Colors.Appcolor,
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        shadowRadius: 10,
        elevation: 1,
         marginTop: 4,
         marginLeft:20,
    },
    TextInputStyle: {
        width: '86%',
        height: 40,
        margin: 8,
        backgroundColor: '#fff',
        marginBottom: 8,
        padding: 8,
        fontFamily: "Gilroy-SemiBold",
    },
    headerMain: {
        fontSize: 20,
        color: '#000',
        marginLeft: 10,
        marginRight: 4,
        borderColor: '#008800',
        borderRadius: 10,
        marginTop: 10,
        fontWeight: '400',
    },

    title: {
        fontSize: 22,
        color: '#000',
        textAlign: 'center',
        marginBottom: 16,
    },

    TextOneStyle: {
        color: '#000',
        fontWeight: '400',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-SemiBold",
        margin: 2,
        fontSize: 14,
    },
    TextStyleheader11: {
        color: '#000',
        fontWeight: '500',
        alignItems: 'flex-start',
        padding: 4,
        fontFamily: "Gilroy-Bold",
        fontSize: 12,
    },
    DateTextValue: {
        color: '#000',
        fontWeight: '300',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-Light",
        padding: 8,
        fontSize: 14,
    },
    mainContent: {
        flex: 1,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    mainContent2: {
        flex: 1,
        padding: 4,
        justifyContent: 'center'
    },
    PickerView: {
        padding: 4,
        borderWidth: 1,
        width: '96%',
        marginLeft: 8,
        marginRight: 16,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    TextStyle1: {
        textAlign: 'center',
        width: 80,
        color: '#000',
        // marginLeft: 10,
        marginBottom: 4,
        fontFamily: "Gilroy-Light",
        fontSize: 14,
    },
    TextInputStyle: {
        width: '86%',
        height: 40,
        margin: 8,
        backgroundColor: '#fff',
        marginBottom: 8,
        padding: 8,
        fontFamily: "Gilroy-SemiBold",
    },
    mainContent1: {
        flex: 1,
        //justifyContent: 'center',
    },
    headerMain: {
        fontSize: 20,
        color: '#000',
        marginLeft: 10,
        marginRight: 4,
        borderColor: '#008800',
        borderRadius: 10,
        marginTop: 10,
        fontWeight: '400',
    },

    title: {
        fontSize: 22,
        color: '#000',
        textAlign: 'center',
        marginBottom: 16,
    },
    header: {
        fontSize: 26,
        color: '#000',
        fontFamily: "Gilroy-SemiBold",

    },
    TextOneStyle: {
        color: '#000',
        fontWeight: '400',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-SemiBold",
        margin: 2,
        fontSize: 14,
    },
    TextStyleheader11: {
        color: '#000',
        fontWeight: '500',
        alignItems: 'flex-start',
        padding: 4,
        fontFamily: "Gilroy-Bold",
        fontSize: 12,
    },
    DateTextValue: {
        color: '#000',
        fontWeight: '300',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-Light",
        padding: 8,
        fontSize: 14,
    },
})


