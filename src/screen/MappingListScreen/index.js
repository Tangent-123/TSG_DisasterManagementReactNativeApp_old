import React, { Component } from 'react';
import {
    FlatList, StatusBar,
    StyleSheet, Text, TouchableOpacity, Image, View
} from 'react-native';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import URLLINK from '../../util/ApiCollection';
export default class MappingListScreen extends Component {
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
            <View style={styles.container}>
                <View style={styles.HeaderBackground}>
                    <TouchableOpacity
                        onPress={this.getback} >
                        <Image source={require('../../images/arrow.png')} style={{ width: 30, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.HeaderText}>Location Mapping </Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.MappingListArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View>
                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                onPress={() => this.UpdateData(item)}
                            >
                                <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 8, }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                        <View style={{ flexDirection: 'row', marginBottom: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                                
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', }}>{item.STATE_NAME}</Text>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() => this.DeleteNotice(item)}>
                                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                    <Text style={{ backgroundColor: '#3386FF', fontSize: 10, color: '#fff', justifyContent: 'center', padding: 8, alignItems: 'center', borderRadius: 8 }}>
                                                        Delete  </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', width: '50%' }}>District Name</Text>
                                            <Text style={{ fontSize: 13, color: '#000', width: '50%' }}>: {item.DISTRICT_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', width: '50%' }}>Block Name  </Text>
                                            <Text style={{ fontSize: 13, color: '#000', width: '50%' }}>: {item.BLOCK_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', width: '50%' }}>Gram Panchayat Name</Text>
                                            {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                            <Text style={{ fontSize: 13, color: '#000', width: '50%' }} numberOfLines={4}>: {item.GRAM_PANCHAYAT_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', width: '50%' }}>Village Name</Text>
                                            {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                            <Text style={{ fontSize: 13, color: '#000', width: '50%' }} numberOfLines={4}>: {item.VILLAGE_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', width: '50%' }}>Hamlet Name</Text>
                                            {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                            <Text style={{ fontSize: 13, color: '#000', width: '50%' }} numberOfLines={4}>: {item.HAMLET_NAME}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', width: '50%' }}>Response Code</Text>
                                            {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                            <Text style={{ fontSize: 13, color: '#000', width: '50%' }} numberOfLines={4}>: {item.RESPONSE_CODE}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '99%' }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', width: '50%' }}>Partner Name</Text>
                                            {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                            <Text style={{ fontSize: 13, color: '#000', width: '50%' }} numberOfLines={4}>: {item.PARTNER_NAME}</Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </View>
                    }
                />
 <View style={{marginBottom:10}}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={() => this.AddMapping()}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginEnd: 10, padding: 10 }}>
                            <Text style={{ backgroundColor: '#3386FF', fontSize: 14, color: '#fff', justifyContent: 'center', marginLeft: 40, padding: 10, alignItems: 'center', borderRadius: 10 }}>
                                Add
                       </Text>
                        </View>
                    </TouchableOpacity>
                </View>
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