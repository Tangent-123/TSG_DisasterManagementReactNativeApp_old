import React, { Component } from 'react';
import Axios from 'axios';
import { Text, Picker, StatusBar, View, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../util/Color_Value';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import CommanStyle from '../../util/Header';


var folio_number = [];
export default class CountBeneficaryScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            ViewBeneficiaryCount: [],
            urlvalue: '',
            ResponseCode: '',
        }

    }
    componentWillMount() {
        AsyncStorage.getItem('access_token')
            .then(access_token => {
                AsyncStorage.getItem('USER_ID')
                    .then(USER_ID => {
                        AsyncStorage.getItem('FIRST_NAME')
                            .then(FIRST_NAME => {
                                AsyncStorage.getItem('ResponseCode')
                                    .then(ResponseCode => {
                                        this.setState({
                                            AccessToken: access_token,
                                            USER_ID: USER_ID,
                                            FIRST_NAME: FIRST_NAME,
                                            ResponseCode: ResponseCode,
                                        });

                                        this.getCountBeneficiaryApi();
                                    })
                            })
                    })
            })

    }

    getCountBeneficiaryApi() {
        this.setState({ spinner: true })
        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-beneficiary-count?response_code=" + this.state.ResponseCode, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aa' + response.data);
            console.log('rohit jain aa' + response.data.status);
            if (response.data.status == 'true') {
                console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
                this.setState({
                    ViewBeneficiaryCount: response.data.response,
                    spinner: false,
                })

            } else {
                this.setState({
                    spinner: false
                })
            }
        })
    }
    GETAddBeneficiary=()=>{
        this.props.navigation.navigate('AddBeneFicialStack');
    }

    GETBeneficiaryList = (item)=>{
        this.props.navigation.navigate('BeneficiallistStack',{
            RESPONSE_LOCATION_MAPPING_SYS_ID:item.RESPONSE_LOCATION_MAPPING_SYS_ID,

        })
    }
    getback = () => {
        this.props.navigation.navigate('DashboardStack');
    }

    render() {
        return (
            <View style={CommanStyle.MainView}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />
                <View style={CommanStyle.HeaderBackground}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={this.getback} >
                        <Image source={require('../../images/back.png')} style={{ width: 20, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <Text style={CommanStyle.headerItem}>Beneficiary List</Text>
                </View>
                <View style={{ flex: 1, }}>
                    <View style={CommanStyle.Responcelevel}>
                        <Text style={{ color: '#000' }}>{this.state.ResponseCode}</Text>
                    </View>
                    {/* 
            "RESPONSE_LOCATION_MAPPING_SYS_ID": 1,
            "PARTNER_NAME": "R jain"
            "STATE_SYS_ID": 12,
            "BLOCK_NAME": "Cjc",
            "BLOCK_SYS_ID": 84,
            "GRAM_PANCHAYAT_NAME": "Chch",
            "GRAM_PANCHAYAT_SYS_ID": 83,
            "VILLAGE_NAME": "",
            "VILLAGE_SYS_ID": 84,
            "HAMLET_NAME": "",
            "HEMLET_SYS_ID": 85 */}
                    <FlatList
                        data={this.state.ViewBeneficiaryCount}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                        <TouchableOpacity
                        onPress={() => this.GETBeneficiaryList(item)}>
                            <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 8, }}>
                                <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                    <View style={{ flexDirection: 'column', width: '49%', marginBottom: 4, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>{item.STATE_NAME}</Text>
                                        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>{item.DISTRICT_NAME}</Text>
                                        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>{item.BLOCK_NAME}</Text>
                                        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>{item.GRAM_PANCHAYAT_NAME}</Text>
                                        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>{item.VILLAGE_NAME}</Text>
                                        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>{item.HAMLET_NAME}</Text>

                                    </View>
                                    <View style={{ width: 1, height: '100%', backgroundColor: '#000' }}></View>
                                    <View style={{ flexDirection: 'column', width: '49%', marginBottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>Beneficiary Identified</Text>
                                        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>{item.NO_OF_BENEFICIARY}</Text>
                                        <TouchableOpacity
                                            onPress={() => this.GETAddBeneficiary()}>
                                            <View style={{ backgroundColor: '#3386FF', marginTop: 10, width: 50, alignItems: 'center', borderRadius: 10 }}>
                                                <Text style={{ fontSize: 12, color: '#fff', justifyContent: 'center', fontWeight: 'bold', padding: 10 }}>Add</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                            </TouchableOpacity>
                        }>
                    </FlatList>
                </View>
                <StatusBar
                    backgroundColor="#3386FF"
                    barStyle='dark-content'
                />
            </View>

        );
    }
}
