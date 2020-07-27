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
import Constants from '../../Util/Config/Constants';

import Gallary from './style';
export default class GallaryDetailsScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            spinner:false,
            USER_ID:'',
            GallaryDetailsArray:[],
        }
this.loaddata();

    }
    loaddata=async()=> {
        const Details = this.props.navigation.getParam('Details');
        let token= await AsyncStorage.getItem(Constants.access_token)
        let userID =  await AsyncStorage.getItem(Constants.user_id)
        this.setState({
            GallaryDetailsArray:Details
        })
                                Axios.get(LoginApi.getImageGallary + userID, {
                                    headers: {
                                        'Authorization': 'bearer ' + token
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
    }
    getback = () => {
        this.props.navigation.navigate('DashboardScreen')
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
                    <FlatList
                    //style={{ height: Dimensions.get('window').height}}
                    data={this.state.GallaryDetailsArray}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>
                    <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <View style={{ width:'100%' }}>
                    <View style={{ flexDirection: 'row', width: '96%', justifyContent: 'flex-start',marginLeft:12,marginTop:10,padding:1}}>
                    <Text style={{ fontSize: 15, color: '#000', fontWeight: '500'}}>{item.IMAGE_NAME}</Text>
                      </View>
                                             <Image style={{ alignItems: 'center', width: '100%', height: '50%' }} resizeMode={'stretch'} source={require('../../images/hd.jpg')} />

                                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start',marginLeft:12,marginTop:10,padding:1}}>
                                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.CAPTION}</Text>
                                            </View>
                                            
                                        </View>
                        
                    
                             </CardView>
                    }
                             />
                
                      </View>
                <StatusBar/>
            </View>
        );
    }
}




