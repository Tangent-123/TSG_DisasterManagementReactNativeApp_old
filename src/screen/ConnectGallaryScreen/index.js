import React, { useState, useEffect } from "react";
import {
    FlatList,
    StyleSheet, Text, TouchableOpacity, Image, View
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import CommanStyle from '../../Util/Header';
import LevelStore from '../../Componenet/ReactString';
import StoreHeader from '../../Header';
import Constants from '../../Util/Config/Constants';

import StatusBar from '../../Assets/StatusBar';
export default function ConnectGallaryScreen({navigation}) {
    const [AccessToken,setAccessToken] = useState('')
    const [USER_ID,setUSER_ID] = useState('')
    const [FIRST_NAME,setFIRST_NAME] = useState('')
    const [TeamArray,setTeamArray] = useState([])
    const [ResponseCode,setResponseCode] = useState('')
    const [spinner,setspinner] = useState(true)


    useEffect() {
         let token= AsyncStorage.getItem(Constants.access_token)
        let responsecode =  AsyncStorage.getItem(Constants.responseCode)
                        Axios.get("http://uatapi.tatadisasterresponse.com/api/view-generate-team?responce_code=" + responsecode, {
                            headers: {
                                'Authorization': 'bearer ' + token
                            }
                        }).then((response) => {
                            console.log('rohit jain aa' + response.data);
                            console.log('rohit jain aa' +JSON.stringify(response));
                            if (response.data.status == 'true') {
                                console.log('rohit jain aaxad' + response.data.response);
                                    setTeamArray(response.data.response)
                                    setspinner(false)
                            } else {
                                    setspinner(false)
                            }
                        })
                    })
            })

    }
    getback = () => {
        navigation.navigate('DashboardScreen')
    }
    
        return (
            <View style={CommanStyle.MainView}>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />
               <StoreHeader title='Connect Gallary' onPress={this.getback}/>
                <FlatList
                    data={TeamArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 8, }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Person Name </Text>
                                    <Text style={{ fontSize: 15, color: '#000', fontWeight: '200' }}>: {item.PERSON_NAME}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Organisation  </Text>
                                    <Text style={{ fontSize: 15, color: '#000' }}>: {item.PERSON_ORGANISATION}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Profile</Text>
                                    {/* <Image source={require('../../images/portfolio.png')} style={{ width: 4?0, height: 25 ,padding: 5 }} /> */}
                                    <Text style={{ fontSize: 15, color: '#000',marginLeft:54 }}>: {item.PERSON_PROFILE}</Text>
                                </View>
                          

                                <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Contact No.</Text>
                                    <Text style={{ fontSize: 15, color: '#000',marginLeft:16  }}>: {item.MOBILE_NO}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Email ID</Text>
                                    <Text style={{ fontSize: 15, color: '#000',  marginLeft:42 }}>: {item.EMAIL}</Text>
                                </View>
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

               <StatusBar/>
            </View>
        );
    
}
