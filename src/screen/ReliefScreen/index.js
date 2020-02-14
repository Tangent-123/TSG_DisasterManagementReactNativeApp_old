import React, { Component } from 'react';
import { ScrollView, StatusBar, View, Image, Text, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../util/Color_Value';
//import Toast from 'react-native-simple-toast';
import RegStyle from './style';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
//import Axios from 'axios';
//import Spinner from 'react-native-loading-spinner-overlay';
//import LoginApi from '../../../util/ApiCollection';
//import AwesomeAlert from 'react-native-awesome-alerts';
var radio_props = [
    { label: 'Male', value: '0', },
    { label: 'Female', value: '1' }
];
export default class ReliefScreen extends React.Component {
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
        }
    }

    getReg = () => {
        this.props.navigation.navigate('DashboardStack')
        // if (this.state.FullName !== '') {
        //     if (this.state.City !== '') {
        //         if (this.state.Mobile !== '') {
        //             if (this.state.email !== '') {
        //                 if (this.state.ContactMessage !== '') {
        //                    // this.getRegApi();
        //                    this.props.navigation.navigate('DashboardStack')
        //                 } else {
        //                    // Toast.show('Please Enter Contact Message');
        //                 }
        //             } else {
        //               //  Toast.show('Please Enter Email Id');
        //             }
        //         } else {
        //            // Toast.show('Please Enter Mobile Number');
        //         }
        //     } else {
        //       //  Toast.show('Please Enter City Name');
        //     }
        // } else {
        //   //  Toast.show('Please Enter Full Name');
        // }


    }
    // getRegApi() {
    //     this.setState({
    //         spinner: true,
    //     })
    //     const formData = new FormData();
    //     formData.append('name', this.state.FullName);
    //     formData.append('mobile', this.state.Mobile);
    //     formData.append('email', this.state.email);
    //     formData.append('city', this.state.City);
    //     formData.append('intersted', 'Yes');
    //     formData.append('website', 'redvisiontech.com');
    //     formData.append('contact_message', this.state.ContactMessage);
    //     Axios.post(LoginApi.Registration, formData,
    //         { headers: { 'Content-Type': 'multipart/form-data' } })
    //         .then(p => {
    //             if (p.data.status == '1') {
    //                 console.log('rpojhgorn' + p.data.status)
    //                 this.setState({
    //                     spinner: false,
    //                     showAlert: true,
    //                 });
    //             } else {
    //                 Toast.show('Sorry Server Problem...');
    //                 this.setState({
    //                     spinner: false,
    //                     showAlert: true,
    //                 });
    //             }
    //         }).catch(error => {
    //             console.log("api error:" + error);
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

                        <TextField
                            label="First Name"
                            value={this.state.firstName}
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            onChangeText={(firstName) => { this.setState({ firstName: firstName }) }} />
                        <TextField
                            label="Middle Name"
                            value={this.state.MiddleName}
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            onChangeText={(MiddleName) => { this.setState({ MiddleName: MiddleName }) }} />
                        <TextField
                            label="Last Name"
                            value={this.state.LastNAme}
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            onChangeText={(LastNAme) => { this.setState({ LastNAme: LastNAme }) }} />


                        <View style={{ marginLeft: 4, marginTop: 4 }}>
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

                        <TextField
                            label="Blood Group"
                            value={this.state.bloodgroup}
                            returnKeyType='next'
                            keyboardType='numeric'
                            maxLength={16}
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            underlineColorAndroid="transparent"
                            onChangeText={(Mobile) => { this.setState({ Mobile: Mobile }) }} />
                        <TextField
                            value={this.state.email}
                            label="Email"
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType={'email-address'}
                            onChangeText={(email) => { this.setState({ email: email }) }} />
                        <TextField
                            label="Phone Number"
                            value={this.state.Mobile}
                            returnKeyType='next'
                            keyboardType='numeric'
                            maxLength={16}
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            underlineColorAndroid="transparent"
                            onChangeText={(Mobile) => { this.setState({ Mobile: Mobile }) }} />
                        {/* <TextField
                            label="Company name"
                            value={this.state.Companyname}
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{fontFamily:'Gilroy-Medium'}}
                            tintColor={'#70AFA7'}
                            style={{color:'#001630',fontSize:14}}
                            onChangeText={(City) => { this.setState({ City: City }) }} /> */}



                        <TextField
                            value={this.state.EmergencyName}
                            label="Emergency Conatct Name"
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType={'email-address'}
                            onChangeText={(email) => { this.setState({ email: email }) }} />
                        <TextField
                            value={this.state.EmergencyConatct}
                            label="Emergency Conatct Number"
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#70AFA7'}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType={'email-address'}
                            onChangeText={(email) => { this.setState({ email: email }) }} />

                    </View>
                    <View style={RegStyle.container2}>
                        <TouchableOpacity
                            style={RegStyle.AddToCardBtn}
                            onPress={this.getReg} >
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




