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

export default class GallaryScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            spinner:false,
            USER_ID:'',
            GallaryArray:[],
        }

this.loaddata();
    }
    loaddata=async()=> {
        let token= await AsyncStorage.getItem(Constants.access_token)
        let userID =  await AsyncStorage.getItem(Constants.user_id)
                                Axios.get(LoginApi.getImageGallary + userID, {
                                    headers: {
                                        'Authorization': 'bearer ' + token
                                    }
                                }).then((response) => {
                                    console.log('rohit jain aa' + JSON.stringify(response.data));
                                    console.log('rohit jain aa' + JSON.stringify(response));
                                    if (response.data.status == 'true') {
                                        console.log('rohit jain aaxad' + response.data.RESPONSE);
                                        this.setState({
                                            GallaryArray: response.data.RESPONSE,
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
    gallaryDetails=(item)=>{
        this.props.navigation.navigate('GallaryDetailsScreen',{
            Details:item
        })
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
                    data={this.state.GallaryArray}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>
                    <TouchableOpacity
                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                    onPress={() => this.gallaryDetails(item.IMAGE_INFO)}>
                    <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    style={{marginTop:10}}
                    cornerRadius={5}>
                    <View style={{ flexDirection: 'row',width:'98%' ,height:180,marginTop:4}}>
                    <Image style={{ alignItems: 'center', width: 80, height: 180,boaderRadius:100 }} resizeMode={'stretch'} source={require('../../images/hd.jpg')} />
                    <View style={{width:'90%',}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 13,fontWeight:'bold', color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>Activity Name :</Text>  
                    <Text style={{ fontSize: 13, color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>{item.ACTIVITY_NAME}</Text>  
                     </View>
                      <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 13,fontWeight:'bold', color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>Activity Phase :</Text>  
                    <Text style={{ fontSize: 13, color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>{item.ACTIVITY_PHASE}</Text>  
                     </View>
                      <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 13,fontWeight:'bold', color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>Start Date :</Text>  
                    <Text style={{ fontSize: 13, color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>{item.START_DATE}</Text>  
                     </View>
                      <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 13,fontWeight:'bold', color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>End Date :</Text>  
                    <Text style={{ fontSize: 13, color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>{item.END_DATE}</Text>  
                     </View>
                      <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 13,fontWeight:'bold', color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>Description :</Text>  
                    <Text style={{ fontSize: 13, color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>{item.DESCRIPTION}</Text>  
                     </View>
                      <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 13,fontWeight:'bold', color: '#000',marginLeft:10,marginEnd:10,margin:4 }}>Created By :</Text>  
                    <Text style={{ fontSize: 13, color: '#000',marginLeft:10,  marginEnd:10,margin:4 }}>{item.CREATED_BY}</Text>  
                     </View>
                      <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 13,fontWeight:'bold', color: '#000',marginLeft:10,margin:4 }}>Created Date :</Text>  
                    <Text style={{ fontSize: 13, color: '#000',marginEnd:20,margin:4,justifycontain:'End', }}>{item.CREATED_DATE}</Text>  
                     </View>
                
                    </View>
                    </View>
                    </CardView>
                    </TouchableOpacity>
                    }

                />



                      </View>
                <StatusBar />
            </View>
        );
    }
}




