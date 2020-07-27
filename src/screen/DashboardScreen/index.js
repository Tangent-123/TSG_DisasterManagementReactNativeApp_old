
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Picker, StyleSheet, Image, Alert, StatusBar, ScrollView } from 'react-native';
 import Colors from '../../Util/Color_Value';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNExitApp from 'react-native-exit-app';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import RadioForm from 'react-native-simple-radio-button';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import BaseUrl from '../../Util/ApiCollection';
import Axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import Constants from '../../Util/Config/Constants';
var radio_props = [
    { label: 'Male', value: '0', },
    { label: 'Female', value: '1' }
];
var count = 0;
export default class DashboardScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            AccessToken: '',
            USER_ID: '',
            FIRST_NAME: '',
            Username: '',
            ResponseArray: [],
            ResponseCode: '',
            isVisible: false,

            EmergencyName: '',
            EmergencyNumber: '',
            LoginValue: 'Login',
            Sex: '',
            USER_ID: '',
            Mobile: '',
            //  spinner: true,
        }
        this.loaddata();
    }

    loaddata=async()=> {
    let ResponseCode= await AsyncStorage.getItem(Constants.responseCode);
    let EMERGENCY_CONTACT= await AsyncStorage.getItem(Constants.emergencynumber)
    let EMERGENCY_NAME = await  AsyncStorage.getItem(Constants.emergencyname)
    let mobilenumber = await   AsyncStorage.getItem(Constants.mobilenumber)
    let token =await  AsyncStorage.getItem(Constants.access_token);
    let user_id= await  AsyncStorage.getItem(Constants.user_id)
    let fname = await AsyncStorage.getItem(Constants.firstname)
    this.setState({EmergencyName: EMERGENCY_NAME,EmergencyNumber: EMERGENCY_CONTACT,Mobile: mobilenumber
    ,AccessToken: token,USER_ID: user_id, FIRST_NAME: fname,ResponseCode: ResponseCode,
});
                    if (ResponseCode == null) {
                        Alert.alert(
                            'Alert Message',
                            'Please Select Response Code',
                            [
                                // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                                // {
                                //     text: 'Cancel',
                                //     onPress: () => console.log('Cancel Pressed'),
                                //     style: 'cancel',
                                // },
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false },
                        );

                    } else {

                    }
        
                                        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-generate-code?userid=" + user_id, {
                                            headers: {
                                                'Authorization': 'bearer ' + token
                                            }
                                        }).then((response) => {
                                            console.log('rohit jain aa' + response.data);
                                            console.log('rohit jain aa' + JSON.stringify(response.data));
                                            if (response.data.status == 'true') {
                                                console.log('rohit jain aaxad' + response.data.response);
                                                this.setState({
                                                    ResponseArray: response.data.response
                                                })

                                            }
                                    
            

                        

                


            })


    }
    // componentDidMount(){
    //     this.setState({ isVisible: true })
    //     // AsyncStorage.getItem('ResponseCode')
    //     // .then(ResponseCode => {


    //     // })

    // }
    getValueSerial(ValueBrand) {
        switch (ValueBrand) {
            // case 'Profile': return this.props.navigation.navigate('ProfileStack');
            // case 'MYActivity': return this.props.navigation.navigate('MyActivityStack');
            // case 'Guidelines': return this.props.navigation.navigate('GuidlineStack');
            // case 'MYActivity': return this.props.navigation.navigate('MyActivityStack')
            // case 'TEAM': return this.props.navigation.navigate('TeamStack');
            // case 'Emergency': return this.props.navigation.navigate('EmergencyStack');
            // case 'LocationMapping': return this.props.navigation.navigate('MappingListStack')
            // case 'Notice': return this.props.navigation.navigate('NoticeBoardStack')
            // case 'Relief': return this.props.navigation.navigate('ReliefStack');
            // case 'Close': return RNExitApp.exitApp();
             case 'Profile': return this.props.navigation.navigate('ProfileScreen');
            case 'Guidelines': return this.props.navigation.navigate('GuidlineScreen');
            case 'TEAM': return this.props.navigation.navigate('TeamScreen');
           // case 'Chaspan' : return this.props.navigation.navigate('ChaspanScreen');
            case 'Emergency': return this.props.navigation.navigate('EmergencyScreen');
            case 'LocationMapping': return this.props.navigation.navigate('MappingListScreen')
            case 'Notice': return this.props.navigation.navigate('NoticeBoardScreen')
            case 'Relief': return this.props.navigation.navigate('ReliefScreen');
            case 'PostGraph': return this.props.navigation.navigate('PostScreen');
            case 'Gallary': return this.props.navigation.navigate('GallaryScreen');
           case 'Dashboard': return this.props.navigation.navigate('DashboardMainScreen');

           // case 'Verify': return this.props.navigation.navigate('VerifyListScreen');
           // case 'Final': return this.props.navigation.navigate('FinalListScreen');
           // case 'Dashboard': return this.props.navigation.navigate('DashboardMainScreen');
            case 'Close': return RNExitApp.exitApp();
        }
    }
    getback = () => {
        this.props.navigation.goBack(null);
    }
    renderview = () => {
        if (this.state.ResponseArray == undefined) {

        } else {
            return (

                this.state.ResponseArray.map((item, key) => (
                    <Picker.Item label={item.RESPONSE_CODE} value={item.RESPONSE_CODE} key={key} />
                )
                )

            )

        }
    }
    setlog = () => {
        AsyncStorage.clear();
        AsyncStorage.setItem(Constants.firstname, '');
        AsyncStorage.setItem(Constants.mobilenumber, '');
        this.props.navigation.navigate('LoginScreen');
    }
    resposecode(value) {
        console.log('jkfbebfe' + value)
        if (this.state.ResponseArray == undefined) {

        } else {
            this.state.ResponseArray.map(item => {
                // console.log('bfjd' + item.STATE_NAME)
                if (item.RESPONSE_CODE == value) {
                    console.log('bfjd' + item.STATE_SYS_ID)
                    AsyncStorage.setItem(Constants.responseCode, value);
                    AsyncStorage.setItem(Constants.statename, item.STATE_NAME);
                    AsyncStorage.setItem(Constants.stateId, JSON.stringify(item.STATE_SYS_ID));
                    this.setState({ ResponseCode: value })
                } else {
                    console.log('not wual')
                }

            })
        }
    }

    getUpdateData() {
        this.setState({
            spinner: true
        })
        AsyncStorage.setItem(Constants.gender, this.state.Sex);
        AsyncStorage.setItem(Constants.emergencyname, this.state.EmergencyName);
        AsyncStorage.setItem(Constants.emergencynumber, this.state.EmergencyNumber);
        AsyncStorage.setItem(Constants.mobilenumber, this.state.Mobile);
        if (this.state.EmergencyName !== '') {
            if (this.state.EmergencyNumber !== '') {
                const data = JSON.stringify({
                    ACTION: "PROFILE",
                    GENDER: this.state.Sex,
                    MOBILE_NO: this.state.Mobile,
                    USER_ID: this.state.USER_ID,
                    EMERGENCY_CONTACT: this.state.EmergencyNumber,
                    EMERGENCY_NAME: this.state.EmergencyName,

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
                            isVisible: false,

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
                Toast.show('Please Enter Emergency Contact')
            }
        } else {
            Toast.show('Please Enter Emergency Name')

        }

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
            <View style={{ flex: 1 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={MFStyle.spinnerTextStyle}
                />
                <View style={MFStyle.HeaderBackground}>
                    <View style={{ flexDirection: 'row', width: '90%', }}>
                        <Text style={{ color: '#3386FF', fontSize: 22, fontWeight: 'bold' }}>Hi {this.state.FIRST_NAME}</Text>
                    </View>
                </View>
                <View style={{  flexDirection: 'row', justifyContent: 'center', width: '99%',alignItems:'center' }}>
                    <View style={{ width: '36%' }}>
                        <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '600',marginLeft:6 }}>Response Code:</Text>
                    </View>
                    <View style={{ width: '63%', flexDirection: 'column' }}>
                        <Picker
                            mode='dropdown'
                            selectedValue={this.state.ResponseCode}
                            style={{ fontSize: 14, color: '#4E5764', fontFamily: "Gilroy-Medium", }}
                            itemTextStyle={{ fontSize: 14, color: '#4E5764', fontFamily: "Gilroy-Medium", }}
                            textStyle={{ fontSize: 16, color: '#4E5764', fontFamily: "Gilroy-Medium", }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.resposecode(itemValue)

                            }>
                            <Picker.Item label='Select Response Code' value='Frequency' color='#3386FF' />
                            {this.renderview()}
                        </Picker>
                        <View style={{ width: '90%', height: 1, backgroundColor: '#3386FF', alignSelf: 'center' }}></View>
                    </View>
                </View>

                <ScrollView style={MFStyle.mainContent}>
                    <View style={MFStyle.mainContent1}>
                        <View style={MFStyle.mainContent}>
                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'space-between', alignItems: 'center', padding: 4, height: 90 }}>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Profile')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/profile.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={1}>Profile</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('TEAM')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/team.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={1}>Team</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={MFStyle.button1}>
                                  {/*  <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Dashboard')
                                        }}>*/}
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/emergency.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Dashboard</Text>
                                        </View>
                                    {/*</TouchableOpacity>*/}
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: 4, height: 90 }}>
                                <View style={MFStyle.button1}>
                                    {/* <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('MarriagePlan')
                                        }}> */}
                                    <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                        <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                        <Text style={MFStyle.TextStyle1} numberOfLines={2}>Chaspan</Text>
                                    </View>
                                    {/* </TouchableOpacity> */}
                                </View>
                                <View style={MFStyle.button1}>
                                    {/* <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('EducationPlan')
                                        }}> */}
                                    <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                        <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                        <Text style={MFStyle.TextStyle1} numberOfLines={2}>Coupon</Text>
                                    </View>
                                    {/* </TouchableOpacity> */}
                                </View>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('EducationPlan')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Kit distrubution</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: 4, height: 90 }}>
                                {/* <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Emergency')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/emergency.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Emergency Phase</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Relief')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/relief_phase.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Relief Phase</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Guidelines')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/guidelines2.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={1}>Guidelines</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('LocationMapping')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/location4.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Location Mapping</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: 4, height: 90 }}>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('PostGraph')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Post Photograph</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={MFStyle.button1}>
                                <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Gallary')
                                        }}>
                                    <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                        <Image style={{ alignItems: 'center', width: 42, height: 42 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                        <Text style={MFStyle.TextStyle1} numberOfLines={2}>My Gallery</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('ConnectGallary')
                                        }}>
                                    <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                        <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/Notice_board.png')} />
                                        <Text style={MFStyle.TextStyle1} numberOfLines={2}>Connect Gallary  </Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', width: '98%', alignItems: 'center', marginTop: 12, padding: 4, height: 90 }}>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Notice')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/Notice_board.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Notice Board </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginLeft: 22 }}>
                                    <View style={MFStyle.button1}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    showAlert: true
                                                })
                                            }}>
                                            <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                                <Image style={{ alignItems: 'center', width: 42, height: 42 }} resizeMode={'stretch'} source={require('../../images/logout.png')} />
                                                <Text style={MFStyle.TextStyle1} numberOfLines={2}>Logout</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <StatusBar
                                backgroundColor="#3386FF"
                                barStyle='dark-content'
                            />
                        </View>
                    </View>
                </ScrollView>
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Logout Alert.."
                    message='Are you sure you want to logout ?'
                    closeOnTouchOutside={true}
                    titleStyle={MFStyle.text}
                    messageStyle={MFStyle.textheader}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Cancel"
                    confirmText="Okay"
                    cancelButtonTextStyle={{ fontFamily: "Gilroy-Regular" }}
                    confirmButtonTextStyle={{ fontFamily: "Gilroy-Regular" }}
                    cancelButtonColor='red'
                    cancelButtonStyle={{ height: 38, width: 69, alignItems: 'center', }}
                    confirmButtonStyle={{ height: 38, width: 69, alignItems: 'center', }}
                    onCancelPressed={() => {
                        this.setState({
                            showAlert: false
                        })
                    }}
                    confirmButtonColor={Colors.Appcolor}
                    onConfirmPressed={() => {
                        this.setlog()
                        this.setState({
                            showAlert: false
                        })
                    }}
                />
                <View>
                    <Modal isVisible={this.state.isVisible}>
                        <View style={{ width: '100%', borderRadius: 10, justifyContent: 'center', backgroundColor: '#fff' }}>
                            <ScrollView style={{ margin: 10, padding: 10 }}>
                                <View style={{ justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#3386FF', alignItems: 'center' }}>Update Profile</Text>

                                </View>
                                <View style={MFStyle.containersecond}>
                                    {/* <TextInput
                                        style={{ color: '#000', fontSize: 16 }}
                                        placeholder="Mobile Number"
                                        editable={true}
                                        maxLength={11}
                                        keyboardType={'numeric'}
                                        onChangeText={(Mobile) => this.setState({ Mobile })}
                                        value={this.state.Mobile}
                                    /> */}
                                    <View style={{ height: .8, backgroundColor: '#000', width: '99%' }} />
                                    <TextInput
                                        style={{ color: '#000', fontSize: 16 }}
                                        placeholder="Emergency Name"
                                        editable={true}
                                        keyboardType={'default'}
                                        onChangeText={(EmergencyName) => this.setState({ EmergencyName })}
                                        value={this.state.EmergencyName}
                                    />
                                    <View style={{ height: .8, backgroundColor: '#000', width: '99%' }} />
                                    <TextInput
                                        style={{ color: '#000', fontSize: 16 }}
                                        placeholder="Emergency Number"
                                        editable={true}
                                        maxLength={11}
                                        keyboardType={'numeric'}
                                        onChangeText={(EmergencyNumber) => this.setState({ EmergencyNumber })}
                                        value={this.state.EmergencyNumber}
                                    />
                                    <View style={{ height: .8, backgroundColor: '#000', width: '99%' }} />

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
                                    <View style={MFStyle.container2}>
                                        <TouchableOpacity
                                            style={MFStyle.AddToCardBtn}
                                            onPress={() => this.getUpdateData()}>
                                            <Text style={RegStyle.TextStyle}>UPDATE PROFILE </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                </View>



            </View>

        )
    }
}
const MFStyle = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontFamily: "Gilroy-Bold",
        fontWeight: '500',
    },
    AddToCardBtn: {
        width: '99%',
        height: 50,
        padding: 4,
        backgroundColor: 'green',
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
        // marginBottom: 20,

    },
    textheader: {
        color: Colors.TextColorone,
        fontSize: 16,
        padding: 8,
        fontFamily: "Gilroy-SemiBold",
        fontWeight: '400',
    },
    mainContent2: {
        flex: 1,
        padding: 4,
        justifyContent: 'center'
    },
    HeaderBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        padding: 14,
        height: 40
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
        // width: '48%
        height: 90,
        // borderColor: Colors.Appcolor,
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        //shadowRadius: 10,
        elevation: 6,
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
        marginLeft: 20,
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
        padding: 4,
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
        color: '#3386FF',
        // marginLeft: 10,
        marginBottom: 4,
        fontWeight: '700',
        fontSize: 13,
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
        fontSize: 24,
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