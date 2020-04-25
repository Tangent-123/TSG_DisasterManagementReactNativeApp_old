import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import StatusBar from '../../Assets/StatusBar';
import ColorCode from '../../Util/Color_Value';
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
        console.log('rohit ' + index)
        if (index == 3) {
            AsyncStorage.getItem('FIRST_NAME')
                .then(FIRST_NAME => {
                    console.log('rohit jaoj' + FIRST_NAME)
                    if (FIRST_NAME == null) {
                        this.props.navigation.navigate('AuthStart');
                    } else {  //AuthStart
                         this.props.navigation.navigate('DashboardStack');
                    }

                })
        }

    }
    render() {
        return (
            <View style={{ flex: 1, width: '100%', backgroundColor: '#FFFFFF' }}>
            
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Image style={{ alignItems: 'center', width: '84%', justifyContent: 'center' }} resizeMode={'stretch'} source={require('../../images/logoTSG.jpg')} />
                        <Text style={{ fontSize: 18, marginTop: 5, alignItems: 'center', color: ColorCode.StatusBar, fontFamily: "Gilroy-Bold", }}>Disaster Management App</Text>
                    </View>
                    <View style={{ width: '90%', height: '80%', alignItems: 'center', justifyContent: 'center', marginTop: 26 }}>
                        <SliderBox
                            images={this.state.images}

                            sliderBoxHeight={'100%'}
                            currentImageEmitter={index =>
                                this._renderDoneButton(index)
                            }
                            dotColor="#3386FF"
                            inactiveDotColor="#fff"
                            paginationBoxVerticalPadding={20}
                            autoplay={true}
                            resizeMethod={'resize'}
                            resizeMode={'cover'}
                            paginationBoxStyle={{
                                position: "absolute",
                                bottom: 0,
                                padding: 0,
                                borderRadius: 10,
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
                            ImageComponentStyle={{ width: '92%', }}
                            imageLoadingColor="#3386FF"
                            borderRadius={10}

                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: ColorCode.StatusBar, fontSize: 14, fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>V 1.0</Text>
                </View>
               <StatusBar/>
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