import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';
import Colors from '../../util/Color_Value';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNExitApp from 'react-native-exit-app';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
export default class DashboardScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            AccessToken: '',
            USER_ID: '',
            FIRST_NAME: '',
            ResponseArray: [],
            ResponseCode: '',
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('ResponseCode')
            .then(ResponseCode => {
                AsyncStorage.getItem('access_token')
                    .then(access_token => {
                        AsyncStorage.getItem('USER_ID')
                            .then(USER_ID => {
                                AsyncStorage.getItem('FIRST_NAME')
                                    .then(FIRST_NAME => {
                                        this.setState({
                                            AccessToken: access_token,
                                            USER_ID: USER_ID,
                                            FIRST_NAME: FIRST_NAME,
                                            ResponseCode: ResponseCode,
                                        });
                                        console.log('tolekn' + this.state.AccessToken)
                                        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-generate-code?userid=" + this.state.USER_ID, {
                                            headers: {
                                                'Authorization': 'bearer ' + this.state.AccessToken
                                            }
                                        }).then((response) => {
                                            console.log('rohit jain aa' + response.data);
                                            console.log('rohit jain aa' + response);
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
    getValueSerial(ValueBrand) {
        if (ValueBrand == 'Profile') {
            this.props.navigation.navigate('ProfileStack')
        } else if (ValueBrand == 'MYActivity') {
            this.props.navigation.navigate('MyActivityStack')

        } else if (ValueBrand == 'Guidelines') {
            this.props.navigation.navigate('GuidlineStack')

        } else if (ValueBrand == 'TEAM') {
            this.props.navigation.navigate('TeamStack')
        } else if (ValueBrand == 'Emergency') {
            this.props.navigation.navigate('EmergencyStack')

        } else if (ValueBrand == 'LocationMapping') {
            this.props.navigation.navigate('MappingListStack')

        } else if (ValueBrand == 'Notice') {
            this.props.navigation.navigate('NoticeBoardStack')

        } else if (ValueBrand == 'Close') {
            RNExitApp.exitApp();
        } else if (ValueBrand == 'IncomeTax') {
            this.props.navigation.navigate('CalculatorDetails', {
                VALUE: CalUrl.IncomeTaxCalc,
            })

        } else if (ValueBrand == 'NewPost') {
            this.props.navigation.navigate('NewPostActivityStack')

        } else if (ValueBrand == 'CarPlan') {
            this.props.navigation.navigate('CalculatorDetails', {
                VALUE: CalUrl.CarPlanningCalc,
            })

        } else if (ValueBrand == 'VacationPlan') {
            this.props.navigation.navigate('CalculatorDetails', {
                VALUE: CalUrl.VoactionPlanningCalc,
            })

        } else {

        }
    }
    getback = () => {
        this.props.navigation.goBack(null);
    }
    setlog = () => {
        // AsyncStorage.clear();
        // AsyncStorage.setItem('NAME', '');
        // AsyncStorage.setItem('mobile', '');
        this.props.navigation.navigate('AuthStart');
    }
    resposecode = (value) => {
        console.log('jkfbebfe' + value)
        AsyncStorage.setItem('ResponseCode', value)
        this.setState({ ResponseCode: value })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={MFStyle.spinnerTextStyle}
                /> */}
                <View style={MFStyle.HeaderBackground}>
                    <View style={{ flexDirection: 'row', width: '90%', }}>
                        <Text style={MFStyle.header}>Hi {this.state.FIRST_NAME}</Text>
                    </View>
                </View>
                <View style={{ padding: 10 }}>
                    <Picker
                        mode='dropdown'
                        selectedValue={this.state.ResponseCode}
                        style={{ fontSize: 19, color: '#4E5764', fontFamily: "Gilroy-Medium", }}
                        itemTextStyle={{ fontSize: 19, color: '#4E5764', fontFamily: "Gilroy-Medium", }}
                        textStyle={{ fontSize: 19, color: '#4E5764', fontFamily: "Gilroy-Medium", }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.resposecode(itemValue)

                        }>
                        <Picker.Item label='Responsive Code' value='Frequency' />
                        {
                            this.state.ResponseArray.map((item, key) => (
                                <Picker.Item label={item.RESPONSE_CODE} value={item.RESPONSE_CODE} key={key} />
                            )
                            )
                        }
                    </Picker>
                    {/* <RNPickerSelect
                        onValueChange={(itemValue) =>
                            this.resposecode(itemValue)}
                        items={
                            this.state.ResponseArray.map((item) => (
                                label = item.RESPONSE_CODE, value = item.RESPONSE_CODE
                            )
                            )
                        }
                    /> */}
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
                                            <Image style={{ alignItems: 'center', width: 42, height: 42 }} resizeMode={'stretch'} source={require('../../images/profile.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Profile</Text>
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
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Team</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('MYActivity')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/MY_activity.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>My Activity</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: 4, height: 90 }}> */}
                            {/* <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('MarriagePlan')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Approval</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}
                            {/* <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('EducationPlan')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>View 10</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}
                            {/* <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('EducationPlan')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>View 8</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}

                            {/* </View> */}
                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: 4, height: 90 }}>
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Emergency')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/emergency.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Emergency Phase</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
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
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Guidelines</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: 4, height: 90 }}>
                                {/* <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('RetirementPlan')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>DashBoard</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}
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
                                <View style={MFStyle.button1}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('NewPost')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 42, height: 42 }} resizeMode={'stretch'} source={require('../../images/usrNme5.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Post My Activity</Text>
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
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Notice Board </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'flex-start', alignItems: 'center', marginTop: 12, padding: 4, height: 90 }}>
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
                                <View style={MFStyle.button2}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.getValueSerial('Close')
                                        }}>
                                        <View style={{ flexDirection: 'column', padding: 4, alignItems: 'center', justifyContent: 'center', margin: 4, marginLeft: 4 }}>
                                            <Image style={{ alignItems: 'center', width: 40, height: 40 }} resizeMode={'stretch'} source={require('../../images/close1.png')} />
                                            <Text style={MFStyle.TextStyle1} numberOfLines={2}>Close</Text>
                                        </View>
                                    </TouchableOpacity>
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
                    message='Are u want to sure logout ?'
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
        marginTop: 4,
        padding: 14,
        height: 50
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