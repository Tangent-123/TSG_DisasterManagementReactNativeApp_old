import AsyncStorage from '@react-native-community/async-storage';

import React, { Component } from 'react';

import {
    FlatList,
    StyleSheet, Text, TouchableOpacity, Image, View
} from 'react-native';

import Axios from 'axios';

import Toast from 'react-native-simple-toast';

import Spinner from 'react-native-loading-spinner-overlay';

import AwesomeAlert from 'react-native-awesome-alerts';

import StoreHeader from '../../Header';
import StatusBar from '../../Assets/StatusBar';
import LevelStore from '../../Componenet/ReactString';
import Baseurl from '../../Util/ApiCollection';
import CommanStyle from '../../Util/Header';
import Constants from '../../Util/Config/Constants';

export default class MappingListScreen extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            AccessToken: '',
            USER_ID: '',
            FIRST_NAME: '',
            MappingListArray: [],
            ResponseCode: '',
            Spinner: true,
            SyS_ID: '',
            showAlert: false,
        }
 this.getMappingList();
    }
    DeleteLocation() {
        this.setState({
            spinner: true
        });
console.log('fhdjfhd'+this.state.SyS_ID)
        Axios.get(Baseurl.DeleteMappinglocationlist + this.state.SyS_ID + "&modified_by=" + this.state.USER_ID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            // this.props.navigation.navigate('OtpLoginScreen');
            if (response.data.status == 'true') {

                //this.props.navigation.navigate('OtpLoginScreen');
                Toast.show(response.data.response);
                //window.location.reload(false);
                this.getMappingList();
                this.setState({
                    spinner: false,
                    //showAlert:false
                });
            } else {
                Toast.show(response.data.response)
                this.setState({
                    spinner: false,
                    showAlert: false
                })
            }



        })


    }
    getMappingList=async()=>{
let user_id = await AsyncStorage.getItem(Constants.user_id)
let token = await AsyncStorage.getItem(Constants.access_token)
let responseCode = await AsyncStorage.getItem(Constants.responseCode)
                                this.setState({
                                    AccessToken: token,
                                    ResponseCode: responseCode,
                                    USER_ID: user_id,
                                })
                                Axios.get(Baseurl.ViewResponselocationMappingDetails + this.state.ResponseCode, {
                                    headers: {
                                        'Authorization': 'bearer ' + this.state.AccessToken
                                    }
                                }).then((response) => {
                                    console.log('rohit jain aa' + JSON.stringify(response.data));
                                    console.log('rohit jain aa' + JSON.stringify(response));
                                    if (response.data.status == 'true') {
                                        console.log('rohit jain aaxad' + response.data.response);
                                        this.setState({
                                            MappingListArray: response.data.response,
                                            spinner: false
                                        })

                                    } else {
                                        Toast.show(response.data.response)
                                        this.setState({
                                            spinner: false
                                        })
                                    }
                                
            })
    }
    getback = () => {
        this.props.navigation.navigate('DashboardScreen')
    }
    AddMapping = () => {
        this.props.navigation.navigate('AddMappingScreen')
    }

    UpdateData(item) {
        this.props.navigation.navigate('AddMappingScreen', {
            MappingUpdateData: item,
        })
    }


    render() {
        return (
            <View style={CommanStyle.MainView}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <StoreHeader title='Location Mapping' onPress={this.getback} />
                <View style={CommanStyle.Responcelevel}>
                    <Text style={{ color: '#000' }}>{this.state.ResponseCode}</Text>
                </View>
                <FlatList
                    data={this.state.MappingListArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View>
                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                onPress={() => this.UpdateData(item)}
                            >
                                <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 8, }}>
                                   
                                    <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() =>
                                                    this.setState({
                                                        showAlert: true,
                                                        SyS_ID: item.RESPONSE_LOCATION_MAPPING_SYS_ID,
                                                        // USER_ID: item.POSTED_BY,

                                                    })}>
                                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                    <Text style={{ backgroundColor: '#3386FF', fontSize: 10, color: '#fff', justifyContent: 'center', padding: 8, alignItems: 'center', borderRadius: 8 }}>
                                                        Delete  </Text>
                                                </View>
                                            </TouchableOpacity>
                                   
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                        <View style={{ flexDirection: 'row', marginBottom: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',width:'99%' }}>
                                                <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: '700',width:'36%' }}>State</Text>

                                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '200',width:'63%' }} numberOfLines={2}>:{item.STATE_NAME}</Text>
                                            </View>
                                           
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', width: '36%' }}>District</Text>
                                            <Text style={{ fontSize: 13, color: '#000', width: '63%' }}>: {item.DISTRICT_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', width: '36%' }}>Block</Text>
                                            <Text style={{ fontSize: 13, color: '#000', width: '63%' }}>: {item.BLOCK_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', width: '36%' }}>Gram Panchayat</Text>
                                            {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                            <Text style={{ fontSize: 13, color: '#000', width: '63%' }} numberOfLines={4}>: {item.GRAM_PANCHAYAT_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', width: '36%' }}>Village</Text>
                                            {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                            <Text style={{ fontSize: 13, color: '#000', width: '63%' }} numberOfLines={4}>: {item.VILLAGE_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', width: '36%' }}>Hamlet</Text>
                                            {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                            <Text style={{ fontSize: 13, color: '#000', width: '63%' }} numberOfLines={4}>: {item.HAMLET_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', width: '36%' }}>Partner Name</Text>
                                            {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                            <Text style={{ fontSize: 13, color: '#000', width: '63%' }} numberOfLines={4}>: {item.PARTNER_NAME}</Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </View>
                    }
                />
                <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={() => this.AddMapping()}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginEnd: 10, padding: 10 }}>
                            <Text style={{ backgroundColor: '#3386FF', fontSize: 14, color: '#fff', justifyContent: 'center', marginLeft: 40, padding: 10, alignItems: 'center', borderRadius: 10 }}>
                                Add
                       </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Delete Alert.."
                    message='Are you sure you want to delete ?'
                    closeOnTouchOutside={true}
                    titleStyle={styles.text}
                    messageStyle={styles.textheader}
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
                        this.DeleteLocation();
                        this.setState({
                            showAlert: false
                        })
                    }}
                />
                <StatusBar />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    HeaderBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        backgroundColor: '#3386FF',
        //  marginLeft: 4,
        height: 60,

    },
    HeaderText: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: 10,
        fontFamily: "Gilroy-Bold",
    },
})  