import AsyncStorage from '@react-native-community/async-storage';

import React, { Component } from 'react';

import Axios from 'axios';

import { Text, Picker, Linking, Alert, TextInput, View, FlatList, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';

import Toast from 'react-native-simple-toast';

import Spinner from 'react-native-loading-spinner-overlay';

import StoreHeader from '../../Header';
import StatusBar from '../../Assets/StatusBar';
import LevelStore from '../../Componenet/ReactString';
import CommanAPi from '../../Util/ApiCollection';
import CommanStyle from '../../Util/Header';


var folio_number = [];
export default class ViewNoticeBoardScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            Schemefoliolist: [],
            selectedFruits: [],
            arn_no: [],
            urlvalue: '',
            ResponseCode: '',
            Comment: '',
            FIRST_NAME: '',
        }

    }
    componentWillMount() {
        AsyncStorage.getItem('access_token')
            .then(access_token => {
                AsyncStorage.getItem('USER_ID')
                    .then(USER_ID => {
                        AsyncStorage.getItem('ResponseCode')
                            .then(ResponseCode => {
                                AsyncStorage.getItem('FIRST_NAME')
                                    .then(FIRST_NAME => {
                                        this.setState({
                                            AccessToken: access_token,
                                            USER_ID: USER_ID,
                                            ResponseCode: ResponseCode,
                                            FIRST_NAME: FIRST_NAME,
                                        });

                                        this.getNoticeList();
                                    })
                            })
                    })
            })

    }

    getNoticeList() {
        this.setState({ spinner: true })
        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-notice-board?response_code=" + this.state.ResponseCode, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aa' + response.data);
            console.log('rohit jain aa' + response.data.status);
            if (response.data.status == 'true') {
                console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
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
    }



    getback = () => {
        this.props.navigation.navigate('DashboardStack');
    }
    AddNoticeData(value) {
        this.props.navigation.navigate('AddNoticeScreen', {
            DataType: value,
        });
    }
    DeleteNotice(item) {
        this.setState({ spinner: true })
        const data = JSON.stringify({
            NOTICE_SYS_ID: JSON.stringify(item.NOTICE_SYS_ID),
            MODIFIED_BY: (item.POSTED_BY),
        });
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'bearer ' + this.state.AccessToken
        };
        Axios.post('http://Devapi.tatadisasterresponse.com/api/delete-notice-notice-board',
            data,
            { headers }
        ).then(p => {
            console.log('riohrigh' + JSON.stringify(p.data))
            if (p.data.status == 'true') {
                Toast.show(p.data.response);
                this.getNoticeList();
                //this.props.navigation.navigate('Dashboard');
                this.setState({
                    spinner: false,
                });

            } else {
                Toast.show(p.data.response);
                this.setState({
                    spinner: false,
                });
            }

        }).catch()

    }

    getUpdate(Value) {
        this.props.navigation.navigate('AddNoticeScreen', {
            DataDetails: Value,
            DataType: 'Update',
        });
    }
    Comment(Value) {
        this.props.navigation.navigate('AddNoticeScreen', {
            DataDetails: Value,
            DataType: 'Comment',
        });
    }
    AddComment(item) {
        this.setState({ spinner: true })
        //  [{"NOTICE_SYS_ID":"1","DESCRIPTION":"hjsdfh","CREATED_BY":1}]
        const data = JSON.stringify({
            NOTICE_SYS_ID: JSON.stringify(item.NOTICE_SYS_ID),
            DESCRIPTION: this.state.Comment,
            CREATED_BY: item.POSTED_BY,
        });
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'bearer ' + this.state.AccessToken
        };
        console.log('kapil ksnk' + data)
        Axios.post(CommanAPi.AddNoticeComment,
            data,
            { headers }
        ).then(p => {
            console.log('riohrigh' + JSON.stringify(p.data))
            if (p.data.status == 'true') {
                Toast.show(p.data.response);
                this.getNoticeList();
                //this.props.navigation.navigate('Dashboard');
                this.setState({
                    spinner: false,
                });

            } else {
                Toast.show(p.data.response);
                this.setState({
                    spinner: false,
                });
            }

        }).catch()



    }
    render() {
        return (
            <View style={CommanStyle.MainView}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />

                <StoreHeader title='Notice Screen' onPress={this.getback} />
                <View style={{ flex: 1, }}>
                    <FlatList
                        data={this.state.ViewNoticeboard}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 8, }}>
                                <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>{item.CREATED_DATE}</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', width: '99%' }}>
                                        <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold', width: '40%' }}>Posted By  </Text>
                                        <Text style={{ fontSize: 14, color: '#000', width: '60%' }}>: {this.state.FIRST_NAME}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '99%' }}>
                                        <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold', width: '40%' }}>Response Code  </Text>
                                        <Text style={{ fontSize: 14, color: '#000', width: '60%' }}>: {item.RESPONSE_CODE}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '99%' }}>
                                        <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold', width: '40%' }}>Description</Text>
                                        {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                        <Text style={{ fontSize: 14, color: '#000', width: '60%' }} numberOfLines={4}>: {item.DESCRIPTION}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, width: '98%', justifyContent: 'flex-start', alignItems: 'center', }}>
                                        <View style={{ padding: 2, }}>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() => this.getUpdate(item)}>
                                                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                    <Text style={{ backgroundColor: '#3386FF', fontSize: 12, color: '#fff', justifyContent: 'center', padding: 8, alignItems: 'center', borderRadius: 8 }}>
                                                        Edit  </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ padding: 2 }}>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() => this.Comment(item)}>
                                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                    <Text style={{ backgroundColor: '#3386FF', fontSize: 10, color: '#fff', justifyContent: 'center', padding: 8, alignItems: 'center', borderRadius: 8 }}>
                                                        Comment  </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ padding: 2 }}>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() => this.DeleteNotice(item)}>
                                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                    <Text style={{ backgroundColor: '#3386FF', fontSize: 10, color: '#fff', justifyContent: 'center', padding: 8, alignItems: 'center', borderRadius: 8 }}>
                                                        Delete  </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>


                                        {/* <View style={{ width: '80%' }}>
                                                <TextInput
                                                    style={{ fontSize: 16, fontFamily: 'Gilroy-SemiBold' }}
                                                    placeholder={'Write Comment..'}

                                                    onChangeText={(Comment) => this.setState({ Comment: Comment })}
                                                    value={this.state.Comment}
                                                />
                                            </View>
                                            <View style={{ width: '20%' }}>
                                                <TouchableOpacity
                                                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                    onPress={() => this.AddComment(item)}>
                                                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                        <Text style={{ backgroundColor: '#3386FF', fontSize: 10, color: '#fff', justifyContent: 'center', padding: 8, alignItems: 'center', borderRadius: 8 }}>
                                                            Comment  </Text>
                                                    </View>

                                                </TouchableOpacity>

                                            </View> */}
                                    </View>
                                </View>
                            </View>
                        }>

                    </FlatList>
                </View>

                <View>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={() => this.AddNoticeData('Add')}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginEnd: 10, padding: 10 }}>
                            <Text style={{ backgroundColor: '#008800', fontSize: 14, color: '#fff', justifyContent: 'center', marginLeft: 40, padding: 10, alignItems: 'center', borderRadius: 10 }}>
                                Add
                       </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <StatusBar />
            </View >

        );
    }
}
