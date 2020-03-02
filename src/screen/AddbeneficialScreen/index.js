import React from 'react';
import {
    Image,
    StatusBar,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    View
} from 'react-native';
import Axios from 'axios';
import { TextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import BuyNFOStyle from './style';
import LoginApi from '../../util/ApiCollection';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import CommanStyle from '../../util/Header';
import qs from 'qs';
import PasswordInputText from 'react-native-hide-show-password-input';
import ColorCode from '../../util/Color_Value';
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
            RESPONSELOCATIONMAPPINGSYSID: '',
            CREATEDBY: '',
            spinner: false,
            AccessToken: '',
            ResponseCode: '',
            USER_ID: '',
            FIRST_NAME: '',
        }
    }

    componentWillMount() {
        const BeneficiaryUpdate = this.props.navigation.getParam('BeneficalDetail');
        console.log('hu' + BeneficiaryUpdate)
        if (BeneficiaryUpdate == '') {
            Toast.show('Hello Jain')
        } else {
            Toast.show('jai ho')
        }
        console.log('bd' + BeneficiaryUpdate)

        AsyncStorage.getItem('ResponseCode')
            .then(ResponseCode => {
                AsyncStorage.getItem('access_token')
                    .then(access_token => {
                        AsyncStorage.getItem('USER_ID')
                            .then(USER_ID => {
                                AsyncStorage.getItem('FIRST_NAME')
                                    .then(FIRST_NAME => {
                                        this.setState({
                                            AccessToken: access_token,
                                            USER_ID: USER_ID,
                                            FIRST_NAME: FIRST_NAME,
                                            ResponseCode: ResponseCode,
                                        });
                                    })
                            })
                    })
            })
    }
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    AddBeneficial() {
        //         if (this.state.FAMILYHEADMALE !== '') {
        //             if (this.state.FAMILYHEADFEMALE !== '') {
        //                 if (this.state.IDTYPE !== '') {
        //                     if (this.state.IDNUMBER !== '') {
        //                         if (this.state.MOBILENO !== '') {

        // console.log('headmale'+this.state.FAMILYHEADMALE)
        this.setState({
            spinner: true
        })
        const data = JSON.stringify({
            FAMILY_HEAD_MALE: this.state.FAMILYHEADFEMALE,
            FAMILY_HEAD_FEMALE: this.state.FAMILYHEADFEMALE,
            ID_TYPE: this.state.IDTYPE,
            ID_NUMBER: this.state.IDNUMBER,
            MOBILE_NO: this.state.MOBILENO,
            RESPONSE_LOCATION_MAPPING_SYS_ID: '4',
            IMAGE: this.state.IMAGE,
            CREATED_BY: 2,

        });
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'bearer ' + this.state.AccessToken
        };
        Axios.post(LoginApi.AddBeneficialData,
            data,
            { headers }
        ).then(p => {
            console.log('kfnnk' + JSON.stringify(p.data.response))
            if (p.data.status == 'true') {
                this.props.navigation.navigate('BeneficiallistStack');
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


        //                 } else {
        //                     Toast.show('Please Enter Vaild Password');
        //                 }
        //             } else {
        //                 Toast.show('Please Enter Vaild Email id');
        //             }
        //         } else {
        //             Toast.show('Please Enter Vaild Password');
        //         }
        //     } else {
        //         Toast.show('Please Enter Vaild Email id');
        //     }

        // } else {
        //     Toast.show('Please Enter Vaild Email id');
        // }

    }
    getback=()=>{
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
                <View style={CommanStyle.HeaderBackground}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={this.getback}>
                        <Image source={require('../../images/back.png')} style={{ width: 20, height: 20, }} />
                    </TouchableOpacity>
                    <Text style={CommanStyle.headerItem}>Add Beneficial Location</Text>
                </View>

                <View style={{ flex: 1, margin: 4, padding: 8 }}>
                    <TextInput
                        style={{ padding: 8, fontSize: 16, }}
                        //onTouchStart={() => this.StateList()}
                        placeholder="Family Head Male"
                        onChangeText={(FAMILYHEADMALE) => this.setState({ FAMILYHEADMALE })}
                        value={this.state.FAMILYHEADMALE}
                    />
                    <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>

                    <TextInput
                        style={{ padding: 8, fontSize: 16, }}
                        placeholder="Family Head Female"
                        onChangeText={(FAMILYHEADFEMALE) => this.setState({ FAMILYHEADFEMALE })}
                        value={this.state.FAMILYHEADFEMALE}
                    />
                    <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                    <RNPickerSelect

                        // placeholder={[{ label: 'Select ID Card Type', value: '0' }]}
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
                    <TextInput
                        style={{ padding: 8, fontSize: 16, }}
                        placeholder="ID NUMBER"
                        onChangeText={(IDNUMBER) => this.setState({ IDNUMBER })}
                        value={this.state.IDNUMBER}
                    />
                    <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>
                    <TextInput
                        style={{ padding: 8, fontSize: 16, }}
                        placeholder="Contact Number of Beneficiary"
                        onChangeText={(MOBILENO) => this.setState({ MOBILENO })}
                        value={this.state.MOBILENO}
                    />
                    <View style={{ width: '99%', backgroundColor: '#3386FF', height: 1, marginLeft: 4 }}></View>

                </View>

                <View style={{ alignItems: 'center', marginLeft: 8 }}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        style={BuyNFOStyle.AddToCardBtn}
                        onPress={() => this.AddBeneficial()}>
                        <Text style={BuyNFOStyle.TextStyle}>Add Beneficiary</Text>
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