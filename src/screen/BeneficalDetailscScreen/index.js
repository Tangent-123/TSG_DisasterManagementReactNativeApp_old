
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StatusBar, TextInput, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import BaseUrl from '../../util/ApiCollection';
import BuyNFOStyle from './style';
export default class BeneficalDetailsScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            Clientinfo: [],
            Investment: '',
            Valuation: '',
            AbsReturn: '',
            Cagr: '',
            TodayGainLoss: '',
            TodayGainLossText: '',
            //  spinner: false,
            ClientArray: [],
            NAme: '',
            imageUrl: '',
            categorylist: [],
            folioList: [],
            SectionValue: 'nfo',
            folioId: '0',
            SetvLaue: 'Min:Rs 1000',
            DateHired: '',
            amcCode: '',
            images: '',
            oneMonthPer: '',
            oneYearPer: '',
            threeYearPer: '',
            fiveYearPer: '',
            nav: '',
            schemeName: '',
            bseMemberId: '',
            ClientID: '',
            bseClientCode: '',
            frequency: '',
            mode: 'P',
            lumsumorderDate: '',
            LumpsumAmount: '',
            buySellType: '',
            schemeType: '',
            count: 0,
            ClientName: '',
            endDate: '',
            minimumPurchaseAmount: '',
            startDate: '',
            schemenName: '',
            schemeType: '',
            schemeCodeArray: [],
            bseMemberId: '',
            CurrentDate: '',
            Pan: '',
            City: '',
            Email: '',
            Mobile: '',
            additionalPurchaseMinimumAmount: '',
            SuggestAmount: '',

            RESPONSE_CODE: '',
            DESCRIPTION: '',
            POSTED_BY: '1',
            AccessToken: '',
        }
    }

    componentWillMount() {
        const BeneficalDetail = this.props.navigation.getparam('BeneficalDetail');
        console.log('ndjkwhd'+JSON.stringify(BeneficalDetail))
        AsyncStorage.getItem('access_token')
            .then(access_token => {
                AsyncStorage.getItem('ResponseCode')
                    .then(ResponseCode => {
                        this.setState({
                            AccessToken: access_token,
                            RESPONSE_CODE: ResponseCode
                        })
                    })


            })

    }
    getback = () => {
        this.props.navigation.navigate('NoticeBoardStack');
    }

    AddNoticeData() {
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
                this.props.navigation.navigate('DashboardStack');
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
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={BuyNFOStyle.HeaderBackground}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={this.getback} >
                        <Image source={require('../../images/back.png')} style={{ width: 30, height: 20, marginRight: 10 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, marginLeft: 10, color: 'white' }}>Add Notice</Text>
                </View>
                <Text style={{ fontSize: 16, color: 'black', marginTop: 10, padding: 10 }}>Notice Discription</Text>

                <TouchableOpacity
                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                    onPress={() => this.props.navigation.navigate('UpdateLocationMappingStack', {
                        UpdateMappingData: item
                    })
                    }>
                    <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 10, borderWidth: .5, borderStartColor: '#3386FF' }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginRight: 8 }}>

                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingTop: 4, paddingHorizontal: 4, paddingVertical: 4 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 10 }}>Family Head Male Name:</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.FAMILY_HEAD_MALE}</Text>


                            </View>
                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 10 }}>Identity Type:</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.ID_TYPE}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 10 }}>Mobile Number:</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.MOBILE_NO}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 10 }}>Status:</Text>
                                <Text style={{ fontSize: 15, color: 'green', fontWeight: 'bold' }}>{item.STATUS}</Text>
                            </View>


                            <View style={{ alignItems: 'center', marginLeft: 8 }}>
                                <TouchableOpacity
                                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                    style={BuyNFOStyle.AddToCardBtn}
                                    onPress={() => this.AddNoticeData()}>
                                    <Text style={BuyNFOStyle.TextStyle}>ADD Notice</Text>
                                </TouchableOpacity>

                            </View>
</View>
</View>
</TouchableOpacity>
                            <StatusBar
                                backgroundColor='#3386FF'
                                barStyle='dark-content'>

                                </StatusBar>
                    
                        </View>
                        )
                    }
}