import React, { Component } from 'react';
import { ScrollView,TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import Colors from '../../Util/Color_Value';
import Toast from 'react-native-simple-toast';
import RegStyle from './style';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import StatusBar from '../../Assets/StatusBar';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from 'axios';
import LevelStore from '../../Componenet/ReactString';
import StoreHeader from '../../Header';
import FlatButton from '../../Button';
import LoginApi from '../../Util/ApiCollection';
import commanStyle from '../../Util/Header';
import AsyncStorage from '@react-native-community/async-storage';
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
            ActivityPhase:'',
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
            AccessToken:''
        }
    }
  componentWillMount() {
        AsyncStorage.getItem('access_token')
            .then(access_token => {
                this.setState({
                    AccessToken:access_token
                });
            })
  }
    getPostGallary = () => {
        if (this.state.ActivityName !== '') {
            if (this.state.StartDate !== '') {
                if (this.state.EndDate !== '') {
                    if (this.state.Description !== '') {
         this.setState({
            spinner: true,
        })
        const data = JSON.stringify({
                                                       ACTIVITY_NAME: this.state.ACTIVITY_NAME,
         ACTIVITY_PHASE: this.state.ActivityPhase,
         START_DATE: this.state.StartDate,
         END_DATE: this.state.EndDate,
         DESCRIPTION: this.state.Description,
         IMAGE_NAME: 'POLTU',
         CAPTION: 'NICE'

                                                    });
                                                    console.log('rohit' + data)
                                                    const headers = {
                                                        'content-type': 'application/json',
                                                        'Authorization': 'bearer ' + this.state.AccessToken
                                                    };
                                                    Axios.post(LoginApi.PostGallaryAdd,
                                                        data,
                                                        { headers }
                                                    ).then(p => {
                                                        console.log('kfnnk' + JSON.stringify(p.data.status))
                                                        if (p.data.status == 'true') {
                       this.props.navigation.navigate('DashboardStack')
                                                           // this.props.navigation.navigate('Count//BeneficaryScreen');
                                                            Toast.show(p.data.response)
                                                            this.setState({
                                                                spinner: false,
                                                            });

                                                        } else {
                                                             Toast.show(p.data.error_description);
                                                            this.setState({
                                                                spinner: false,
                                                            });
                                                        }
                                                    }).catch(function (error) {
                                                        Toast.show(error)
                                                        this.setState({
                                                            spinner: false
                                                        })

                                                    })
                    } else {
                        Toast.show('Please Enter Description Details');
                    }
                } else {
                 Toast.show('Please Enter End Date');
                }
            } else {
                Toast.show('Please Enter Start Date');
            }
        } else {
            Toast.show('Please Enter Activity Name');
        }
    }

    getback = () => {
        this.props.navigation.navigate('DashboardStack');
    }
    getRedio(value) {
        if (value == '0') {
            this.setState({
                ActivityPhase: 'Emergency Phase'
            });
        } else if (value == '1') {
            // this.getSipDetails();
            this.setState({
                ActivityPhase: 'Relief Phase'
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
            <View style={RegStyle.container}>
             <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={RegStyle.spinnerTextStyle}
                /> 
                <StoreHeader title ='Post My Activity' onPress={this.getback}/>
                <ScrollView style={{ flex: 1 }}>
                    <View style={RegStyle.containersecond}>
<Text style={{ color: '#3386FF', fontSize: 16, marginTop: 10, fontWeight: '700' }}>Activity Name</Text>

                        <TextInput
                            style={{ color: '#000', fontSize: 16 }}
                            placeholder="Activity Name"
                            editable={true}
                            onChangeText={(ActivityName) => this.setState({ ActivityName })}
                            value={this.state.ActivityName}
                        />
                        <View style={{ height: 1, backgroundColor: '#000', width: '100%', marginBottom: 4 }} />
                       <Text style={{ color: '#3386FF', fontSize: 16, marginTop: 10, fontWeight: '700' }}>Activity Phase</Text>
                        <View style={{  marginTop: 16 }}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonSize={10}
                                selectedButtonColor={'#3386FF'}
                                buttonColor={'#dddedb'}
                                labelStyle={{ fontSize: 15, marginRight: 10, color: '#001630', fontFamily: "Gilroy-Medium", alignItems: 'center', marginRight: 20 }}
                                formHorizontal={true}
                                animation={true}
                                onPress={(Value) => { this.getRedio(Value) }}>
                            </RadioForm>
                        </View>
                         <Text style={{ color: '#3386FF', fontSize: 16, marginTop: 10, fontWeight: '700' }}>Activity Start Date</Text>
                        <View style={{ alignItems: 'center', marginTop: 4, flexDirection: 'row', }}>
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
                            <Image source={require('../../images/dates.png')} style={{ width: 22, height: 22, }} resizeMode={'stretch'} />
                        </View>
                        <View style={{ height: 1, backgroundColor: '#000', width: '100%', marginBottom: 4 }} />
                        <Text style={{ color: '#3386FF', fontSize: 16, marginTop: 10, fontWeight: '700' }}>Activity End Date</Text>
                        <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', }}>
                            <DatePicker
                                date={this.state.EndDate}
                                mode="date"
                                placeholder="End Date"
                                format="YYYY-MM-DD"
                                style={{ width: '90%', fontFamily: "Gilroy-Medium" }}
                                minDate={this.state.StartDate}
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
                            <Image source={require('../../images/dates.png')} style={{ width: 22, height: 22, }} resizeMode={'stretch'} />
                        </View>
                                               <View style={{ height: 1, backgroundColor: '#000', width: '100%', marginBottom: 4 }} />
                        <Text style={{ color: '#3386FF', fontSize: 16, marginTop: 4, fontWeight: '700' }}>Description</Text>
                       <TextInput
                            style={{ color: '#000', fontSize: 16 }}
                            placeholder="Description"
                            editable={true}
                            onChangeText={(Description) => this.setState({ Description })}
                            value={this.state.Description}
                        />
                       <View style={{ height: 1, backgroundColor: '#000', width: '100%', marginBottom: 4 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, height: 50, marginTop: 18 }}>
                            <TouchableOpacity
                                onPress={() => this.getImage()}>
                                <View style={{ flexDirection: 'column', marginLeft: 4, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 10, alignItems: 'center', padding: 8, marginLeft: 4, marginRight: 10 }} source={require('../../images/camera.png')} />
                                    {/* <Text style={styles.TextStyleheader1}>Add Image</Text> */}
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                onPress={() => this.getImage()}>
                                <View style={{ flexDirection: 'column', marginLeft: 4, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 10, alignItems: 'center', padding: 8, marginLeft: 4, marginRight: 10 }} source={require('../../images/camera.png')} />
                                    {/* <Text style={styles.TextStyleheader1}>Add Image</Text> */}
                                {/* </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.getImage()}>
                                <View style={{ flexDirection: 'column', marginLeft: 4, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 10, alignItems: 'center', padding: 8, marginLeft: 4, marginRight: 10 }} source={require('../../images/camera.png')} />
                                    {/* <Text style={styles.TextStyleheader1}>Add Image</Text> */}
                                {/* </View>
                            </TouchableOpacity> */}
                         </View> 
                    </View>
 {/* <FlatButton title='Post' onPress={this.Reg} /> */}
                   
                    <View style={RegStyle.container2}>
                        <TouchableOpacity
                            style={RegStyle.AddToCardBtn}
                            onPress={this.getPostGallary} >
                            <Text style={RegStyle.TextStyle}>POST </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                   <StatusBar/>
            
            </View>
        );
    }
}




