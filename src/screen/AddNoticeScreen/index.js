
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StatusBar, TextInput, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import CommanStyle from '../../util/Header';
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-datepicker';
import BaseUrl from '../../util/ApiCollection';
import Colors from '../../util/Color_Value';
import BuyNFOStyle from './style';
//import WebApi from '../../util/ApiCollection';
import { TextField } from 'react-native-material-textfield';
export default class ClientBuyScreenNFOScreen extends React.Component {
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
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('access_token')
            .then(access_token => {
                AsyncStorage.getItem('ResponseCode')
                    .then(ResponseCode => {
                        AsyncStorage.getItem('USER_ID')
                            .then(USER_ID => {
                                AsyncStorage.getItem('NoticeID')
                                    .then(NoticeID => {
                                        AsyncStorage.getItem('DesCription')
                                            .then(DesCription => {
                                                AsyncStorage.getItem('RESPONSE_CODE')
                                                    .then(RESPONSE_CODE => {
                                                        AsyncStorage.getItem('POSTED_BY')
                                                            .then(POSTED_BY => {
                                                                console.log('kbd' + POSTED_BY)
                                                                if (POSTED_BY == null) {
                                                                    Toast.show('Dekho black')
                                                                    this.setState({
                                                                        NOTICE_SYS_ID: '',
                                                                        RESPONSE_CODE: '',
                                                                        DESCRIPTION: '',
                                                                        POSTED_BY: '',
                                                                        CREATED_DATE: '',
                                                                        BtnLevel: 'Add Notice',
                                                                        AccessToken: access_token,
                                                                        RESPONSE_CODE: ResponseCode,
                                                                        POSTED_BY: USER_ID,

                                                                    })
                                                                } else {
                                                                    Toast.show('UpdateNotice')
                                                                    this.setState({
                                                                        NOTICE_SYS_ID: NoticeID,
                                                                        RESPONSE_CODE: RESPONSE_CODE,
                                                                        DESCRIPTION: DesCription,
                                                                        POSTED_BY: POSTED_BY,
                                                                        // CREATED_DATE: UpdateNotice.CREATED_DATE,
                                                                        BtnLevel: 'Update Notice',
                                                                        AccessToken: access_token,
                                                                        // RESPONSE_CODE: ResponseCode,


                                                                    })
                                                                }

                                                            })

                                                    })
                                            })

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
                // Toast.show(this.state.BtnLevel)
                if(this.state.BtnLevel == 'Update Notice') {
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
                    this.props.navigation.navigate('NoticeBoardStack')
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
                    this.props.navigation.navigate('NoticeBoardStack')
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
                <View style={CommanStyle.HeaderBackground}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={this.getback} >
                        <Image source={require('../../images/back.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                    </TouchableOpacity>
                    <Text style={CommanStyle.headerItem}>{this.state.BtnLevel}</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, color: 'black', marginTop: 10, padding: 10 }}>Notice Discription</Text>

                    <TextInput
                        style={{ marginLeft: 6, fontSize: 16, fontFamily: 'Gilroy-Regular' }}
                        placeholder={'DESCRIPTION'}
                        height={110}
                        onChangeText={(DESCRIPTION) => this.setState({ DESCRIPTION: DESCRIPTION })}
                        value={this.state.DESCRIPTION}
                    />
                    <View style={{ height: .8, backgroundColor: '#000', marginLeft: 8, marginRight: 8, }} />


                </ScrollView>

                <View style={{ alignItems: 'center', marginLeft: 8 }}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        style={BuyNFOStyle.AddToCardBtn}
                        onPress={() => this.AddNoticeData()}>
                        <Text style={BuyNFOStyle.TextStyle}>{this.state.BtnLevel}</Text>
                    </TouchableOpacity>

                </View>

                <StatusBar
                    backgroundColor='#3386FF'
                    barStyle='dark-content'
                />
            </View >
        )
    }
}