
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
export default class UpdateLocationMapping extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            AccessToken: '',
            StateName: '',
            StateID: '0',
            StateNameList: [],
            DistricID: '0',
            DistricName: '',
            DistricNameList: [],
            BlockID: '0',
            BlockName: '',
            BlockNameList: [],
            GramPanchayatID: '',
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

        }
    }

    componentWillMount() {
        const UpdateDataValue = this.props.navigation.getParam('UpdateMappingData');
        console.log('roje'+UpdateDataValue)

    }

    getback = () => {
        this.props.navigation.navigate('MappingListStack');
    }

    AddMappingData() {
        this.setState({
            spinner: true
        })
        const data = JSON.stringify({
            RESPONSE_LOCATION_MAPPING_SYS_ID:"1",
            PARTNER_SYS_ID:"8",
            STATE_SYS_ID:"1",
            DISTRICT_SYS_ID:2,
            BLOCK_SYS_ID:"2",
            GRAM_PANCHAYAT_SYS_ID:"2",
            VILLAGE_SYS_ID:"2",
            HEMLET_SYS_ID:"6",
            CREATED_BY:2
        });
        console.log('rohit jain' + data)
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'bearer ' + this.state.AccessToken
        };
        console.log('hearvgdh' + headers)
        Axios.post(BaseUrl.UpadateMapping,
            data,
            { headers }
        ).then(p => {
            console.log('Kapil j ' + (p.data))
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




    render() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={BuyNFOStyle.spinnerTextStyle}
                />
                <View style={BuyNFOStyle.HeaderBackground}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={this.getback}>
                        <Image source={require('../../images/arrow.png')} style={{ width: 30, height: 20, }} />
                    </TouchableOpacity>
                    <Text style={BuyNFOStyle.headerItem}>Update Location Mapping</Text>
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
                        <Text style={BuyNFOStyle.TextStyle}>Update Mapping</Text>
                    </TouchableOpacity>

                </View>

                <StatusBar
                    backgroundColor='#3386FF'
                    barStyle='dark-content'
                />
            </View>
        )
    }
}