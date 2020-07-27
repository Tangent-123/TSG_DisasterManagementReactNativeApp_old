import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/LoginScreen';
import DashboardScreen from '../screen/DashboardScreen';
import ProfileScreen from '../screen/ProfileScreen';
import PostScreen from '../screen/PostScreen';
import MyActivityScreen from '../screen/MyActivityScreen';
import GuidlineScreen from '../screen/GuidlineScreen';
import NoticeBoardScreen from '../screen/ViewNoticeBoardScreen';
import TeamScreen from '../screen/ViewTeamScreen';
import EmergencyScreen from '../screen/EmergencyScreen';
import AddNoticeScreen from '../screen/AddNoticeScreen';
import MappingListScreen from '../screen/ViewMappingScreen';
import AddMappingScreen from '../screen/AddMappingScreen';
import ReliefScreen from '../screen/ReliefScreen';
import AddBeneFicialScreen from '../screen/AddBeneficialScreen';
import BeneficiallistScreen from '../screen/ViewBeneficialScreen';
import CountBeneficaryScreen from '../screen/CountBeneficaryScreen';
import OtpLoginScreen from '../screen/OtpLoginScreen';
import PDFVIEWSCREEN from '../screen/PDFViewScreen';
import GallaryScreen from '../screen/GallaryScreen';
import GallaryDetailsScreen from '../screen/GallaryDetailsScreen';
import DashboardMainScreen from '../screen/DashboardMainScreen';
import ChaspanScreen from '../screen/ChaspanScreen';
import VerifyListScreen from '../screen/VerifyListScreen';
import FinalListScreen from '../screen/FinalListScreen';
import React from 'react';

// const SplashScreen = StackNavigator({
//   SplashScreen: { screen: SplashScreen },
// },
// {
//   headerMode: 'none',
//   navigationOptions: {
//     headerVisible: false,
//   }
//  }
// );
const ViewNoticeStack = createStackNavigator({
    NoticeBoardScreen: {
    screen: NoticeBoardScreen
  },
})
const AuthStart = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
 DashboardScreen: {
    screen: DashboardScreen
  },
  PDFVIEWSCREEN:{
    screen:PDFVIEWSCREEN
  },
   GallaryScreen:{
    screen:GallaryScreen
  },
  ProfileScreen: {
    screen: ProfileScreen
  },
   BeneficiallistScreen :{
    screen:BeneficiallistScreen
  },
   MappingListScreen:{
    screen:MappingListScreen
  },
  MyActivityScreen: {
    screen: MyActivityScreen
  },
  PostScreen:{
    screen:PostScreen
  },
   GallaryDetailsScreen:{
    screen:GallaryDetailsScreen
  },
 
   CountBeneficaryScreen: {
    screen: CountBeneficaryScreen
  },
  AddNoticeScreen:{
    screen:AddNoticeScreen,
  },
  GuidlineScreen: {
    screen: GuidlineScreen
  },
  AddBeneFicialScreen :{
    screen:AddBeneFicialScreen
  },
  DashboardMainScreen:{
    screen:DashboardMainScreen
  },
  ReliefScreen:{
    screen:ReliefScreen
  },
  FinalListScreen:{
    screen:FinalListScreen
  },
  VerifyListScreen:{
    screen:VerifyListScreen
  },
  OtpLoginScreen:{
    screen:OtpLoginScreen
  },
   TeamScreen: {
    screen: TeamScreen
  },
  AddMappingScreen:{
    screen:AddMappingScreen
  },
  EmergencyScreen:{
    screen:EmergencyScreen,
  },
  ChaspanScreen:{
    screen:ChaspanScreen
  },
},
   {
    headerMode: 'none',
    navigationOptions: {
    headerVisible: false,
   // initialRouteName: 'AuthLoading',
    }
}
);

const AuthStack = createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
     AuthStart: AuthStart,
     ViewNotice:ViewNoticeStack,
  },
  {
    headerMode: 'none',
    navigationOptions: {
    headerVisible: false,
    initialRouteName: 'AuthLoading',
    }
  }
);

const RootApp = createAppContainer(AuthStack);
export default RootApp;