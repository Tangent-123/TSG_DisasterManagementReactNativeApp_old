import React, { Component } from 'react';
import Axios from 'axios';
import { Text, Picker, Linking, Alert, TextInput, StatusBar, View, FlatList, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../util/Color_Value';
import Toast from 'react-native-simple-toast';
import SOAStyle from './style';
import BaseUrl from '../../util/ApiCollection';
import Spinner from 'react-native-loading-spinner-overlay';

var folio_number = [];
export default class NoticeScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            ViewNoticeboard: [],
            BranchList: [],
            SubBrokerList: [],
            ClientList: [],
            Clientinfo: [],
            folio_number: [],
            arn_no: [],
            amc_code: [],
            CheckValue: '',
            isOn: false,
            branchId: 'all',
            subbrokerId: 'all',
            clientId: '',
            item: '',
            spinner: true,
            text: '',
            IsonValue: '2',
            picked: 'Search Client',
            value: '',
            Pan: '',
            City: '',
            state: '',
            phone: '',
            email: '',
            DetailsValue: 'false',
            SelectedFakeContactList: [],
            Schemefoliolist: [],
            selectedFruits: [],
            arn_no: [],
            urlvalue: '',
        }
        this.arrayholder = [];

    }
    componentWillMount() {
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
                                });
                                console.log('tolekn' + this.state.AccessToken)
                                Axios.get("http://Devapi.tatadisasterresponse.com/api/view-notice-board?notice_sys_id=1", {
                                    headers: {
                                        'Authorization': 'bearer ' + this.state.AccessToken
                                    }
                                }).then((response) => {
                                    console.log('rohit jain aa' + response.data);
                                    console.log('rohit jain aa' + response.data.status);
                                    if (response.data.status == 'true') {
                                        console.log('rohit jain aaxad' + response.data.response);
                                        this.setState({
                                            ViewNoticeboard: response.data.response,
                                            spinner: false,
                                        })

                                    } else {
                                        this.setState({
                                            spinner: false
                                        })
                                    }
                                })
                            })

                    })

            })


    }





    getback = () => {
        this.props.navigation.navigate('DashboardStack');
    }
    NoticeData() {
        this.props.navigation.navigate('AddNoticeStack');
    }
    DeleteNotice(item) {
        // "RESPONSE_CODE": "AWS12",
        // "DESCRIPTION": "XXsdfh",
        // "POSTED_BY": 1,
        // "CREATED_DATE": "2020-01-22T15:56:27.980"

        console.log('repov' + item.RESPONSE_CODE)
        const data = JSON.stringify({
            NOTICE_SYS_ID: '1',
            MODIFIED_BY: '1',
        });
        const headers = {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'bearer ' + this.state.AccessToken
        };
        Axios.post('http://Devapi.tatadisasterresponse.com/api/delete-notice-notice-board',
            data,
            { headers }
        ).then(p => {
            console.log('riohrigh' + JSON.stringify(p.data))
            if (p.data.status == 'true') {
                Toast.show(p.data.response);
                this.props.navigation.navigate('Dashboard');
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
            if (error.response) {
                this.setState({
                    spinner: false
                })
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })


    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />
                <View style={SOAStyle.HeaderBackground}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={this.getback} >
                        <Image source={require('../../images/arrow.png')} style={{ width: 30, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <Text style={SOAStyle.headerItem}>Notice Screen</Text>
                </View>
                <View style={{ flex: 1, }}>
                    <FlatList
                        data={this.state.ViewNoticeboard}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, width: '94%', marginEnd: 10 }}>
                                <View style={{ flexDirection: 'column', marginLeft: 6, marginRight: 8, width: '90%' }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center', marginRight: 8 }}>
                                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', width: '90%' }}>CREATED_DATE: {item.CREATED_DATE}</Text>
                                        <TouchableOpacity
                                            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                            onPress={() => this.DeleteNotice(item)}>
                                            <Text style={{ fontSize: 16, color: '#000' }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>


                                    <Text style={{ fontSize: 16, color: '#000' }}>POSTED_BY: {item.POSTED_BY}</Text>
                                    <Text style={{ fontSize: 16, color: '#000' }}>RESPONSE_CODE:{item.RESPONSE_CODE}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', marginLeft: 6, alignItems: 'center', marginRight: 8 }}>
                                    <Text style={{ fontSize: 14, color: '#000', fontWeight: '200' }}>DESCRIPTION:{item.DESCRIPTION}</Text>
                                    {/* // <Text style={{ fontSize: 14, color: '#000', fontWeight: '200' }}>{item.EMAIL}</Text> */}
                                </View>
                            </View>
                        }>

                    </FlatList>
                </View>

                <View>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={() => this.NoticeData()}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginEnd: 10, padding: 10 }}>
                            <Text style={{ backgroundColor: '#008800', fontSize: 14, color: '#fff', justifyContent: 'center', marginLeft: 40, padding: 10, alignItems: 'center', borderRadius: 10 }}>
                                Add
                       </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <StatusBar
                    backgroundColor="#3386FF"
                    barStyle='dark-content'
                />
            </View >

        );
    }
}
