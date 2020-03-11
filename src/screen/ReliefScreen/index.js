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
import CommanStyle from '../../util/Header';
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
        this.props.navigation.navigate('DashboardStack');
    }
    getbeneficial = () => {
        this.props.navigation.navigate('CountBeneficaryStack');
    }
    render() {
        return (
            <View style={CommanStyle.MainView}>
                {/* <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={RegStyle.spinnerTextStyle}
                /> */}
                <View style={CommanStyle.HeaderBackground}>
                    <TouchableOpacity
                        onPress={this.getback} >
                        <Image source={require('../../images/back.png')} style={{ width: 20, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={CommanStyle.headerItem}>Relief Phase</Text>
                    </View>
                </View>
                <ScrollView style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1 }}>

                        <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, width: '94%', marginEnd: 10 }}>

                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                onPress={() => this.getbeneficial()}>
                                <View style={{ flexDirection: 'row', height: 70, alignItems: 'center', marginLeft: 6, marginRight: 8, width: '90%' }}>
                                    <Image source={require('../../images/appointment2.png')} style={{ width: 30, height: 20, marginRight: 20 }} />
                                    <Text style={{ fontSize: 16, color: '#000' }}>Beneficiary list</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, width: '94%', marginEnd: 10 }}>

                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                onPress={() => this.getbeneficial()}>
                                <View style={{ flexDirection: 'row', height: 70, alignItems: 'center', marginLeft: 6, marginRight: 8, width: '90%' }}>

                                    <Image source={require('../../images/appointment2.png')} style={{ width: 30, height: 20, marginRight: 20 }} />

                                    <Text style={{ fontSize: 16, color: '#000' }}>Verify List</Text>

                                </View>

                            </TouchableOpacity>
                        </View>

                        <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, width: '94%', marginEnd: 10 }}>

                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                onPress={() => this.getbeneficial()}>
                                <View style={{ flexDirection: 'row', height: 70, alignItems: 'center', marginLeft: 6, marginRight: 8, width: '90%' }}>

                                    <Image source={require('../../images/appointment2.png')} style={{ width: 30, height: 20, marginRight: 20 }} />

                                    <Text style={{ fontSize: 16, color: '#000' }}>Final List</Text>

                                </View>

                            </TouchableOpacity>
                        </View>





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




