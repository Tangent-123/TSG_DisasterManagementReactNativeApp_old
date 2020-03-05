import React, { Component } from 'react';
import { ScrollView, StatusBar, View, Image, Text, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../util/Color_Value';
//import Toast from 'react-native-simple-toast';
import RegStyle from './style';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
//import Axios from 'axios';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
//import Spinner from 'react-native-loading-spinner-overlay';
import Axios from 'axios';
//import LoginApi from '../../../util/ApiCollection';
//import AwesomeAlert from 'react-native-awesome-alerts';
import commanStyle from '../../util/Header';
var radio_props = [
    { label: 'Emergency Phase', value: '0', },
    { label: 'Relief Phase', value: '1' }
];
const options = {
    title: 'Select Photo',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Gallery' }],
    storageOptions: {
        skipBackup: false,
        path: 'images',
    },
};
let count = 0;
export default class PostMyActivityScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            Arn_number: '',
            ActivityName: '',
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
            StartDate: '',
            Description: '',
            EndDate:'',
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
    getRedio(value) {
        if (value == '0') {
            this.setState({
                value: 'Lumpsum'
            });
        } else if (value == '1') {
            // this.getSipDetails();
            this.setState({
                value: 'sip'
            });
        }

    }
    getImage() {
        count++;
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let SourceImage = { uri: response.uri, type: response.type, name: response.fileName };
                if (SourceImage == '') {
                    console.log('SourceImage' + SourceImage)
                } else {
                    console.log('count' + count)
                    if (count == 1) {
                        let SourceImage = { uri: response.uri, type: response.type, name: response.fileName };
                        const source = { uri: 'data:image/jpg;base64,' + response.data };
                        
                       // this.UploadingCommanAPIFirst();
                        // this.setState({
                        //     avatarSourceOne: response.data,
                        //     ImageNameOne: response.fileName,
                        // })
                    }
                }
            }
        })
    }
    render() {
        return (
            <View style={commanStyle.MainView}>
                {/* <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={RegStyle.spinnerTextStyle}
                /> */}
                <View style={RegStyle.HeaderBackground}>
                    <TouchableOpacity
                        onPress={this.getback} >
                        <Image source={require('../../images/back.png')} style={{ width: 30, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={RegStyle.headerItem}>Post My Activity</Text>
                    </View>
                </View>
                <ScrollView style={{ flex: 1, padding: 4 }}>
                    <View style={RegStyle.containersecond}>

                        <TextField
                            label="Activity Name"
                            value={this.state.ActivityName}
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#3386FF'}
                            style={{ color: '#001630', fontSize: 14 }}
                            onChangeText={(ActivityName) => { this.setState({ ActivityName: ActivityName }) }} />

                        <Text style={RegStyle.headerItem1}>Activity Phase</Text>
                        <View style={{ marginLeft: 4, marginTop: 8 }}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonSize={8}
                                selectedButtonColor={'#3386FF'}
                                buttonColor={'#dddedb'}
                                labelStyle={{ fontSize: 15, marginRight: 10, color: '#001630', fontFamily: "Gilroy-Medium", alignItems: 'center', marginRight: 20 }}
                                formHorizontal={true}
                                animation={true}
                                onPress={(Value) => { this.getRedio(Value) }}>
                            </RadioForm>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', }}>
                            <DatePicker
                                date={this.state.StartDate}
                                mode="date"
                                placeholder="Start Date"
                                format="YYYY-MM-DD"
                                style={{ width: '90%', fontFamily: "Gilroy-Medium" }}
                                minDate={this.state.CurrentDate}
                                showIcon={false}
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
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(StartDate) => { this.setState({ StartDate: StartDate }) }}
                            />
                            <Image source={require('../../images/dates.png')} style={{ width: 26, height: 26, }} resizeMode={'stretch'} />
                        </View>
                        <View style={{ height: .5, backgroundColor: '#000', marginLeft: 2, marginRight: 2, }} />
                        <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', }}>
                            <DatePicker
                                date={this.state.EndDate}
                                mode="date"
                                placeholder="End Date"
                                format="YYYY-MM-DD"
                                style={{ width: '90%', fontFamily: "Gilroy-Medium" }}
                                minDate={this.state.CurrentDate}
                                showIcon={false}
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
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(EndDate) => { this.setState({ EndDate: EndDate }) }}
                            />
                            <Image source={require('../../images/dates.png')} style={{ width: 26, height: 26, }} resizeMode={'stretch'} />
                        </View>
                        <View style={{ height: 1, backgroundColor: '#000', marginLeft: 2, marginRight: 2, }} />

                        <TextField
                            value={this.state.Description}
                            label="Description"
                            returnKeyType='next'
                            labelFontSize={14}
                            labelTextStyle={{ fontFamily: 'Gilroy-Medium' }}
                            tintColor={'#3386FF'}
                            style={{ color: '#001630', fontSize: 14 }}
                            keyboardType={'email-address'}
                            lineWidth={1}
                            onChangeText={(Description) => { this.setState({ Description: Description }) }} />

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, height: 50, marginTop: 18 }}>
                            <TouchableOpacity
                                onPress={() => this.getImage()}>
                                <View style={{ flexDirection: 'column', marginLeft: 4, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 10, alignItems: 'center', padding: 8, marginLeft: 4, marginRight: 10 }} source={require('../../images/camera.png')} />
                                    {/* <Text style={styles.TextStyleheader1}>Add Image</Text> */}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.getImage()}>
                                <View style={{ flexDirection: 'column', marginLeft: 4, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 10, alignItems: 'center', padding: 8, marginLeft: 4, marginRight: 10 }} source={require('../../images/camera.png')} />
                                    {/* <Text style={styles.TextStyleheader1}>Add Image</Text> */}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.getImage()}>
                                <View style={{ flexDirection: 'column', marginLeft: 4, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 10, alignItems: 'center', padding: 8, marginLeft: 4, marginRight: 10 }} source={require('../../images/camera.png')} />
                                    {/* <Text style={styles.TextStyleheader1}>Add Image</Text> */}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={RegStyle.container2}>
                        <TouchableOpacity
                            style={RegStyle.AddToCardBtn}
                            onPress={this.getReg} >
                            <Text style={RegStyle.TextStyle}>POST </Text>
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
            </View >
        );
    }
}




