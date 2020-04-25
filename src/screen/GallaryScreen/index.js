import AsyncStorage from '@react-native-community/async-storage';

import React, { Component } from 'react';

import { ScrollView,FlatList, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';

import Toast from 'react-native-simple-toast';

import DatePicker from 'react-native-datepicker';

import RadioForm from 'react-native-simple-radio-button';
import CardView from 'react-native-cardview';
import Axios from 'axios';

import Spinner from 'react-native-loading-spinner-overlay';
import LoginApi from '../../Util/ApiCollection';

import qs from 'qs';

import StoreHeader from '../../Header';
import StatusBar from '../../Assets/StatusBar';
import LevelStore from '../../Componenet/ReactString';
import BaseUrl from '../../Util/ApiCollection';

import Gallary from './style';
export default class GallaryScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            spinner:false,
            USER_ID:'',
            GallaryArray:[],
        }


    }
    componentWillMount() {
        AsyncStorage.getItem('USER_ID')
            .then(USER_ID => {
                AsyncStorage.getItem('access_token')
                    .then(access_token => {
                                this.setState({
                                    AccessToken: access_token,
                                    USER_ID: USER_ID,
                                })
                                console.log('ram'+access_token)
                                console.log('ram'+USER_ID)
                                Axios.get(LoginApi.getImageGallary + this.state.USER_ID, {
                                    headers: {
                                        'Authorization': 'bearer ' + this.state.AccessToken
                                    }
                                }).then((response) => {
                                    console.log('rohit jain aa' + JSON.stringify(response.data));
                                    console.log('rohit jain aa' + JSON.stringify(response));
                                    if (response.data.status == 'true') {
                                        console.log('rohit jain aaxad' + response.data.response);
                                        this.setState({
                                            GallaryArray: response.data.response,
                                            spinner: false
                                        })

                                    } else {
                                        Toast.show(response.data.response)
                                        this.setState({
                                            spinner: false
                                        })
                                    }
                                })
                            })
                    })
    }
    getback = () => {
        this.props.navigation.navigate('DashboardStack')
    }
    render() {
        return (
            <View style={Gallary.container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={Gallary.spinnerTextStyle}
                />
                <StoreHeader title='Image Gallary ' onPress={this.getback} />
                <View style={{ flex: 1, padding: 8 }}>
                    
                        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}>
                                        <View style={{ flexDirection: 'column' }}>
                                             <Image style={{ alignItems: 'center', width: '100%', height: 190 }} resizeMode={'stretch'} source={require('../../images/hd.jpg')} />

                                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start',marginLeft:12,marginTop:10,padding:1}}>
                                                <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>Activity Name:</Text>
                                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>ABC</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start',marginLeft: 12,padding:1}}>
                                                <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>Start Date:</Text>
                                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>21/02/2020</Text>
                                           
                                            </View>
                                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start',marginLeft:12,padding:1}}>
                                                <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>End Date:</Text>
                                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>30/02/2020</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start',marginLeft:12,padding:1 }}>
                                                <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>Description:</Text>
                                                <Text style={{ fontSize: 15, color: 'green', fontWeight: 'bold' }}>hi jncdc</Text>
                                            </View>
                                             <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start',marginLeft:12,padding:1 }}>
                                                <Text style={{ fontSize: 14, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>Caption:</Text>
                                                <Text style={{ fontSize: 15, color: 'green', fontWeight: 'bold' }}>hi jncdc</Text>
                                            </View>
                                        </View>
                               
                    
                             </CardView>
                      </View>
                <StatusBar />
            </View>
        );
    }
}




