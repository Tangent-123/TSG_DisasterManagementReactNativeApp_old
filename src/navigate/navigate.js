import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from '../screen/splashScreen';
import LoginScreen from '../screen/loginScreen';
import DashboardScreen from '../screen/DashboardScreen';
import ProfileScreen from '../screen/ProfileScreen';
import NewPostActivityScreen from '../screen/PostMyActivityScreen';
import MyActivityScreen from '../screen/MyActivityScreen';
import LocationMapping from '../screen/LocationScreen';
import GuidlineScreen from '../screen/GuidlineScreen';
import NoticeBoardScreen from '../screen/NoticeBoardScreen';
import TeamScreen from '../screen/TeamScreen';
import EmergencyScreen from '../screen/EmergencyScreen';
import AddNoticeScreen from '../screen/AddNoticeScreen';
import MappingListScreen from '../screen/MappingListScreen';
import AddMappingScreen from '../screen/AddMappingScreen';
import UpdateLocationMappingScreen from '../screen/UpdateLocationMapping';
import React from 'react';
const AuthStart = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
});

const DashboardStack = createStackNavigator({
  DashboardScreen: {
    screen: DashboardScreen
  },

}
);
const ProfileStack = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen
  },

}
);
const NewPostActivityStack = createStackNavigator({
  NewPostActivityScreen: {
    screen: NewPostActivityScreen
  },

}
);
const MyActivityStack = createStackNavigator({
  MyActivityScreen: {
    screen: MyActivityScreen
  },

}
);
const LocationMappingStack = createStackNavigator({
  LocationMapping: {
    screen: LocationMapping
  },

}
);
const AddNoticeStack = createStackNavigator({
  AddNoticeScreen:{
    screen:AddNoticeScreen,
  }
});
const GuidlineStack = createStackNavigator({
  GuidlineScreen: {
    screen: GuidlineScreen
  },

}
);
const UpdateLocationMappingStack = createStackNavigator({
  UpdateLocationMappingScreen:{
    screen:UpdateLocationMappingScreen
  }
})
const NoticeBoardStack = createStackNavigator({
  NoticeBoardScreen: {
    screen: NoticeBoardScreen
  },

}
);
const TeamStack = createStackNavigator({
  TeamScreen: {
    screen: TeamScreen
  },

}
);
const MappingListStack = createStackNavigator({
  MappingListScreen:{
    screen:MappingListScreen
  }
});
const AddMappingStack = createStackNavigator({
  AddMappingScreen:{
    screen:AddMappingScreen
  }
});
const EmergencyStack = createStackNavigator({
  EmergencyScreen:{
    screen:EmergencyScreen,
  }
})

const AuthStack = createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
    AuthStart: AuthStart,
    DashboardStack: DashboardStack,
    ProfileStack: ProfileStack,
    NewPostActivityStack: NewPostActivityStack,
    AddNoticeStack:AddNoticeStack,
    MyActivityStack: MyActivityStack,
    GuidlineStack:GuidlineStack,
    LocationMappingStack:LocationMappingStack,
    MappingListStack:MappingListStack,
    NoticeBoardStack:NoticeBoardStack,
    AddMappingStack:AddMappingStack,
    TeamStack:TeamStack,
    EmergencyStack:EmergencyStack,
    UpdateLocationMappingStack:UpdateLocationMappingStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const RootApp = createAppContainer(AuthStack);
export default RootApp;