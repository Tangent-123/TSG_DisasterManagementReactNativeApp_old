import React, { Component } from 'react';
import {
    FlatList, StatusBar,
    StyleSheet, Text, TouchableOpacity, Image, View
} from 'react-native';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import URLLINK from '../../util/ApiCollection';
import CommonStyle from '../../util/Header';
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
    }
    componentWillMount() {
        AsyncStorage.getItem('access_token')
            .then(access_token => {
                AsyncStorage.getItem('ResponseCode')
                    .then(ResponseCode => {
                        console.log('jajaj' + ResponseCode)
                        this.setState({
                            AccessToken: access_token,
                            ResponseCode: ResponseCode,
                        })
                        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-response-location-mapping-details?response_code=" + this.state.ResponseCode, {
                            headers: {
                                'Authorization': 'bearer ' + this.state.AccessToken
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
                    })
            })

    }
    getback = () => {
        this.props.navigation.navigate('DashboardStack')
    }
    AddMapping = () => {
        this.props.navigation.navigate('AddMappingStack'

        );
    }
    UpdateData(item) {
        AsyncStorage.setItem('UpdateData', item);
        this.props.navigation.navigate('AddMappingStack');
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

                <StatusBar
                    backgroundColor="#3386FF"
                    barStyle='dark-content'
                />
            </View>
        );
    }
}