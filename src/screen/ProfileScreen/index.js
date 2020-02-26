import React, { Component } from 'react';
import { ScrollView, StatusBar, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import BaseUrl from '../../util/ApiCollection';
import RadioForm from 'react-native-simple-radio-button';
import Axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import qs from 'qs';
import ProfileStyle from './style';

var radio_props = [
    { label: 'Male', value: '0', },
    { label: 'Female', value: '1' }
];
export default class ProfileScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
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
        if (this.state.firstName !== '') {
            if (this.state.MiddleName !== '') {
                if (this.state.LastNAme !== '') {
                    if (this.state.email !== '') {
                        if (this.state.Mobile !== '') {
                            if (this.state.DateHired !== '') {

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
                                Axios.post(BaseUrl.UpdateUser,
                                    data,
                                    { headers }
                                ).then(p => {
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
                            } else {
                                Toast.show('Please Enter Date')
                            }
                        } else {
                            Toast.show('Please Enter Mobile Number')
                          
                        }
    
                } else {
                    Toast.show('Please Enter Registered Mail Id')
                }
            } else {
                Toast.show('Please Enter Last Name')
            }
            } else {
                Toast.show('Please Enter Middle Name')
            }
        } else {
        
            Toast.show('Please Enter First Name')
        }
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
            <View style={ProfileStyle.container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={RegStyle.spinnerTextStyle}
                />
                <View style={ProfileStyle.HeaderBackground}>
                    <TouchableOpacity
                        onPress={this.getback} >
                        <Image source={require('../../images/back.png')} style={{ width: 24, height: 22, padding: 5, marginRight: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={ProfileStyle.headerItem}>Profile</Text>
                    </View>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={ProfileStyle.containersecond}>
                        <TextInput
                            style={{ color: '#000', fontSize: 16 }}
                            placeholder="First Name"
                            editable={true}
                            onChangeText={(firstName) => this.setState({ firstName })}
                            value={this.state.firstName}
                        />
                        <View style={{ height: .8, backgroundColor: '#000', width: '99%' }} />
                        <TextInput
                            style={{ color: '#000', fontSize: 16 }}
                            placeholder="Middle Name"
                            editable={true}
                            onChangeText={(MiddleName) => this.setState({ MiddleName })}
                            value={this.state.MiddleName}
                        />
                        <View style={{ height: 1, backgroundColor: '#000', width: '99%' }} />
                        <TextInput
                            style={{ color: '#000', fontSize: 16 }}
                            placeholder="Last Name"
                            editable={true}
                            onChangeText={(LastNAme) => this.setState({ LastNAme })}
                            value={this.state.LastNAme}
                        />
                        <View style={{ height: 1, backgroundColor: '#000', width: '99%', marginBottom: 10 }} />
                        <View style={{ marginTop: 12 }}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonSize={10}
                                selectedButtonColor={'#70AFA7'}
                                buttonColor={'#dddedb'}
                                labelStyle={{ fontSize: 18, marginRight: 20, color: '#001630', fontFamily: "Gilroy-Medium", alignItems: 'center', marginRight: 48 }}
                                formHorizontal={true}
                                animation={true}
                                onPress={(Value) => { this.getRedio(Value) }}>
                            </RadioForm>
                        </View>

                        <TextInput
                            style={{ color: '#000', fontSize: 16 }}
                            placeholder="Mail ID"
                            editable={true}
                            keyboardType={'email-address'}
                            onChangeText={(email) => this.setState({ email: email })}
                            value={this.state.email}
                        />
                        <View style={{ height: 1, backgroundColor: '#000', width: '99%' }} />
                        <TextInput
                            style={{ color: '#000', fontSize: 16 }}
                            placeholder="Mobile Number"
                            editable={true}
                            keyboardType={'phone-pad'}
                            maxLength={12}
                            onChangeText={(Mobile) => this.setState({ Mobile })}
                            value={this.state.Mobile}
                        />
                        <View style={{ height: 1, backgroundColor: '#000', width: '99%' }} />

                        <DatePicker
                            style={{ width: '99%', padding: 6 }}
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

                        <View style={{ height: 1, backgroundColor: '#000', width: '99%', marginRight: 8, }} />

                    </View>

                    <View style={ProfileStyle.container2}>
                        <TouchableOpacity
                            style={ProfileStyle.AddToCardBtn}
                            onPress={() => this.getUpdateData()}>
                            <Text style={RegStyle.TextStyle}>UPDATE PROFILE </Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar
                        backgroundColor="#3386FF"
                        barStyle='dark-content'
                    />
                </ScrollView>

            </View>
        );
    }
}




