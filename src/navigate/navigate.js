import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/LoginScreen';
import DashboardScreen from '../screen/DashboardScreen';
import ProfileScreen from '../screen/ProfileScreen';
import NewPostActivityScreen from '../screen/PostMyActivityScreen';
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
// const UpdateLocationMappingStack = createStackNavigator({
//   UpdateLocationMappingScreen:{
//     screen:UpdateLocationMappingScreen
//   }
// })
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
    NewPostActivityStack: NewPostActivityStack,
    AddNoticeStack:AddNoticeStack,
    MyActivityStack: MyActivityStack,
    GuidlineStack:GuidlineStack,
    CountBeneficaryStack:CountBeneficaryStack,
   // LocationMappingStack:LocationMappingStack,
    MappingListStack:MappingListStack,
    NoticeBoardStack:NoticeBoardStack,
    AddMappingStack:AddMappingStack,
    TeamStack:TeamStack,
    EmergencyStack:EmergencyStack,
    //UpdateLocationMappingStack:UpdateLocationMappingStack,
    ReliefStack:ReliefStack,
    AddBeneFicialStack:AddBeneFicialStack,
    BeneficiallistStack:BeneficiallistStack,
    BeneficalDetailsStack:BeneficalDetailsStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const RootApp = createAppContainer(AuthStack);
export default RootApp;