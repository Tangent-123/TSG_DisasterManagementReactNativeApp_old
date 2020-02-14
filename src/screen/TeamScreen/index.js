import React, { Component } from 'react';
import {
    FlatList, StatusBar,
    StyleSheet, Text, TouchableOpacity, Image, View
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import URLLINK from '../../util/ApiCollection';
import Spinner from 'react-native-loading-spinner-overlay';
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
            spinner:true,
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
                            console.log('rohit jain aa' + response);
                            if (response.data.status == 'true') {
                                console.log('rohit jain aaxad' + response.data.response);
                                this.setState({
                                    TeamArray: response.data.response,
                                    spinner:false
                                })

                            }else{
                                this.setState({
                                    spinner:false
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
            <View style={styles.container}>
                 <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{color:'#fff'}}
                />
                <View style={styles.HeaderBackground}>
                    <TouchableOpacity
                        onPress={this.getback} >
                        <Image source={require('../../images/arrow.png')} style={{ width: 30, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.HeaderText}>Team</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.TeamArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{elevation:10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.PERSON_NAME}</Text>
                                <Text style={{ fontSize: 16, color: '#000' }}>{item.PERSON_ORGANISATION}</Text>
                                <Text style={{ fontSize: 16, color: '#000' }}>{item.PERSON_PROFILE}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between',marginLeft:6, alignItems: 'center', marginRight: 8 }}>
                                <Text style={{fontSize:14,color:'#000',fontWeight:'200'}}>{item.MOBILE_NO}</Text>
                                <Text style={{fontSize:14,color:'#000',fontWeight:'200'}}>{item.EMAIL}</Text>
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

                <StatusBar
                    backgroundColor="#3386FF"
                    barStyle='dark-content'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    HeaderBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        backgroundColor: '#3386FF',
        //  marginLeft: 4,
        height: 60,

    },
    HeaderText: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: 10,
        fontFamily: "Gilroy-Bold",
    },
})  