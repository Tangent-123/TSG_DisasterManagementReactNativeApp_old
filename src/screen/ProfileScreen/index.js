import React, { Component } from 'react';
import { ScrollView, StatusBar, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../util/Color_Value';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import RegStyle from './style';
import UserUrl from '../../util/ApiCollection';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Axios from 'axios';
//import Spinner from 'react-native-loading-spinner-overlay';
//import LoginApi from '../../../util/ApiCollection';
//import AwesomeAlert from 'react-native-awesome-alerts';
import qs from 'qs';
var radio_props = [
    { label: 'Male', value: '0', },
    { label: 'Female', value: '1' }
];
export default class ProfileScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            Arn_number: '',
            FullName: '',
            City: '',
            Mobile: '',
            email: '',
            ContactMessage: '',
            spinner: false,
            showAlert: false,
            Companyname: '',
            firstName: '',
            MiddleName: '',
            LastNAme: '',
            EmergencyName: '',
            EmergencyConatct: '',
            bloodgroup: '',
            USER_ID: '',
            SYSTEM_ROLE_ID: '',
            SYSTEM_ROLE_CODE: '',
            Sex: 'Male',
            AccessToken: '',
            DateHired: '01-02-1988',
            SYSTEM_ROLE_NAME: '',
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('access_token')
            .then(access_token => {
                AsyncStorage.getItem('USER_ID')
                    .then(USER_ID => {
                        AsyncStorage.getItem('FIRST_NAME')
                            .then(FIRST_NAME => {
                                AsyncStorage.getItem('SYSTEM_ROLE_ID')
                                    .then(SYSTEM_ROLE_ID => {
                                        AsyncStorage.getItem('SYSTEM_ROLE_CODE')
                                            .then(SYSTEM_ROLE_CODE => {

                                                AsyncStorage.getItem('SYSTEM_ROLE_NAME')
                                                    .then(SYSTEM_ROLE_NAME => {



                                                        console.log('firdt' + access_token)
                                                        this.setState({
                                                            AccessToken: access_token,
                                                            USER_ID: USER_ID,
                                                            firstName: FIRST_NAME,
                                                            SYSTEM_ROLE_CODE: SYSTEM_ROLE_CODE,
                                                            SYSTEM_ROLE_ID: SYSTEM_ROLE_ID,
                                                            SYSTEM_ROLE_NAME: SYSTEM_ROLE_NAME,
                                                        });

                                                    })


                                            })
                                    })

                            })

                    })

            })

    }
    getUpdateData() {
        const data = JSON.stringify({
            ACTION: "PROFILE",
            DOB: this.state.DateHired,
            EMAIL_ID: this.state.email,
            FIRST_NAME: this.state.firstName,
            GENDER: this.state.Sex,
            LAST_NAME: this.state.LastNAme,
            LEVEL: 1,
            MIDDLE_NAME: this.state.MiddleName,
            MOBILE_NO: this.state.Mobile,
            ORGANISATION_SYS_ID: null,
            SYSTEM_ROLE_CODE: this.state.SYSTEM_ROLE_CODE,
            TITLE: "Mr.",
            USER_ID: this.state.USER_ID,
            USER_TYPE: 'null'
        });
        console.log('rohit jain' + data)
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'bearer ' + this.state.AccessToken
        };
        console.log('hearvgdh' + headers)
        Axios.post(UserUrl.UpdateUser,
            data,
            { headers }
        ).then(p => {
            console.log('Kapil j ' + (p.data.status))
            if (p.data.status == true) {
                Toast.show(p.data.response);
                this.props.navigation.navigate('DashboardStack');
                this.setState({
                    spinner: false,
                });

            } else {
                Toast.show(p.data.response);
                this.setState({
                    spinner: false,
                });
            }

        }).catch(function (error) {

        })

    }
    getback = () => {
        this.props.navigation.navigate('DashboardStack')
    }
    getRedio(value) {
        console.log('rohit' + value)
        if (value == '0') {
            this.setState({
                Sex: 'Male'
            });
        } else if (value == '1') {
            this.setState({
                Sex: 'Female'
            });
        }

    }
    render() {
        return (
            <View style={RegStyle.container}>
                {/* <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={RegStyle.spinnerTextStyle}
                /> */}
                <View style={RegStyle.HeaderBackground}>
                    <TouchableOpacity
                        onPress={this.getback} >
                        <Image source={require('../../images/arrow.png')} style={{ width: 30, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={RegStyle.headerItem}>Profile</Text>
                    </View>
                </View>
                <ScrollView style={{ flex: 1, padding: 10 }}>
                    <View style={RegStyle.containersecond}>
                        <TextInput
                            style={{ color: '#000', fontSize: 14 }}
                            placeholder="First Name"
                            editable={true}
                            onChangeText={(firstName) => this.setState({ firstName })}
                            value={this.state.firstName}
                        />
                        <View style={{ height: .5, backgroundColor: '#000', width: '99%' }} />
                        <TextInput
                            style={{ color: '#000', fontSize: 14 }}
                            placeholder="Middle Name"
                            editable={true}
                            onChangeText={(MiddleName) => this.setState({ MiddleName })}
                            value={this.state.MiddleName}
                        />
                        <View style={{ height: .5, backgroundColor: '#000', width: '99%' }} />
                        <TextInput
                            style={{ color: '#000', fontSize: 14 }}
                            placeholder="Last Name"
                            editable={true}
                            onChangeText={(LastNAme) => this.setState({ LastNAme })}
                            value={this.state.LastNAme}
                        />
                        <View style={{ height: .5, backgroundColor: '#000', width: '99%' }} />
                        <View style={{ marginLeft: 4, marginTop: 14 }}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonSize={10}
                                selectedButtonColor={'#70AFA7'}
                                buttonColor={'#dddedb'}
                                labelStyle={{ fontSize: 19, marginRight: 16, color: '#001630', fontFamily: "Gilroy-Medium", alignItems: 'center', marginRight: 48 }}
                                formHorizontal={true}
                                animation={true}
                                onPress={(Value) => { this.getRedio(Value) }}>
                            </RadioForm>
                        </View>

                        <TextInput
                            style={{ color: '#000', fontSize: 14 }}
                            placeholder="Mail ID"
                            editable={true}
                            onChangeText={(email) => this.setState({ email: email })}
                            value={this.state.email}
                        />
                        <View style={{ height: .5, backgroundColor: '#000', width: '99%' }} />
                        <TextInput
                            style={{ color: '#000', fontSize: 14 }}
                            placeholder="Mobile"
                            editable={true}
                            onChangeText={(Mobile) => this.setState({ Mobile })}
                            value={this.state.Mobile}
                        />
                        <View style={{ height: .5, backgroundColor: '#000', width: '99%' }} />

                        <DatePicker
                            style={{ width: '99%', padding: 4 }}
                            date={this.state.DateHired}
                            mode="date"
                            showIcon={true}
                            placeholder="Select Date"
                            format="DD-MM-YYYY"
                            minDate="01-10-2019"
                            maxDate="2200-06-01"
                            confirmBtnText="Confirm"
                            backgroundColor='#fff'
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'relative',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    alignItems: 'flex-start',
                                    marginLeft: 1,
                                    borderWidth: 0
                                }
                            }}
                            onDateChange={(DateHired) => { this.setState({ DateHired: DateHired }) }}
                        />

                        <View style={{ height: .8, backgroundColor: '#000', width: '99%', marginLeft: 4, marginRight: 8, }} />

                    </View>
                    <View style={RegStyle.container2}>
                        <TouchableOpacity
                            style={RegStyle.AddToCardBtn}
                            onPress={() => this.getUpdateData()}>
                            <Text style={RegStyle.TextStyle}>UPDATE PROFILE </Text>
                        </TouchableOpacity>
                    </View>

                    <StatusBar
                        backgroundColor="#3386FF"
                        barStyle='dark-content'
                    />
                </ScrollView>
                {/* <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Thank You"
                    message="We have received your signup request.Our team will get back to you within 24 hours"
                    closeOnTouchOutside={false}
                    titleStyle={RegStyle.text}
                    messageStyle={RegStyle.textheader}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Continue"
                    confirmButtonColor={Colors.Appcolor}
                    onConfirmPressed={() => {
                        this.props.navigation.navigate('login');
                        this.setState({
                            showAlert: false
                        })
                    }}
                /> */}
            </View>
        );
    }
}




