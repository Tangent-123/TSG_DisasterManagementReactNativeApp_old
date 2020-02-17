import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
// import ViewPager from '@react-native-community/viewpager';
import AsyncStorage from '@react-native-community/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';
import ColorCode from '../../util/Color_Value';

const slides = [
    {
        image: require('../../images/imgone.jpg'),
        backgroundColor: '#3386FF',
       // imageStyle:{styles}

    },
    {
        image: require('../../images/img_2.jpg'),
        backgroundColor: '#3386FF',

    },
    {
        image: require('../../images/img_3.jpg'),
        backgroundColor: '#3386FF',

    },
    {
        image: require('../../images/img_4.jpg'),
        backgroundColor: '#3386FF',
    },
];
export default class SplashScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            UpdateFalse: false,
            UpdateTrue: false,
            connection_Status: '',
        }
    }
    componentWillMount() {

    }
    _renderDoneButton = () => {
        AsyncStorage.getItem('FIRST_NAME')
            .then(FIRST_NAME => {
                console.log('rohit jaoj' + FIRST_NAME)
                if (FIRST_NAME == null) {
                    this.props.navigation.navigate('AuthStart')
                } else {
                    this.props.navigation.navigate('DashboardStack')
                }

            })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <AppIntroSlider
                    slides={slides}
               
                    showNextButton={false}
                    renderDoneButton={this._renderDoneButton}
                />

                <StatusBar
                    backgroundColor={ColorCode.StatusBar}
                    barStyle='dark-content'
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },

    image:{
        width:'90%' ,height:'90%',alignItems:'center' ,justifyContent:'center'  }
});