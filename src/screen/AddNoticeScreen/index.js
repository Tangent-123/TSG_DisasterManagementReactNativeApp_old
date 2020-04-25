
import AsyncStorage from '@react-native-community/async-storage';

import React, { Component } from 'react';

import { View, Text, ScrollView, Image, TextInput, Picker, TouchableOpacity } from 'react-native';

import Axios from 'axios';

import Spinner from 'react-native-loading-spinner-overlay';

import Toast from 'react-native-simple-toast';

import DatePicker from 'react-native-datepicker';

import StoreHeader from '../../Header';
import StatusBar from '../../Assets/StatusBar';
import LevelStore from '../../Componenet/ReactString';
import BaseUrl from '../../Util/ApiCollection';
import Colors from '../../Util/Color_Value';
import CommanStyle from '../../Util/Header';

import BuyNFOStyle from './style';

//import WebApi from '../../util/ApiCollection';
export default class AddNoticeScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            NOTICE_SYS_ID: '',
            RESPONSE_CODE: '',
            DESCRIPTION: '',
            POSTED_BY: '',
            CREATED_DATE: '',
            AccessToken: '',
            BtnLevel: 'ADD Notice',
            FIRST_NAME: '',
            Comment: '',
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('access_token')
            .then(access_token => {
                AsyncStorage.getItem('ResponseCode')
                    .then(ResponseCode => {
                        AsyncStorage.getItem('USER_ID')
                            .then(USER_ID => {
                                AsyncStorage.getItem('FIRST_NAME')
                                    .then(FIRST_NAME => {
                                        const DataType = this.props.navigation.getParam('DataType');
                                        const DataDetails = this.props.navigation.getParam('DataDetails')
                                        console.log('data details' + JSON.stringify(DataDetails))
                                        if (DataType == 'Add') {
                                            this.setState({
                                                RESPONSE_CODE: ResponseCode,
                                                AccessToken: access_token,
                                                POSTED_BY: USER_ID,
                                                FIRST_NAME: FIRST_NAME,
                                            })

                                        } else if (DataType == 'Update') {
                                            this.setState({
                                                NOTICE_SYS_ID: DataDetails.NOTICE_SYS_ID,
                                                RESPONSE_CODE: DataDetails.RESPONSE_CODE,
                                                DESCRIPTION: DataDetails.DESCRIPTION,
                                                POSTED_BY: DataDetails.POSTED_BY,
                                                BtnLevel: 'Update Notice',
                                                AccessToken: access_token,
                                                FIRST_NAME: FIRST_NAME
                                            })

                                        } else if (DataType == 'Comment') {
                                            this.setState({
                                                NOTICE_SYS_ID: DataDetails.NOTICE_SYS_ID,
                                                RESPONSE_CODE: DataDetails.RESPONSE_CODE,
                                                DESCRIPTION: DataDetails.DESCRIPTION,
                                                POSTED_BY: DataDetails.POSTED_BY,
                                                BtnLevel: 'Add Comment',
                                                AccessToken: access_token,
                                                FIRST_NAME: FIRST_NAME,
                                            })
                                        } else {

                                        }

                                    })
                            })
                    })
            })
    }

    getback = () => {
        this.props.navigation.navigate('NoticeBoardStack');
    }
    // [{"NOTICE_SYS_ID":"1","RESPONSE_CODE":"AWS12","DESCRIPTION":"XXsdfh","POSTED_BY":1}]	

    AddNoticeData() {
        if (this.state.BtnLevel == 'Update Notice') {
            const data = JSON.stringify({
                NOTICE_SYS_ID: this.state.NOTICE_SYS_ID,
                RESPONSE_CODE: this.state.RESPONSE_CODE,
                DESCRIPTION: this.state.DESCRIPTION,
                POSTED_BY: this.state.POSTED_BY,
            });
            console.log('rohit jain' + data)
            const headers = {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + this.state.AccessToken
            };
            console.log('hearvgdh' + headers)
            Axios.post(BaseUrl.UpdateNotice,
                data,
                { headers }
            ).then(p => {
                console.log('Kapil j ' + (p.data.status))
                if (p.data.status == true) {
                    Toast.show(p.data.response);
                    this.props.navigation.navigate('NoticeBoardScreen')
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

            })

        } else if (this.state.BtnLevel == 'ADD Notice') {
            const data = JSON.stringify({
                RESPONSE_CODE: this.state.RESPONSE_CODE,
                DESCRIPTION: this.state.DESCRIPTION,
                POSTED_BY: this.state.POSTED_BY,
            });
            console.log('rohit jain' + data)
            const headers = {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + this.state.AccessToken
            };
            console.log('hearvgdh' + headers)
            Axios.post(BaseUrl.AddNotice,
                data,
                { headers }
            ).then(p => {
                console.log('Kapil j ' + (p.data.status))
                if (p.data.status == true) {
                    Toast.show(p.data.response);
                    this.props.navigation.navigate('NoticeBoardScreen')
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

            })
        } else {
            this.setState({ spinner: true })
            //  [{"NOTICE_SYS_ID":"1","DESCRIPTION":"hjsdfh","CREATED_BY":1}]
            const data = JSON.stringify({
                RESPONSE_CODE: this.state.RESPONSE_CODE,
                DESCRIPTION: this.state.Comment,
                POSTED_BY: this.state.POSTED_BY,
            });
            const headers = {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + this.state.AccessToken
            };
            console.log('kapil ksnk' + data)
            Axios.post(BaseUrl.AddNoticeComment,
                data,
                { headers }
            ).then(p => {
                console.log('riohrigh' + JSON.stringify(p.data))
                if (p.data.status == 'true') {
                    Toast.show(p.data.response);
                    //this.getNoticeList();
                    this.props.navigation.navigate('NoticeBoardScreen');
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
    }

    renderView = () => {
        if (this.state.BtnLevel == 'ADD Notice' || this.state.BtnLevel == 'Update Notice') {
            return (
                <View>
                    <Text style={{ fontSize: 16, color: 'black', marginTop: 10, padding: 10 }}>Notice Description</Text>

                    <TextInput
                        style={{ marginLeft: 6, fontSize: 16, fontFamily: 'Gilroy-SemiBold' }}
                        placeholder={'DESCRIPTION'}
                        height={110}
                        onChangeText={(DESCRIPTION) => this.setState({ DESCRIPTION: DESCRIPTION })}
                        value={this.state.DESCRIPTION}
                    />
                    <View style={{ height: .8, backgroundColor: '#000', marginLeft: 8, marginRight: 8, }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, color: 'black', marginTop: 10, padding: 10 }}>Posted By :</Text>
                        <Text style={{ fontSize: 16, color: 'black', marginTop: 10, padding: 10 }}>{this.state.FIRST_NAME}</Text>
                    </View>
                </View>
            )
        } else if (this.state.BtnLevel == 'Add Comment') {
            return (
                <View>
                    <Text style={{ fontSize: 16, color: 'black', marginTop: 10, padding: 10, fontWeight: 'bold' }}>Notice Discription</Text>

                    <TextInput
                        style={{ marginLeft: 6, fontSize: 16, width: '96%', borderRadius: 8, fontFamily: 'Gilroy-SemiBold', borderWidth: 1, borderColor: '#000' }}
                        placeholder={'DESCRIPTION'}

                        editable={false}
                        onChangeText={(DESCRIPTION) => this.setState({ DESCRIPTION: DESCRIPTION })}
                        value={this.state.DESCRIPTION}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, color: 'black', marginTop: 10, padding: 10 }}>Posted By :</Text>
                        <Text style={{ fontSize: 16, color: 'black', marginTop: 10, padding: 10 }}>{this.state.FIRST_NAME}</Text>
                    </View>
                    <View style={{ width: '80%', marginLeft: 10, }}>
                        <TextInput
                            style={{ fontSize: 16, fontFamily: 'Gilroy-SemiBold' }}
                            placeholder={'Write Comment..'}
                            onChangeText={(Comment) => this.setState({ Comment: Comment })}
                            value={this.state.Comment}
                        />
                    </View>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }} >
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={CommanStyle.spinnerTextStyle}
                />
                <StoreHeader title={this.state.BtnLevel} onPress={this.getback} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={CommanStyle.Responcelevel}>
                        <Text style={{ color: '#3386FF', fontSize: 15, fontWeight: '700' }}>{this.state.RESPONSE_CODE}</Text>
                    </View>
                    {this.renderView()}

                </ScrollView>

                <View style={{ alignItems: 'center', marginLeft: 8 }}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        style={BuyNFOStyle.AddToCardBtn}
                        onPress={() => this.AddNoticeData()}>
                        <Text style={BuyNFOStyle.TextStyle}>{this.state.BtnLevel}</Text>
                    </TouchableOpacity>

                </View>

                <StatusBar />
            </View >
        )
    }
}