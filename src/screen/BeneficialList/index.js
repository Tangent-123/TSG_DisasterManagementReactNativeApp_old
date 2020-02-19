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
                        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-response-beneficiary?beneficiary_sys_id=1&response_code=" + this.state.ResponseCode + "&location_mapping_id=1&status=Registered", {
                            headers: {
                                'Authorization': 'bearer ' + this.state.AccessToken
                            }
                        }).then((response) => {
                            console.log('rohit jain aa' + JSON.stringify(response.data));
                            console.log('rohit jain aa' + response);
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
        this.props.navigation.navigate('AddBeneFicialStack');
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
                        <Text style={styles.HeaderText}>Beneficiary List</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.MappingListArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View>
                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                onPress={() => this.props.navigation.navigate('UpdateLocationMappingStack', {
                                    UpdateMappingData: item
                                })
                                }>
                                <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.STATE_NAME}</Text>
                                        <Text style={{ fontSize: 16, color: '#000' }}>{item.DISTRICT_NAME}</Text>
                                        <Text style={{ fontSize: 16, color: '#000' }}>{item.BLOCK_NAME}</Text>
                                        <Text style={{ fontSize: 16, color: '#000' }}>{item.GRAM_PANCHAYAT_NAME}</Text>
                                        <Text style={{ fontSize: 16, color: '#000' }}>{item.VILLAGE_NAME}</Text>
                                        <Text style={{ fontSize: 16, color: '#000' }}>{item.HAMLET_NAME}</Text>
                                        <Text style={{ fontSize: 16, color: '#000' }}>{item.PARTNER_NAME}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />

                <StatusBar
                    backgroundColor="#3386FF"
                    barStyle='dark-content'
                />

                <View>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={() => this.AddMapping()}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginEnd: 10, padding: 10 }}>
                            <Text style={{ backgroundColor: '#008800', fontSize: 14, color: '#fff', justifyContent: 'center', marginLeft: 40, padding: 10, alignItems: 'center', borderRadius: 10 }}>
                                Add
                       </Text>
                        </View>
                    </TouchableOpacity>
                </View>
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