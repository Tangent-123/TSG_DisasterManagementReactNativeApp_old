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
const PDFVIEWStack = createStackNavigator({
  PDFVIEWSCREEN:{
    screen:PDFVIEWSCREEN
  },
});

const GallaryStack = createStackNavigator({
  GallaryScreen:{
    screen:GallaryScreen
  },
});
const ProfileStack = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen
  },

}
);

const MyActivityStack = createStackNavigator({
  MyActivityScreen: {
    screen: MyActivityScreen
  },
}
);
const PostStack = createStackNavigator({
  PostScreen:{
    screen:PostScreen
  }
})
const CountBeneficaryStack = createStackNavigator({
  CountBeneficaryScreen: {
    screen: CountBeneficaryScreen
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
const AddBeneFicialStack = createStackNavigator({
  AddBeneFicialScreen :{
    screen:AddBeneFicialScreen
  }
})

// const BeneficalDetailsStack = createStackNavigator({
//   BeneficalDetailsScreen:{
//     screen:BeneficalDetailsScreen
//   }
// })
const ReliefStack = createStackNavigator({
  ReliefScreen:{
    screen:ReliefScreen
  },
});
const OtpLoginStack = createStackNavigator({
  OtpLoginScreen:{
    screen:OtpLoginScreen
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
const BeneficiallistStack = createStackNavigator({
  BeneficiallistScreen :{
    screen:BeneficiallistScreen
  }
})
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
GallaryStack:GallaryStack,
    AddNoticeStack:AddNoticeStack,
    MyActivityStack: MyActivityStack,
    GuidlineStack:GuidlineStack,
    CountBeneficaryStack:CountBeneficaryStack,
    OtpLoginStack:OtpLoginStack,
    MappingListStack:MappingListStack,
    NoticeBoardStack:NoticeBoardStack,
    AddMappingStack:AddMappingStack,
    TeamStack:TeamStack,
    EmergencyStack:EmergencyStack,
    ReliefStack:ReliefStack,
    PDFVIEWStack:PDFVIEWStack,
    AddBeneFicialStack:AddBeneFicialStack,
    BeneficiallistStack:BeneficiallistStack,
    PostStack:PostStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const RootApp = createAppContainer(AuthStack);
export default RootApp;