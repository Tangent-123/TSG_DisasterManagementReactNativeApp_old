import AsyncStorage from '@react-native-community/async-storage';

import React, { Component } from 'react';

import {
    FlatList,
    StyleSheet, Text, TouchableOpacity, Image, View
} from 'react-native';

import Axios from 'axios';

import Spinner from 'react-native-loading-spinner-overlay';

import StoreHeader from '../../Header';
import StatusBar from '../../Assets/StatusBar';
import LevelStore from '../../Componenet/ReactString';
import CommanStyle from '../../Util/Header';
export default class TeamScreen extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            AccessToken: '',
            USER_ID: '',
            FIRST_NAME: '',
            TeamArray: [],
            ResponseCode: '',
            spinner: true,
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
                        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-generate-team?responce_code=" + this.state.ResponseCode, {
                            headers: {
                                'Authorization': 'bearer ' + this.state.AccessToken
                            }
                        }).then((response) => {
                            console.log('rohit jain aa' + response.data);
                            console.log('rohit jain aa' + JSON.stringify(response));
                            if (response.data.status == 'true') {
                                console.log('rohit jain aaxad' + response.data.response);
                                this.setState({
                                    TeamArray: response.data.response,
                                    spinner: false
                                })

                            } else {
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
            <View style={CommanStyle.MainView}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />

                <StoreHeader title='Team' onPress={this.getback} />

                <FlatList
                    data={this.state.TeamArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 8, }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Person Name </Text>
                                    <Text style={{ fontSize: 15, color: '#000', fontWeight: '200' }}>: {item.PERSON_NAME}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Organisation  </Text>
                                    <Text style={{ fontSize: 15, color: '#000' }}>: {item.PERSON_ORGANISATION}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Profile</Text>
                                    {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                    <Text style={{ fontSize: 15, color: '#000', marginLeft: 54 }}>: {item.PERSON_PROFILE}</Text>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Contact No.</Text>
                                    <Text style={{ fontSize: 15, color: '#000', marginLeft: 16 }}>: {item.MOBILE_NO}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' ,}}>
                                    <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Email ID</Text>
                                    <Text style={{ fontSize: 15, color: '#000', marginLeft: 42,width:'76%' }} >: {item.EMAIL}</Text>
                                </View>
                            </View>
                        </View>
                    }
                // "RESPONSE_TEAM_SYS_ID": 9,
                // "PERSON_NAME": "Aahna Srikanth",
                // "PERSON_PROFILE": "Volunteer",
                // "PERSON_ORGANISATION": "Tangent Tech Solutions",
                // "RESPONSE_CODE": "WES_FL_JAN_2020",
                // "EMAIL": "saurabh.mishra@tangenttechsolutions.com",
                // "MOBILE_NO": "9007872846",
                // "CREATED_DATE": "16-01-2020",
                // "ISACTIVE": 1,
                // "NAME": "Saurabh"
                />

                <StatusBar />
            </View>
        );
    }
}
