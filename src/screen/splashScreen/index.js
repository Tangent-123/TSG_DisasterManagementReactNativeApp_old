import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ColorCode from '../../util/Color_Value';
import { SliderBox } from "react-native-image-slider-box";
const images = [
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
            images: [
                require('../../images/imgone.jpg'),
                require('../../images/img_2.jpg'),
                require('../../images/img_3.jpg'),
                require('../../images/img_4.jpg'),

            ]
        }
    }
    componentWillMount() {

    }
    _renderDoneButton = (index) => {
        console.log('rohit '+index)
        if(index == 3){
            AsyncStorage.getItem('FIRST_NAME')
            .then(FIRST_NAME => {
                console.log('rohit jaoj' + FIRST_NAME)
                if (FIRST_NAME == null) {
                    this.props.navigation.navigate('AuthStart');
                } else {
                    this.props.navigation.navigate('DashboardStack');
                }

            })
        }
       
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <AppIntroSlider
                    slides={slides}
               
                    showNextButton={false}
                    renderDoneButton={this._renderDoneButton}
                /> */}
                <SliderBox
                    // ImageComponent={FastImage}
                    images={this.state.images}
                    sliderBoxHeight={'100%'}
                    currentImageEmitter={index =>
                        this._renderDoneButton(index)
                    }
                    dotColor="#3386FF"
                    inactiveDotColor="#fff"
                    // paginationBoxVerticalPadding={20}
                    autoplay
                    circleLoop
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                    paginationBoxStyle={{
                        position: "absolute",
                        bottom: 0,
                        padding: 0,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        // paddingVertical: 10
                    }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        padding: 0,
                        margin: 0,
                        backgroundColor: "rgba(128, 128, 128, 0.92)"
                    }}
                    ImageComponentStyle={{ width: '100%', }}
                    imageLoadingColor="#3386FF"
                    
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

    image: {
        width: '90%', height: '90%', alignItems: 'center', justifyContent: 'center'
    }
});