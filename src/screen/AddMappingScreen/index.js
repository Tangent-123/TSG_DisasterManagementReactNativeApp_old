
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, FlatList, TextInput, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-datepicker';
import BaseUrl from '../../Util/ApiCollection';
import Colors from '../../Util/Color_Value';
import LevelStore from '../../Componenet/ReactString';
import StoreHeader from '../../Header';
import BuyNFOStyle from './style';
import Spinner from 'react-native-loading-spinner-overlay';
import CommanStyle from '../../Util/Header';
import StatusBar from '../../Assets/StatusBar';


export default class AddMappingScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            AccessToken: '',
            StateName: '',
            ResponseCode: '',
            StateID: '0',
            StateNameList: [],
            DistricID: '0',
            DistricName: '',
            DistricNameList: [],
            BlockID: '0',
            BlockName: '',
            BlockNameList: [],
            GramPanchayatID: '0',
            GramPanchayatName: '',
            GramPanchayatNameList: [],
            VillageID: '0',
            VillageName: '',
            VillageNameList: [],
            HamletID: '0',
            HamletName: '',
            HamletNameList: [],
            PartnerName: '',
            PartnerID: '0',
            PartnerNameList: '',
            BtnLevel: 'Add Mapping Location',
            CREATED_BY: '',
            SYS_ID: '',
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('access_token')
        .then(access_token => {
        const MappingUpdateData = this.props.navigation.getParam('MappingUpdateData');
        console.log('Mapping' + JSON.stringify(MappingUpdateData));
        if (MappingUpdateData !== undefined) {
            this.setState({
                SYS_ID: MappingUpdateData.RESPONSE_LOCATION_MAPPING_SYS_ID,
                StateName: MappingUpdateData.STATE_NAME,
                DistricName: MappingUpdateData.DISTRICT_NAME,
                BlockName: MappingUpdateData.BLOCK_NAME,
                GramPanchayatName: MappingUpdateData.GRAM_PANCHAYAT_NAME,
                VillageName: MappingUpdateData.VILLAGE_NAME,
                HamletName: MappingUpdateData.HAMLET_NAME,
                PartnerName: MappingUpdateData.PARTNER_NAME,
                ResponseCode: MappingUpdateData.RESPONSE_CODE,
                PartnerID: MappingUpdateData.PARTNER_SYS_ID,
                StateID: MappingUpdateData.STATE_SYS_ID,
                DistricID: MappingUpdateData.DISTRICT_SYS_ID,
                BlockID: MappingUpdateData.BLOCK_SYS_ID,
                GramPanchayatID: MappingUpdateData.GRAM_PANCHAYAT_SYS_ID,
                VillageID: MappingUpdateData.VILLAGE_SYS_ID,
                HamletID: MappingUpdateData.HEMLET_SYS_ID,
                BtnLevel:'Update Mapping Location',
                AccessToken:access_token,
            })
        } else {
            //ResponseCode
            AsyncStorage.getItem('ResponseCode')
            .then(ResponseCode => {
            AsyncStorage.getItem('StateName')
            .then(StateName => {
                AsyncStorage.getItem('State_ID')
                .then(State_ID => {
                    console.log('jjf'+State_ID)
                    this.setState({
                        StateName:StateName,
                        StateID:State_ID,
                        AccessToken:access_token,
                        ResponseCode:ResponseCode,
                    })
                    })
    
                })
            })

        }
    })

    }

    DistricList(){
        Axios.get(BaseUrl.Distric + this.state.StateID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aa' + response.data);
            console.log('rohit jain aa' + response);
            if (response.data.status == true) {
                console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
                this.setState({
                    DistricNameList: response.data.response,
                    spinner: false
                })

            }
        })

    }
    DistricView = (itemvalue) => {
        this.setState({
            DistricID: itemvalue.DISTRICT_ID,
            DistricName: itemvalue.DISTRICT_NAME,
            DistricNameList: '',
        })
        //this.BlockList();
    }
    BlockList = () => {
        Axios.get(BaseUrl.GetBlockReport + this.state.DistricID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aaxad' + JSON.stringify(response));
            console.log('rohit jain aa' + response.data.status);
            console.log('rohit jain aa' + response);
            if (response.data.status == "true") {
                console.log('rohit jain aaxad dwddde11111' + JSON.stringify(response.data.response));
                this.setState({
                    BlockNameList: response.data.response,
                    spinner: false
                })

            }
        })


    }
    BlockView(itemvalue) {
        this.setState({
            BlockID: itemvalue.BLOCK_SYS_ID,
            BlockName: itemvalue.BLOCK_NAME,
            BlockNameList: '',
        })
    }
    GramPanchayat = () => {

        Axios.get("http://Devapi.tatadisasterresponse.com/api/get-gram-panchayat-report?block_sys_id=" + this.state.BlockID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
            console.log('rohit jain aa' + response.data);
            console.log('rohit jain aa' + response);
            if (response.data.status == "true") {
                console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
                this.setState({
                    GramPanchayatNameList: response.data.response,
                    spinner: false
                })

            }
        })


    }
    GramPanchayatView(itemvalue) {
        this.setState({
            GramPanchayatID: itemvalue.PANCHAYAT_SYS_ID,
            GramPanchayatName: itemvalue.GRAM_PANCHAYAT_NAME,
            GramPanchayatNameList: '',
        })
    }

    VillageList = () => {
        Axios.get("http://Devapi.tatadisasterresponse.com/api/get-village-report?village_sys_id=" + this.state.GramPanchayatID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
            console.log('rohit jain aa' + response.data);
            console.log('rohit jain aa' + response);
            if (response.data.status == "true") {
                console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
                this.setState({
                    VillageNameList: response.data.response,
                    spinner: false
                })

            }
        })




    }
    VillageView(itemvalue) {
        this.setState({
            VillageID: itemvalue.VILLAGE_SYS_ID,
            VillageName: itemvalue.VILLAGE_NAME,
            VillageNameList: '',
        })

    }
    HamletList = () => {
        Axios.get("http://Devapi.tatadisasterresponse.com/api/get-hemlet-report?village_sys_id=" + this.state.VillageID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
            console.log('rohit jain aa' + response.data);
            console.log('rohit jain aa' + response);
            if (response.data.status == "true") {
                console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
                this.setState({
                    HamletNameList: response.data.response,
                    spinner: false
                })

            }
        })


    }
    HamletView(itemvalue) {
        this.setState({
            HamletID: itemvalue.HAMLET_SYS_ID,
            HamletName: itemvalue.HAMLET_NAME,
            HamletNameList: '',
        })

    }

    PartnerList = () => {
        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-partner-name?hemlet_sys_id=" + this.state.HamletID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
            console.log('rohit jain aa' + response.data);
            console.log('rohit jain aa' + response);
            if (response.data.status == "true") {
                console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
                this.setState({
                    PartnerNameList: response.data.response,
                    spinner: false
                })

            }
        })
    }
    PartnerView(itemvalue) {
        this.setState({
            PartnerID: itemvalue.PARTNER_SYS_ID,
            PartnerName: itemvalue.PARTNER_NAME,
            PartnerNameList: '',
        })

    }
    getback = () => {
        this.props.navigation.navigate('MappingListStack');
    }

    AddMappingData() {
        this.setState({ spinner: true })
        AsyncStorage.getItem('USER_ID')
                .then(USER_ID => {
        if (this.state.BtnLevel == 'Update Mapping Location') {
            // {"RESPONSE_LOCATION_MAPPING_SYS_ID":1,"PARTNER_NAME":"R jain",
            // "PARTNER_SYS_ID":40,"STATE_NAME":"Andaman and Nicobar Islands",
            // "STATE_SYS_ID":12,"DISTRICT_NAME":"NICOBARS","DISTRICT_SYS_ID":1,
            // "BLOCK_NAME":"Cjc","BLOCK_SYS_ID":84,"GRAM_PANCHAYAT_NAME":"Chch",
            // "GRAM_PANCHAYAT_SYS_ID":83,"VILLAGE_NAME":"","VILLAGE_SYS_ID":84,"HAMLET_NAME":"",
            // "HEMLET_SYS_ID":85,"RESPONSE_CODE":"DAM_EA_FEB_2020"}

            const data = JSON.stringify({
                RESPONSE_LOCATION_MAPPING_SYS_ID: this.state.SYS_ID,
                RESPONSE_CODE: this.state.ResponseCode,
                PARTNER_SYS_ID: this.state.PartnerID,
                PARTNER_NAME: this.state.PartnerName,
                STATE_SYS_ID: this.state.StateID,
                STATE_NAME: this.state.StateName,
                DISTRICT_SYS_ID: this.state.DistricID,
                DISTRICT_NAME: this.state.DistricName,
                BLOCK_SYS_ID: this.state.BlockID,
                BLOCK_NAME: this.state.BlockName,
                GRAM_PANCHAYAT_SYS_ID: this.state.GramPanchayatID,
                GRAM_PANCHAYAT_NAME: this.state.GramPanchayatName,
                VILLAGE_SYS_ID: this.state.VillageID,
                VILLAGE_NAME: this.state.VillageName,
                HEMLET_SYS_ID: this.state.HamletID,
                HAMLET_NAME: this.state.HamletName,
                CREATED_BY: USER_ID,
            });
            console.log('KApil data' + data)
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'bearer ' + this.state.AccessToken
            };
            // console.log('hearvgdh' + headers)
            Axios.post(BaseUrl.UpadateMapping,
                data,
                { headers }

            ).then(p => {
                console.log('Kapil jain jdnknd ' + JSON.stringify(p))
                if (p.data.status == 'true') {
                    this.props.navigation.navigate('MappingListScreen');
                    Toast.show(p.data.response);
                   
                    this.setState({
                        spinner: false,
                    });

                } else {
                    Toast.show(p.data.response);
                    this.setState({
                        spinner: false,
                    });
                }

            }).catch(function (error) {


            })
        } else {


            // {"RESPONSE_CODE":"DAM_EA_FEB_2020","PARTNER_SYS_ID":"0",
            // "PARTNER_NAME":"Kfkckvbl","STATE_SYS_ID":36,"DISTRICT_SYS_ID":17,
            // "DISTRICT_NAME":"ANJAW","BLOCK_SYS_ID":"0","BLOCK_NAME":"Jfg",
            // "GRAM_PANCHAYAT_SYS_ID":"","GRAM_PANCHAYAT_NAME":"Ritiy",
            // "VILLAGE_SYS_ID":"0",
            // "VILLAGE_NAME":"Sii","HEMLET_SYS_ID":"0","HAMLET_NAME":"Fjdjfu","CREATED_BY":"1"}
            const data = JSON.stringify({
                RESPONSE_CODE: this.state.ResponseCode,
                PARTNER_SYS_ID: this.state.PartnerID,
                PARTNER_NAME: this.state.PartnerName,
                STATE_SYS_ID: this.state.StateID,
                //STATE_NAME: this.state.StateName,
                DISTRICT_SYS_ID: this.state.DistricID,
                DISTRICT_NAME: this.state.DistricName,
                BLOCK_SYS_ID: this.state.BlockID,
                BLOCK_NAME: this.state.BlockName,
                GRAM_PANCHAYAT_SYS_ID: this.state.GramPanchayatID,
                GRAM_PANCHAYAT_NAME: this.state.GramPanchayatName,
                VILLAGE_SYS_ID: this.state.VillageID,
                VILLAGE_NAME: this.state.VillageName,
                HEMLET_SYS_ID: this.state.HamletID,
                HAMLET_NAME: this.state.HamletName,
                CREATED_BY: USER_ID,
            });
            console.log('rohit jain' + data)
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'bearer ' + this.state.AccessToken
            };
            console.log('hearvgdh' + headers)
            Axios.post(BaseUrl.AddMappingData,
                data,
                { headers }

            ).then(p => {
                console.log('Kapil j ' + JSON.stringify(p))
                if (p.data.status == 'true') {
                   
                    Toast.show(p.data.response);
                    this.props.navigation.navigate('MappingListScreen');
                    this.setState({
                        spinner: false,
                    });

                } else {
                    Toast.show(p.data.response);
                    this.setState({
                        spinner: false,
                    });
                }

            }).catch(function (error) {

            })
        }
    })
    }



    render() {
        return (
            <View style={CommanStyle.MainView} >
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={BuyNFOStyle.spinnerTextStyle}
                />
                <StoreHeader title={this.state.BtnLevel} onPress={this.getback}/>
                <ScrollView
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, margin: 4, padding: 8 }}>
                    <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>State Name</Text>
                        <TextInput
                            style={{ padding: 8, fontSize: 16, }}
                            placeholder="State"
                            editable={false}
                            onChangeText={(StateName) => this.setState({ StateName:StateName })}
                            value={this.state.StateName}
                        />
                        <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                        <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>District Name</Text>
                        <TextInput
                            style={{ padding: 8, fontSize: 16, }}
                            onTouchStart={() => this.DistricList()}
                            placeholder="District"
                            onChangeText={(DistricName) => this.setState({ DistricName })}
                            value={this.state.DistricName}
                        />
                        <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                        <FlatList
                            data={this.state.DistricNameList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ margin: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        // style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.DistricView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.DISTRICT_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>Block Name</Text>
                        <TextInput
                            style={{ padding: 8, fontSize: 16, }}
                            onTouchStart={() => this.BlockList()}
                            placeholder="Block"
                            onChangeText={(BlockName) => this.setState({ BlockName })}
                            value={this.state.BlockName}
                        />
                        <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                        <FlatList
                            data={this.state.BlockNameList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ margin: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        //style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.BlockView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.BLOCK_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>Gram Panchayat</Text>
                        <TextInput
                            style={{ padding: 8, fontSize: 16, }}
                            onTouchStart={() => this.GramPanchayat()}
                            placeholder="Gram Panchayat"
                            onChangeText={(GramPanchayatName) => this.setState({ GramPanchayatName })}
                            value={this.state.GramPanchayatName}
                        />
                        <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                        <FlatList
                            data={this.state.GramPanchayatNameList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ margin: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        // style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.GramPanchayatView(item)}>
                                       <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.GRAM_PANCHAYAT_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>Village Name</Text>
                        <TextInput
                            style={{ padding: 8, fontSize: 16, }}
                            onTouchStart={() => this.VillageList()}
                            placeholder="Village"
                            onChangeText={(VillageName) => this.setState({ VillageName })}
                            value={this.state.VillageName}
                        />
                        <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                        <FlatList
                            data={this.state.VillageNameList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ margin: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                       // style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.VillageView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.VILLAGE_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>Hamlet Name</Text>
                        <TextInput
                            style={{ padding: 8, fontSize: 16, }}
                            onTouchStart={() => this.HamletList()}
                            placeholder="Hamlet"
                            onChangeText={(HamletName) => this.setState({ HamletName })}
                            value={this.state.HamletName}
                        />
                        <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                        <FlatList
                            data={this.state.HamletNameList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ margin: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        //style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.HamletView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.HAMLET_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>Partner Name</Text>
                        <TextInput
                            style={{ padding: 8, fontSize: 16, }}
                            onTouchStart={() => this.PartnerList()}
                            placeholder="Partner Name"
                            onChangeText={(PartnerName) => this.setState({ PartnerName })}
                            value={this.state.PartnerName}
                        />
                        <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                        <FlatList
                            data={this.state.PartnerNameList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ margin: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        // style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.PartnerView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>{item.PARTNER_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </View>

                </ScrollView>

                <View style={{ alignItems: 'center', marginLeft: 8 }}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        style={BuyNFOStyle.AddToCardBtn}
                        onPress={() => this.AddMappingData()}>
                        <Text style={BuyNFOStyle.TextStyle}>{this.state.BtnLevel}</Text>
                    </TouchableOpacity>

                </View>

                <StatusBar/>
            </View>
        )
    }
}