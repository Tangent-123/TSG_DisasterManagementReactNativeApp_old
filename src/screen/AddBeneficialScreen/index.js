import React, { Component } from 'react';
import {
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    View
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import BuyNFOStyle from './style';
import LevelStore from '../../Componenet/ReactString';
import StoreHeader from '../../Header';
import LoginApi from '../../Util/ApiCollection';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import StatusBar from '../../Assets/StatusBar';
import qs from 'qs';
import ColorCode from '../../Util/Color_Value';
import RNPickerSelect from 'react-native-picker-select';

export default class AddBeneficialScreen extends React.Component {
    _isMounted = false;
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            FAMILYHEADFEMALE: '',
            FAMILYHEADMALE: '',
            IDNUMBER: '',
            IDTYPE: '',
            IMAGE: 'kjk',
            MOBILENO: '',
            SYS_ID: '',
            CREATEDBY: '',
            spinner: false,
            AccessToken: '',
            ResponseCode: '',
            USER_ID: '',
            FIRST_NAME: '',
            BtnLevel: 'Add Beneficiary',
            CREATED_BY: '',
            BENEFICIARY_SYS_ID:'',
            //BtnLevel
        }
    }

    componentWillMount() {
        const SYS_ID = this.props.navigation.getParam('SYS_ID');
        const BeneficalDetail = this.props.navigation.getParam('BeneficalDetail');
        console.log('rohit' + JSON.stringify(BeneficalDetail))
        if (BeneficalDetail == undefined) {
            this.setState({ SYS_ID: SYS_ID })
        } else {
            this.setState({
                BENEFICIARY_SYS_ID: BeneficalDetail.BENEFICIARY_SYS_ID,
                FAMILYHEADMALE: BeneficalDetail.FAMILY_HEAD_MALE,
                FAMILYHEADFEMALE: BeneficalDetail.FAMILY_HEAD_FEMALE,
                IDTYPE: BeneficalDetail.ID_TYPE,
                IDNUMBER: BeneficalDetail.ID_NUMBER,
                MOBILENO: BeneficalDetail.MOBILE_NO,
                SYS_ID: SYS_ID,
                BtnLevel: 'Update'

            })
        }
    }
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    AddBeneficial() {
        AsyncStorage.getItem('ResponseCode')
            .then(ResponseCode => {
                AsyncStorage.getItem('access_token')
                    .then(access_token => {
                        AsyncStorage.getItem('USER_ID')
                            .then(USER_ID => {
                                if (this.state.FAMILYHEADMALE !== '') {
                                    if (this.state.FAMILYHEADFEMALE !== '') {
                                        if (this.state.IDNUMBER !== '') {
                                            if (this.state.MOBILENO !== '') {
                                                if(this.state.ID_TYPE !== '0'){
                                                this.setState({
                                                    spinner: true
                                                })
                                                console.log('nffndfn' + this.state.BtnLevel)
                                                if (this.state.BtnLevel == 'Add Beneficiary') {
                                                    const data = JSON.stringify({
                                                        FAMILY_HEAD_MALE: this.state.FAMILYHEADMALE,
                                                        FAMILY_HEAD_FEMALE: this.state.FAMILYHEADFEMALE,
                                                        ID_TYPE: this.state.IDTYPE,
                                                        ID_NUMBER: this.state.IDNUMBER,
                                                        MOBILE_NO: this.state.MOBILENO,
                                                        RESPONSE_LOCATION_MAPPING_SYS_ID: this.state.SYS_ID,
                                                        IMAGE_1: this.state.IMAGE,
                                                        IMAGE_2:this.state.IMAGE,
                                                        IMAGE_3:this.state.Image,
                                                        CREATED_BY: USER_ID,
                                                        RESPONSE_CODE: ResponseCode

                                                    });
                                                    console.log('rohit' + data)
                                                    const headers = {
                                                        'content-type': 'application/json',
                                                        'Authorization': 'bearer ' + access_token
                                                    };
                                                    Axios.post(LoginApi.AddBeneficialData,
                                                        data,
                                                        { headers }
                                                    ).then(p => {
                                                        console.log('kfnnk' + JSON.stringify(p.data.status))
                                                        if (p.data.status == 'true') {
                                                            this.props.navigation.navigate('CountBeneficaryScreen');
                                                            Toast.show(p.data.response)
                                                            this.setState({
                                                                spinner: false,
                                                            });

                                                        } else {
                                                            // Toast.show(p.data.error_description);
                                                            this.setState({
                                                                spinner: false,
                                                            });
                                                        }
                                                    }).catch(function (error) {
                                                        Toast.show(error)
                                                        this.setState({
                                                            spinner: false
                                                        })

                                                    })
                                                } else {
                                                    const data = JSON.stringify({
                                                        FAMILY_HEAD_MALE: this.state.FAMILYHEADMALE,
                                                        FAMILY_HEAD_FEMALE: this.state.FAMILYHEADFEMALE,
                                                        ID_TYPE: this.state.IDTYPE,
                                                        ID_NUMBER: this.state.IDNUMBER,
                                                        MOBILE_NO: this.state.MOBILENO,
                                                        RESPONSE_LOCATION_MAPPING_SYS_ID: this.state.SYS_ID,
                                                        IMAGE_1: this.state.IMAGE,
                                                        IMAGE_2:this.state.IMAGE,
                                                        IMAGE_3:this.state.Image,
                                                        CREATED_BY: USER_ID,
                                                        RESPONSE_CODE: ResponseCode,
                                                        BENEFICIARY_SYS_ID:this.state.BENEFICIARY_SYS_ID

                                                    });
                                                    console.log('rohit hi' + data)
                                                    const headers = {
                                                        'content-type': 'application/json',
                                                        'Authorization': 'bearer ' + access_token
                                                    };
                                                    Axios.post(LoginApi.UpdateBeneficiaryData,
                                                        data,
                                                        { headers }
                                                    ).then(p => {
                                                        console.log('kfnnk' + JSON.stringify(p.data.response))
                                                        if (p.data.status == 'true') {
                                                            this.props.navigation.navigate('CountBeneficaryScreen');
                                                            Toast.show(p.data.response)
                                                            this.setState({
                                                                spinner: false,
                                                            });

                                                        } else {
                                                            // Toast.show(p.data.error_description);
                                                            this.setState({
                                                                spinner: false,
                                                            });
                                                        }
                                                    }).catch(function (error) {
                                                        Toast.show(error)
                                                        this.setState({
                                                            spinner: false
                                                        })

                                                    })

                                                }

                                            } else {
                                                Toast.show('Please Select ID Type');
                                            }
                                            } else {
                                                Toast.show('Please Enter Contact Number');
                                            }
                                        } else {
                                            Toast.show('Please Enter ID Number');
                                        }
                                    } else {
                                        Toast.show('Please Enter Family Head Female');
                                    }

                                } else {
                                    Toast.show('Please Enter Family Head Male');
                                }
                            })
                    })
            })

    }
    getback = () => {
        this.props.navigation.navigate('BeneficiallistStack');
    }
    resposecode = (value) => {
        console.log('jkfbebfe' + value)
        // AsyncStorage.setItem('ID', value)
        this.setState({ IDTYPE: value })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={CommanStyle.spinnerTextStyle}
                />
                <StoreHeader title={this.state.BtnLevel} onPress={this.getback}/>

                <View style={{ flex: 1, margin: 4, padding: 8 }}>
                <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>{LevelStore.FamilyHeadMale}</Text>
                    <TextInput
                        style={{ padding: 8, fontSize: 16, }}
                        //onTouchStart={() => this.StateList()}
                        placeholder="Family Head Male"
                    
                        onChangeText={(FAMILYHEADMALE) => this.setState({ FAMILYHEADMALE })}
                        value={this.state.FAMILYHEADMALE}
                    />
                    <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                    <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>{LevelStore.FamilyHeadFemale}</Text>
                    <TextInput
                        style={{ padding: 8, fontSize: 16, }}
                        placeholder="Family Head Female"
                        onChangeText={(FAMILYHEADFEMALE) => this.setState({ FAMILYHEADFEMALE })}
                        value={this.state.FAMILYHEADFEMALE}
                    />
                    <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                    <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>{LevelStore.DocumentType}</Text>
                    <RNPickerSelect
                        value={this.state.IDTYPE}
                        placeholder= {{label: 'Select Document', value: '0' }}
                        onValueChange={(itemValue) =>
                            this.resposecode(itemValue)}
                        items={[
                            { label: 'Aadhaar card', value: 'Aadhaar card', color: '#000' },
                            { label: 'Indian Passport', value: 'Indian Passport', color: '#000' },
                            { label: 'PAN Card', value: 'PAN Card', color: '#000' },
                            { label: 'Driving Licence', value: 'Driving Licence', color: '#000' },
                            { label: 'Ration Card', value: 'Ration Card', color: '#000' },
                            { label: 'Identity Certificate', value: 'Indentity Certificate', color: '#000' },
                            { label: 'Voter ID Card', value: 'Voter ID Card', color: '#000' },
                        ]}
                    />

                    <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                    <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>{LevelStore.IdentityNumber}</Text>
                    <TextInput
                        style={{ padding: 8, fontSize: 16, }}
                        placeholder="ID NUMBER"
                        maxLength={20}
                        keyboardType={'name-phone-pad'}
                        onChangeText={(IDNUMBER) => this.setState({ IDNUMBER })}
                        value={this.state.IDNUMBER}
                    />
                    <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                    <Text style={{ color: '#3386FF', fontSize: 16, fontWeight: '700' }}>{LevelStore.BeneficiaryContactNumber}</Text>
                    <TextInput
                        style={{ padding: 8, fontSize: 16, }}
                        placeholder="Contact Number of Beneficiary"
                        onChangeText={(MOBILENO) => this.setState({ MOBILENO })}
                        keyboardType={'numeric'}
                        maxLength={10}
                        
                        value={this.state.MOBILENO}
                    />
                    <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>

                </View>

                <View style={{ alignItems: 'center', marginLeft: 8 }}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        style={BuyNFOStyle.AddToCardBtn}
                        onPress={() => this.AddBeneficial()}>
                        <Text style={BuyNFOStyle.TextStyle}>{this.state.BtnLevel}</Text>
                    </TouchableOpacity>

                </View>

               <StatusBar/>

            </View>
        )
    }
}