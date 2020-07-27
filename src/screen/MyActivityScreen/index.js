import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet, Text, TouchableOpacity, Image, View
} from 'react-native';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../Util/ApiCollection';
import CommonStyle from '../../Util/Header';
import StatusBar from '../../Assets/StatusBar';
import Constants from '../../Util/Config/Constants';

export default class MyActivityScreen extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            AccessToken: '',
            USER_ID: '',
            FIRST_NAME: '',
            MappingListArray: [],
            ResponseCode: '',
        }
        this.loaddata();
    }
    loaddata=async()=> {
         let token= await AsyncStorage.getItem(Constants.access_token)
        let responsecode = await  AsyncStorage.getItem(Constants.responseCode)
                        Axios.get(BaseUrl.ViewResponselocationMappingDetails + responsecode, {
                            headers: {
                                'Authorization': 'bearer ' + token
                            }
                        }).then((response) => {
                            console.log('rohit jain aa' + JSON.stringify(response.data));
                            console.log('rohit jain aa' + JSON.stringify(response));
                            if (response.data.status == 'true') {
                                console.log('rohit jain aaxad' + response.data.response);
                                this.setState({
                                    MappingListArray: response.data.response
                                })

                            } else {
                                Toast.show(response.data.response)
                            }
                        })
            

    }
    getback = () => {
        this.props.navigation.navigate('DashboardScreen')
    }
    AddMapping = () => {
        this.props.navigation.navigate('AddMappingScreen'

        );
    }
    UpdateData(item) {
        AsyncStorage.setItem(Constants.updatedata, item);
        this.props.navigation.navigate('AddMappingScreen');
    }
    render() {
        return (
            <View style={CommonStyle.MainView}>
                <View style={CommonStyle.HeaderBackground}>
                    <TouchableOpacity
                        onPress={this.getback} >
                        <Image source={require('../../images/back.png')} style={{ width: 20, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={CommonStyle.headerItem}>My Activity</Text>
                    </View>
                </View>
                {/* <FlatList
                    data={this.state.MappingListArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View>
                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                onPress={() => this.UpdateData(item)}
                            > */}
                <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, width: '94%', marginEnd: 10 }}>
                    <View style={{ flexDirection: 'column', marginLeft: 6, marginRight: 8, width: '90%' }}>

                        <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold', width: '90%' }}>Emergency Kit Distribution</Text>
                        <Text style={{ fontSize: 15, color: '#000',padding:2 }}>4-5-2019</Text>
                        <Text style={{ fontSize: 15, color: '#000',padding:2 }}>Update Statistics</Text>
                    </View>
                </View>


                {/* }
        /> */}

               <StatusBar/>
            </View>
        );
    }
}