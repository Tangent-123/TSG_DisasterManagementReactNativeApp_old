
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StatusBar, TextInput, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-datepicker';
import BaseUrl from '../../util/ApiCollection';
import Colors from '../../util/Color_Value';
import BuyNFOStyle from './style';
import WebApi from '../../util/ApiCollection';
import { TextField } from 'react-native-material-textfield';
export default class ClientBuyScreenNFOScreen extends React.Component {
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
                {/* <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={DesignClass.spinnerTextStyle}
                /> */}
                <View style={BuyNFOStyle.HeaderBackground}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={this.getback} >
                        <Image source={require('../../images/arrow.png')} style={{  width: 30, height: 20, marginRight:10}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:18,marginLeft:10,color:'white'}}>Buy NFO</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <Text style={{fontSize:16,color:'black',marginTop:10,padding:10}}>Notice Discription</Text>
                
                    <TextInput
                        style={{ marginLeft: 6, fontSize: 16,fontFamily: 'Gilroy-Regular' }}
                        placeholder={'DESCRIPTION'}
                        height={110}
                        onChangeText={(DESCRIPTION) => this.setState({ DESCRIPTION })}
                        value={this.state.DESCRIPTION}
                    />
                    <View style={{ height: .8, backgroundColor: '#000', marginLeft: 8, marginRight: 8, }} />


                </ScrollView>

                <View style={{ alignItems: 'center', marginLeft: 8 }}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        style={BuyNFOStyle.AddToCardBtn}
                        onPress={() => this.AddNoticeData()}>
                        <Text style={BuyNFOStyle.TextStyle}>ADD Notice</Text>
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