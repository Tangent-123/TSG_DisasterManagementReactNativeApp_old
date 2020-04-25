import AsyncStorage from '@react-native-community/async-storage';

import React, { Component } from 'react';

import { View, Text, TouchableOpacity, TextInput, Picker, StyleSheet, Image, Alert, ScrollView } from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

import RNExitApp from 'react-native-exit-app';

import Spinner from 'react-native-loading-spinner-overlay';

import RadioForm from 'react-native-simple-radio-button';

import Toast from 'react-native-simple-toast';

import Modal from 'react-native-modal';

import Axios from 'axios';

import RNPickerSelect from 'react-native-picker-select';

import StatusBar from '../../Assets/StatusBar';
import ReactTab from '../../Componenet/ReactView';
import BaseUrl from '../../Util/ApiCollection';
import Colors from '../../Util/Color_Value';
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
            Term: "Lorem ipsum dolor sit amet" +
                "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam"
                + "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit"
                + "in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui"
                + "officia deserunt mollit anim id est laborum."
                + "Curabitur pretium tincidunt lacus.Nulla gravida orci a odio.Nullam varius,"
                + "turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin"
                + "mauris.Integer in mauris eu nibh euismod gravida.Duis ac tellus et risus vulputate "
                + "vehicula.Donec lobortis risus a elit.Etiam tempor.Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis,"
                + "id tincidunt sapien risus a quam.Maecenas fermentum consequat mi.Donec fermentum.Pellentesque malesuada nulla a mi.Duis sapien sem,"
                + "aliquet nec, commodo eget, consequat quis, neque.Aliquam faucibus, elit ut dictum aliquet,"
                + "felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.Cras mollis scelerisque nunc."
                + "Nullam arcu.Aliquam consequat.Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi.Aenean magna nisl,"
                + "mollis quis, molestie eu, feugiat in, orci.In hac habitasse platea dictumst",
            //  spinner: true,
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('ResponseCode')
            .then(ResponseCode => {
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
                }
            })

        AsyncStorage.getItem('EmergencyNumber')
            .then(EMERGENCY_CONTACT => {
                AsyncStorage.getItem('EmergencyName')
                    .then(EMERGENCY_NAME => {
                        AsyncStorage.getItem('MobileNumber')
                            .then(MobileNumber => {
                                console.log('ji ji' + EMERGENCY_NAME);
                                console.log('ko ko' + EMERGENCY_CONTACT)
                                this.setState({

                                    EmergencyName: EMERGENCY_NAME,
                                    EmergencyNumber: EMERGENCY_CONTACT,
                                    Mobile: MobileNumber,
                                })
                            })
                    })
            })


        AsyncStorage.getItem('ResponseCode')
            .then(ResponseCode => {
                AsyncStorage.getItem('access_token')
                    .then(access_token => {
                        AsyncStorage.getItem('USER_ID')
                            .then(USER_ID => {
                                AsyncStorage.getItem('FIRST_NAME')
                                    .then(FIRST_NAME => {
                                        console.log('kapil pro'+access_token)

                                        this.setState({
                                            AccessToken: access_token,
                                            USER_ID: USER_ID,
                                            FIRST_NAME: FIRST_NAME,
                                            ResponseCode: ResponseCode,

                                        });
                                        console.log('bdj' + this.state.AccessToken);

                                        console.log('tolekn' + this.state.USER_ID)
                                        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-generate-code?userid=" + this.state.USER_ID, {
                                            headers: {
                                                'Authorization': 'bearer ' + this.state.AccessToken
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
                                    })

                            })

                    })


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
            case 'Profile': return this.props.navigation.navigate('ProfileStack');
            case 'MYActivity': return this.props.navigation.navigate('MyActivityStack');
            case 'Guidelines': return this.props.navigation.navigate('GuidlineStack');
            case 'MYActivity': return this.props.navigation.navigate('MyActivityStack')
            case 'TEAM': return this.props.navigation.navigate('TeamStack');
            case 'Emergency': return this.props.navigation.navigate('EmergencyStack');
            case 'LocationMapping': return this.props.navigation.navigate('MappingListStack')
            case 'Notice': return this.props.navigation.navigate('NoticeBoardStack')
            case 'Relief': return this.props.navigation.navigate('ReliefStack');
            case 'PostGraph': return this.props.navigation.navigate('PostStack');
            case 'Gallary': return this.props.navigation.navigate('GallaryStack');
            case 'Close': return RNExitApp.exitApp();
        }
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

        AsyncStorage.setItem('NAME', '');
        AsyncStorage.setItem('mobile', '');
        this.props.navigation.navigate('AuthStart');
    }
    resposecode(value) {
        console.log('jkfbebfe' + value)
        if (this.state.ResponseArray == undefined) {

        } else {
            this.state.ResponseArray.map(item => {
                // console.log('bfjd' + item.STATE_NAME)
                if (item.RESPONSE_CODE == value) {
                    console.log('bfjd' + item.STATE_SYS_ID)
                    AsyncStorage.setItem('ResponseCode', value);
                    AsyncStorage.setItem('StateName', item.STATE_NAME);
                    AsyncStorage.setItem('State_ID', JSON.stringify(item.STATE_SYS_ID));
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
        AsyncStorage.setItem('GENDER', this.state.Sex);
        AsyncStorage.setItem('EmergencyName', this.state.EmergencyName);
        AsyncStorage.setItem('EmergencyNumber', this.state.EmergencyNumber);
        AsyncStorage.setItem('MobileNumber', this.state.Mobile);
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
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '99%', alignItems: 'center' }}>
                    <View style={{ width: '36%' }}>
                        <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '600', marginLeft: 6 }}>Response Code:</Text>
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
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Dashboard')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/emergency.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Dashboard</Text>
                                        </View>
                                    </TouchableOpacity>
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
                                            this.getValueSerial('Notice')
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
    ViewLevel: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 4,
        height: 90
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