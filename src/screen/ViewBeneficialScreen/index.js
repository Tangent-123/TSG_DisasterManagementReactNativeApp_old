import React, { Component } from 'react';
import {
    FlatList, StatusBar,
    StyleSheet, Text, TouchableOpacity, Image, View
} from 'react-native';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import CommanStyle from '../../util/Header';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../util/ApiCollection';
export default class BeneficialListScreen extends Component {
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
                        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-response-beneficiary?response_code=" + ResponseCode, {
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
    DeleteNotice(item) {
        this.setState({ spinner: true })
        const data = JSON.stringify({
            BENEFICIARY_SYS_ID: JSON.stringify(item.BENEFICIARY_SYS_ID),
            MODIFIED_BY: (item.POSTED_BY),
        });
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'bearer ' + this.state.AccessToken
        };
        Axios.post(BaseUrl.DeleteResponseBeneficiary,
            data,
            { headers }
        ).then(p => {
            console.log('riohrigh' + JSON.stringify(p.data))
            if (p.data.status == 'true') {
                Toast.show(p.data.response);
                this.getNoticeList();
                //this.props.navigation.navigate('Dashboard');
                this.setState({
                    spinner: false,
                });

            } else {
                Toast.show(p.data.response);
                this.setState({
                    spinner: false,
                });
            }

        }).catch()

    }
    render() {
        return (
            <View style={CommanStyle.MainView}>
                <View style={CommanStyle.HeaderBackground}>
                    <TouchableOpacity
                        onPress={this.getback} >
                        <Image source={require('../../images/back.png')} style={{ width: 20, height: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={CommanStyle.headerItem}>Beneficiary List</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.MappingListArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View>
                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                onPress={() => this.props.navigation.navigate('AddBeneFicialStack', {
                                    BeneficalDetail: item
                                })
                                }>
                                <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 10, borderWidth: .5, borderStartColor: '#3386FF' }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginRight: 8 }}>
                                        <View style={{ flexDirection: 'row', marginBottom: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', width: '76%', justifyContent: 'flex-start', paddingTop: 4, paddingHorizontal: 4, paddingVertical: 4 }}>
                                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 10 }}>Family Head:</Text>
                                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.FAMILY_HEAD_MALE}</Text>
                                            </View>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() => this.DeleteNotice(item)}>
                                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                    <Text style={{ backgroundColor: '#3386FF', fontSize: 10, color: '#fff', justifyContent: 'center', padding: 8, alignItems: 'center', borderRadius: 8 }}>
                                                        Delete  </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 10 }}>Identity Type:</Text>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.ID_TYPE}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 10 }}>Mobile Number:</Text>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.MOBILE_NO}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 10 }}>Status:</Text>
                                            <Text style={{ fontSize: 15, color: 'green', fontWeight: 'bold' }}>{item.STATUS}</Text>
                                        </View>
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