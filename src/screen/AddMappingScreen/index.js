
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StatusBar, FlatList, TextInput, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-datepicker';
import BaseUrl from '../../util/ApiCollection';
import Colors from '../../util/Color_Value';
import BuyNFOStyle from './style';
import { TextField } from 'react-native-material-textfield';
import Spinner from 'react-native-loading-spinner-overlay';
import CommanStyle from '../../util/Header';

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
            RESPONSE_LOCATION_MAPPING_SYS_ID: '',
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('USER_ID')
            .then(USER_ID => {
                AsyncStorage.getItem('Mapping_ID')
                    .then(Mapping_ID => {
                        AsyncStorage.getItem('StateName')
                            .then(StateName => {
                                AsyncStorage.getItem('DistricName')
                                    .then(DistricName => {
                                        AsyncStorage.getItem('BlockName')
                                            .then(BlockName => {
                                                AsyncStorage.getItem('GramName')
                                                    .then(GramName => {
                                                        AsyncStorage.getItem('VillageName')
                                                            .then(VillageName => {
                                                                AsyncStorage.getItem('HamletName')
                                                                    .then(HamletName => {
                                                                        AsyncStorage.getItem('PartnerName')
                                                                            .then(PartnerName => {
                                                                                AsyncStorage.getItem('RESPONSE_CODE')
                                                                                    .then(RESPONSE_CODE => {
                                                                                        AsyncStorage.getItem('STATE_SYS_ID')
                                                                                            .then(STATE_SYS_ID => {
                                                                                                AsyncStorage.getItem('DISTRICT_SYS_ID')
                                                                                                    .then(DISTRICT_SYS_ID => {
                                                                                                        AsyncStorage.getItem('BLOCK_SYS_ID')
                                                                                                            .then(BLOCK_SYS_ID => {
                                                                                                                AsyncStorage.getItem('GRAM_PANCHAYAT_SYS_ID')
                                                                                                                    .then(GRAM_PANCHAYAT_SYS_ID => {
                                                                                                                        AsyncStorage.getItem('VILLAGE_SYS_ID')
                                                                                                                            .then(VILLAGE_SYS_ID => {
                                                                                                                                AsyncStorage.getItem('HEMLET_SYS_ID')
                                                                                                                                    .then(HEMLET_SYS_ID => {
                                                                                                                                        AsyncStorage.getItem('PARTNER_SYS_ID')
                                                                                                                                            .then(PARTNER_SYS_ID => {
                                                                                                                                                console.log('jain ' + Mapping_ID)
                                                                                                                                                Toast.show((Mapping_ID))

                                                                                                                                                if (Mapping_ID == null) {
                                                                                                                                                    Toast.show('null valu')
                                                                                                                                                    this.setState({ CREATED_BY: USER_ID })
                                                                                                                                                } else {
                                                                                                                                                    //console.log('Valuecheck' + (MappingUpdateData))
                                                                                                                                                    this.setState({
                                                                                                                                                        BtnLevel: 'Update Mapping Location',
                                                                                                                                                        StateName: StateName,
                                                                                                                                                        CREATED_BY: USER_ID,
                                                                                                                                                        StateID: STATE_SYS_ID,
                                                                                                                                                        ResponseCode:RESPONSE_CODE,
                                                                                                                                                        DistricName: DistricName,
                                                                                                                                                        BlockName: BlockName,
                                                                                                                                                        GramPanchayatName: GramName,
                                                                                                                                                        VillageName: VillageName,
                                                                                                                                                        HamletName: HamletName,
                                                                                                                                                        PartnerName: PartnerName,
                                                                                                                                                        DistricID: DISTRICT_SYS_ID,
                                                                                                                                                        BlockID: BLOCK_SYS_ID,
                                                                                                                                                        GramPanchayatID: GRAM_PANCHAYAT_SYS_ID,
                                                                                                                                                        VillageID: VILLAGE_SYS_ID,
                                                                                                                                                        HamletID: HEMLET_SYS_ID,
                                                                                                                                                        PartnerID: PARTNER_SYS_ID,
                                                                                                                                                        RESPONSE_LOCATION_MAPPING_SYS_ID: Mapping_ID
                                                                                                                                                    })
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                    })
                                                                                                                            })
                                                                                                                    })
                                                                                                            })
                                                                                                    })
                                                                                            })
                                                                                    })
                                                                            })
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    }
    StateList() {
        AsyncStorage.getItem('access_token')
            .then(access_token => {
                AsyncStorage.getItem('ResponseCode')
                    .then(ResponseCode => {
                        console.log('jajaj' + ResponseCode)
                        this.setState({
                            AccessToken: access_token,
                            ResponseCode: ResponseCode,
                        })
                        Axios.get("http://Devapi.tatadisasterresponse.com/api/get-state", {
                            headers: {
                                'Authorization': 'bearer ' + this.state.AccessToken
                            }
                        }).then((response) => {
                            console.log('rohit jain aa' + response.data);
                            console.log('rohit jain aa' + response);
                            if (response.data.status == true) {
                                console.log('rohit jain aaxad' + response.data.response);
                                this.setState({
                                    StateNameList: response.data.response,
                                    spinner: false
                                })

                            }
                        })
                    })
            })
    }
    StateView(itemvalue) {
        this.setState({
            StateName: itemvalue.STATE_NAME,
            StateID: itemvalue.STATE_ID,
            StateNameList: '',
        })
        // this.districView();
    }
    DistricList = () => {

        Axios.get("http://Devapi.tatadisasterresponse.com/api/get-district?state_id=" + this.state.StateID, {
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
        //this.BlockData();
    }
    BlockList = () => {
        Axios.get("http://Devapi.tatadisasterresponse.com/api/get-block-report?district_sys_id=" + this.state.DistricID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
            console.log('rohit jain aa' + response.data);
            console.log('rohit jain aa' + response);
            if (response.data.status == true) {
                console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
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
            if (response.data.status == true) {
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
            GramPanchayatID: itemvalue.PARTNER_SYS_ID,
            GramPanchayatName: item.GRAM_PANCHAYAT_NAME,
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
            if (response.data.status == true) {
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
            if (response.data.status == true) {
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
        Axios.get("http://Devapi.tatadisasterresponse.com/api/get-hemlet-report?village_sys_id=" + this.state.VillageID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
            console.log('rohit jain aa' + response.data);
            console.log('rohit jain aa' + response);
            if (response.data.status == true) {
                console.log('rohit jain aaxad' + JSON.stringify(response.data.response));
                this.setState({
                    HamletNameList: response.data.response,
                    spinner: false
                })

            }
        })
    }
    PartnerView(itemvalue) {
        this.setState({
            PartnerID: itemvalue.HAMLET_SYS_ID,
            PartnerName: itemvalue.HAMLET_NAME,
            PartnerNameList: '',
        })

    }
    getback = () => {
        this.props.navigation.navigate('MappingListStack');
    }

    AddMappingData() {
        this.setState({ spinner: true })
        if (this.state.BtnLevel == 'Update Mapping Location') {
            // {"RESPONSE_LOCATION_MAPPING_SYS_ID":1,"PARTNER_NAME":"R jain",
            // "PARTNER_SYS_ID":40,"STATE_NAME":"Andaman and Nicobar Islands",
            // "STATE_SYS_ID":12,"DISTRICT_NAME":"NICOBARS","DISTRICT_SYS_ID":1,
            // "BLOCK_NAME":"Cjc","BLOCK_SYS_ID":84,"GRAM_PANCHAYAT_NAME":"Chch",
            // "GRAM_PANCHAYAT_SYS_ID":83,"VILLAGE_NAME":"","VILLAGE_SYS_ID":84,"HAMLET_NAME":"",
            // "HEMLET_SYS_ID":85,"RESPONSE_CODE":"DAM_EA_FEB_2020"}

            const data = JSON.stringify({
                RESPONSE_LOCATION_MAPPING_SYS_ID: this.state.RESPONSE_LOCATION_MAPPING_SYS_ID,
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
                CREATED_BY: this.state.CREATED_BY,
            });
            console.log('rohit jain' + data)
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'bearer ' + this.state.AccessToken
            };
           // console.log('hearvgdh' + headers)
            Axios.post(BaseUrl.UpadateMapping,
                data,
                { headers }

            ).then(p => {
                console.log('Kapil j ' + JSON.stringify(p))
                if (p.data.status == true) {
                    Toast.show(p.data.response);
                    this.props.navigation.navigate('MappingListStack')
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
                CREATED_BY: this.state.CREATED_BY,
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
                if (p.data.status == true) {
                    Toast.show(p.data.response);
                    this.props.navigation.navigate('MappingListStack')
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
    }



    render() {
        return (
            <View style={CommanStyle.MainView} >
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={BuyNFOStyle.spinnerTextStyle}
                />
                <View style={CommanStyle.HeaderBackground}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={this.getback}>
                        <Image source={require('../../images/back.png')} style={{ width: 20, height: 20, }} />
                    </TouchableOpacity>
                    <Text style={CommanStyle.headerItem}>{this.state.BtnLevel}</Text>
                </View>
                <ScrollView
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, margin: 4, padding: 8 }}>
                        <TextInput
                            style={{ padding: 8, fontSize: 16, }}
                            onTouchStart={() => this.StateList()}
                            placeholder="State"
                            onChangeText={(StateName) => this.setState({ StateName })}
                            value={this.state.StateName}
                        />
                        <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                        <FlatList
                            data={this.state.StateNameList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        // style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.StateView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.STATE_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />

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
                                <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        // style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.DistricView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.DISTRICT_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
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
                                <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        //style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.BlockView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.BLOCK_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
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
                                <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        // style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.GramPanchayatView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.GRAM_PANCHAYAT_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <TextInput
                            style={{ padding: 8, fontSize: 16, }}
                            onTouchStart={() => this.VillageList()}
                            placeholder="Village"
                            onChangeText={(VillageName) => this.setState({ VillageName })}
                            value={this.state.VillageName}
                        />
                        <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                        <FlatList
                            data={this.state.StateList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.VillageView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.VILLAGE_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
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
                                <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.HamletView(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.HAMLET_NAME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
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
                                <View style={{ margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                        // style={BuyNFOStyle.AddToCardBtn}
                                        onPress={() => this.Pat(item)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.STATE_NAME}</Text>
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

                <StatusBar
                    backgroundColor='#3386FF'
                    barStyle='dark-content'
                />
            </View >
        )
    }
}