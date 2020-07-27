import React,{Component} from 'react';
import {Alert} from 'react-native';
import {takeEvery,put,call} from 'redux-saga/effects';
import Api from '../Api';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../../Util/Config/Constants';
import { StackActions ,NavigationActions} from 'react-navigation';

function* doLogin(action){
    try{
    const data = qs.stringify({
     username: action.username,
     password: action.password,
     grant_type:action.granttype,
    });
    const p = yield call(Api.fetchDataByPOST,action.url,data)
    console.log(response)
   if(p.data.status == 'TRUE'){
    yield put({
        type:'User_Login_Success',
        payload:response.data
    })
     AsyncStorage.setItem(Constants.token, p.data.access_token);
    AsyncStorage.setItem(Constants.tokentype, p.data.token_type)
    AsyncStorage.setItem(Constants.user_id, p.data.USER_ID);
    AsyncStorage.setItem(Constants.firstname, p.data.FIRST_NAME);
    AsyncStorage.setItem(Constants.system_roll_code, p.data.SYSTEM_ROLE_CODE);
    AsyncStorage.setItem(Constants.emergencyname, p.data.EMERGENCY_NAME);
    AsyncStorage.setItem(Constants.mobilenumber, p.data.MOBILE_NO);
    AsyncStorage.setItem(Constants.emergencynumber, p.data.EMERGENCY_CONTACT);

if(action.navigateTo){
    const resetAction = StackActions.reset({
        index:0,
        actions:[NavigationActions.navigate({routeName:action.navigateTo})],
    });
    action.navigate.dispatch(resetAction);
   }else{
        const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'more' })],
              });
              action.navigation.dispatch(resetAction);
            }
        } else {
            //console.log(response.meta.message)
            Alert.alert(
                'Explored',
                p.data.error_description,
                [
                    {text:'Ok',style:'cancel',onPress:()=>console.log('Cancel Pressed')}
                ]
            )
            yield put({
                type:'User_Login_Error',
            }) 
        }
       
    } catch (error) {
        console.log(error)
      
        yield put({
            type:'User_Login_Error',
        }) 
    }  
}
export default function* authSaga(){
    yield takeEvery('User_Login_Request',doLogin)
}         

// export default function* authSaga(){
//     yield takeEvery('Fetch_TourData_Request',fetchTourData)
//     yield takeEvery('Fetch_User_Request',fetchUser)
//     yield takeEvery('Fetch_Profile_Request',fetchProfile)
//     yield takeEvery('User_Register_Request',doRegister)
//     yield takeEvery('Influencer_Register_Request',doInfluencerRegister)
//     yield takeEvery('Business_Register_Request',doBusinessRegister)
//     yield takeEvery('PhotoG_Register_Request',doPhotoGRegister)
//     yield takeEvery('Taxi_Register_Request',doTaxiRegister)
//     yield takeEvery('User_Login_Request',doLogin)
//     yield takeEvery('Change_Password_Request',changePassword)
//     yield takeEvery('Set_ProfileEmpty_Request',setProfileEmpty)
//     yield takeEvery('Set_ProfilPic_Request',setProfilePic)
//     yield takeEvery('Fetch_Bookings_Request',fetchBookings)
//     yield takeEvery('Remove_FcmToken_Request',unsetFcm)
// }