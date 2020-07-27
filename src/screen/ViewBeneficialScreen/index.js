import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet, Text, TouchableOpacity, Image, View
} from 'react-native';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import CommanStyle from '../../Util/Header';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import BaseUrl from '../../Util/ApiCollection';
import StatusBar from '../../Assets/StatusBar';
import LevelStore from '../../Componenet/ReactString';
import StoreHeader from '../../Header';
import Constants from '../../Util/Config/Constants';

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
            SYS_ID: '',
            StateName: '',
            DsitrictName: '',
            BlockName: '',
            GRAMPANCHAYATNAME: '',
            VillageName: '',
            HamletName: '',
            showAlert: false,
        }
        this.loaddata();
    } 
    loaddata=async()=> {
        const ItemData = this.props.navigation.getParam('ItemData');
        let token = await AsyncStorage.getItem(Constants.access_token)
        let responsecode = await AsyncStorage.getItem(Constants.responseCode)
        this.setState({
            StateName: ItemData.STATE_NAME,
            DsitrictName: ItemData.DISTRICT_NAME,
            BlockName: ItemData.BLOCK_NAME,
            GRAMPANCHAYATNAME: ItemData.GRAM_PANCHAYAT_NAME,
            VillageName: ItemData.VILLAGE_NAME,
            HamletName: ItemData.HAMLET_NAME,
            AccessToken: token,
            ResponseCode: responsecode,
            SyS_ID:ItemData.RESPONSE_LOCATION_MAPPING_SYS_ID,
        });
        this.getBeneficiarylist();
    }
    getBeneficiarylist() {
       
                      
                        console.log('rrr' + this.state.SYS_ID)
                        Axios.get(BaseUrl.ViewResponseBeneficiary +this.state.ResponseCode + "&location_mapping_id=" + this.state.SyS_ID, {
                            headers: {
                                'Authorization': 'bearer ' + this.state.AccessToken
                            }
                        }).then((response) => {
                            console.log('rohit jain aa' + JSON.stringify(response.data.status));
                            console.log('rohit jain aa' + response);
                            if (response.data.status == 'true') {
                                console.log('rohit jain aaxad' + response.data.status);
                                this.setState({
                                    MappingListArray: response.data.response,
                                    spinner:false
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
        this.props.navigation.navigate('AddBeneFicialScreen');
    }
    DeleteNotice() {
        this.setState({ spinner: true })
        const data = JSON.stringify({
            BENEFICIARY_SYS_ID: this.state.SyS_ID,
            MODIFIED_BY: this.state.USER_ID,
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
                this.getBeneficiarylist();
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
                
                <StoreHeader title='Beneficiary List' onPress = {this.getback}/>
                <View>
                    <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 8, }}>
                        <View style={{ flexDirection: 'column', marginBottom: 4, alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                <Text style={{ fontSize: 14, width: '70%', color: '#3386FF', fontWeight: 'bold' }}>State</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', width: '28%' }}>{this.state.StateName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                <Text style={{ fontSize: 14, width: '70%', color: '#3386FF', fontWeight: 'bold' }}>District</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', width: '28%' }}>{this.state.DsitrictName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                <Text style={{ fontSize: 14, width: '70%', color: '#3386FF', fontWeight: 'bold' }}>Block</Text>
                                <Text style={{ fontSize: 14, color: '#000', width: '28%', fontWeight: '400' }}>{this.state.BlockName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                <Text style={{ fontSize: 14, width: '70%', color: '#3386FF', fontWeight: 'bold' }}>Gram Panhayat</Text>
                                <Text style={{ fontSize: 14, color: '#000', width: '28%', fontWeight: '400' }}>{this.state.GRAMPANCHAYATNAME}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                <Text style={{ fontSize: 14, color: '#3386FF', width: '70%', fontWeight: 'bold' }}>Village</Text>
                                <Text style={{ fontSize: 14, color: '#000', width: '28%', fontWeight: '400' }}>{this.state.VillageName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                <Text style={{ fontSize: 14, color: '#3386FF', width: '70%', fontWeight: 'bold' }}>Hamlet</Text>
                                <Text style={{ fontSize: 14, color: '#000', width: '28%', fontWeight: '400' }}>{this.state.HamletName}</Text>
                            </View>

                        </View>

                    </View>
                    <FlatList
                        data={this.state.MappingListArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity
                                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                    onPress={() => this.props.navigation.navigate('AddBeneFicialScreen', {
                                        BeneficalDetail: item
                                    })
                                    }>
                                    <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 10, borderWidth: .5, borderStartColor: '#3386FF' }}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginRight: 8 }}>
                                            <View style={{ flexDirection: 'row', marginBottom: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', width: '76%', justifyContent: 'flex-start', paddingTop: 4, paddingHorizontal: 4, paddingVertical: 4 }}>
                                                    <Text style={{ fontSize: 16, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>Family Male Head:</Text>
                                                    <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.FAMILY_HEAD_MALE}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                    onPress={() =>
                                                        this.setState({
                                                            showAlert: true,
                                                            SyS_ID: item.BENEFICIARY_SYS_ID,
                                                            USER_ID: item.POSTED_BY,
                                                        })}>
                                                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                        <Text style={{ backgroundColor: '#3386FF', fontSize: 10, color: '#fff', justifyContent: 'center', padding: 8, alignItems: 'center', borderRadius: 8 }}>
                                                            Delete  </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                                <Text style={{ fontSize: 16, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>Identity Type:</Text>
                                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.ID_TYPE}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                                <Text style={{ fontSize: 16, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>Identity Number:</Text>
                                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.ID_NUMBER}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                                <Text style={{ fontSize: 16, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>Mobile Number:</Text>
                                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.MOBILE_NO}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: '98%', justifyContent: 'flex-start', paddingHorizontal: 4, paddingVertical: 4 }}>
                                                <Text style={{ fontSize: 16, color: '#3386FF', fontWeight: 'bold', marginRight: 10 }}>Status:</Text>
                                                <Text style={{ fontSize: 15, color: 'green', fontWeight: 'bold' }}>{item.STATUS}</Text>
                                            </View>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
                <StatusBar/>
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Delete Alert.."
                    message='Are you sure you want to delete ?'
                    closeOnTouchOutside={true}
                    titleStyle={styles.text}
                    messageStyle={styles.textheader}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Cancel"
                    confirmText="Okay"
                    cancelButtonTextStyle={{ fontFamily: "Gilroy-Regular" }}
                    confirmButtonTextStyle={{ fontFamily: "Gilroy-Regular" }}
                    cancelButtonColor='red'
                    cancelButtonStyle={{ height: 38, width: 69, alignItems: 'center', }}
                    confirmButtonStyle={{ height: 38, width: 69, alignItems: 'center', }}
                    onCancelPressed={() => {
                        this.setState({
                            showAlert: false
                        })
                    }}
                    confirmButtonColor={Colors.Appcolor}
                    onConfirmPressed={() => {
                        this.DeleteNotice()
                        this.setState({
                            showAlert: false
                        })
                    }}
                />
            </View >
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
    text: {
        color: '#000',
        fontSize: 18,
        fontFamily: "Gilroy-Bold",
        fontWeight: '500',
    },
    textheader: {
        color: Colors.TextColorone,
        fontSize: 16,
        padding: 8,
        fontFamily: "Gilroy-SemiBold",
        fontWeight: '400',
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