import React, { Component } from 'react';

import {
    Image,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    UIManager,
    LayoutAnimation,
    FlatList,
    View
} from 'react-native';

import Toast from 'react-native-simple-toast';

import StoreHeader from '../../Header';
import StatusBar from '../../Assets/StatusBar';
import LevelStore from '../../Componenet/ReactString';
import colors from '../../Util/Color_Value';
import CommanStyle from '../../Util/Header';

import styles from './style';

var SOAPdf = [
{ image: require('../../Util/File/SOA-1.png')},
{ image: require('../../Util/File/SOA-2.png')}];

var GuidelinesPdf = [
{ image: require('../../Util/File/guidlines-01.png')},
{ image: require('../../Util/File/guidlines-02.png')},
{ image: require('../../Util/File/guidlines-03.png')},
{ image: require('../../Util/File/guidlines-04.png')},
{ image: require('../../Util/File/guidlines-05.png')},
{ image: require('../../Util/File/guidlines-06.png')},
{ image: require('../../Util/File/guidlines-07.png')},
{ image: require('../../Util/File/guidlines-08.png')},
{ image: require('../../Util/File/guidlines-09.png')},
{ image: require('../../Util/File/guidlines-10.png')},
{ image: require('../../Util/File/guidlines-11.png')},
{ image: require('../../Util/File/guidlines-12.png')},
{ image: require('../../Util/File/guidlines-13.png')},
{ image: require('../../Util/File/guidlines-14.png')},
{ image: require('../../Util/File/guidlines-15.png')},
{ image: require('../../Util/File/guidlines-16.png')},
{ image: require('../../Util/File/guidlines-17.png')},
{ image: require('../../Util/File/guidlines-18.png')},
{ image: require('../../Util/File/guidlines-19.png')},
{ image: require('../../Util/File/guidlines-20.png')},
{ image: require('../../Util/File/guidlines-21.png')},
{ image: require('../../Util/File/guidlines-22.png')},
{ image: require('../../Util/File/guidlines-23.png')},
{ image: require('../../Util/File/guidlines-24.png')},
{ image: require('../../Util/File/guidlines-25.png')},
{ image: require('../../Util/File/guidlines-26.png')},
{ image: require('../../Util/File/guidlines-27.png')},
{ image: require('../../Util/File/guidlines-28.png')},
{ image: require('../../Util/File/guidlines-29.png')},
{ image: require('../../Util/File/guidlines-30.png')},
{ image: require('../../Util/File/guidlines-31.png')},
{ image: require('../../Util/File/guidlines-32.png')},
{ image: require('../../Util/File/guidlines-33.png')},
{ image: require('../../Util/File/guidlines-34.png')},
{ image: require('../../Util/File/guidlines-35.png')},
{ image: require('../../Util/File/guidlines-36.png')},
{ image: require('../../Util/File/guidlines-37.png')},
{ image: require('../../Util/File/guidlines-38.png')},
{ image: require('../../Util/File/guidlines-39.png')},
{ image: require('../../Util/File/guidlines-40.png')},
{ image: require('../../Util/File/guidlines-41.png')},
{ image: require('../../Util/File/guidlines-42.png')},
{ image: require('../../Util/File/guidlines-43.png')},
{ image: require('../../Util/File/guidlines-44.png')},
{ image: require('../../Util/File/guidlines-45.png')},
{ image: require('../../Util/File/guidlines-46.png')},
{ image: require('../../Util/File/guidlines-47.png')},
{ image: require('../../Util/File/guidlines-48.png')},
{ image: require('../../Util/File/guidlines-49.png')},
{ image: require('../../Util/File/guidlines-50.png')},
{ image: require('../../Util/File/guidlines-51.png')},
{ image: require('../../Util/File/guidlines-52.png')},
{ image: require('../../Util/File/guidlines-53.png')},
{ image: require('../../Util/File/guidlines-54.png')},
{ image: require('../../Util/File/guidlines-55.png')},
{ image: require('../../Util/File/guidlines-56.png')},
{ image: require('../../Util/File/guidlines-57.png')},
{ image: require('../../Util/File/guidlines-58.png')},
{ image: require('../../Util/File/guidlines-59.png')},
{ image: require('../../Util/File/guidlines-60.png')},
{ image: require('../../Util/File/guidlines-61.png')},
{ image: require('../../Util/File/guidlines-62.png')},
{ image: require('../../Util/File/guidlines-63.png')},
{ image: require('../../Util/File/guidlines-64.png')},
{ image: require('../../Util/File/guidlines-65.png')},
{ image: require('../../Util/File/guidlines-66.png')},
{ image: require('../../Util/File/guidlines-67.png')},
{ image: require('../../Util/File/guidlines-68.png')},
{ image: require('../../Util/File/guidlines-69.png')},
{ image: require('../../Util/File/guidlines-70.png')},
{ image: require('../../Util/File/guidlines-71.png')},
{ image: require('../../Util/File/guidlines-72.png')},
{ image: require('../../Util/File/guidlines-73.png')}];
export default class GuidlineScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();  
    }
    submitbtn(itemname) {
if(itemname == 'Guidelines'){
 this.props.navigation.navigate('PDFVIEWSCREEN', {
            PDFTYPE: GuidelinesPdf
        })
}else{
 this.props.navigation.navigate('PDFVIEWSCREEN', {
            PDFTYPE: SOAPdf
        })
}

        // Toast.show(itemname)
       
    }
    getback = () => {
        this.props.navigation.navigate('DashboardScreen');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <StoreHeader title='Disaster Response Guidelines' onPress={this.getback} />
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <View style={{ alignItems: 'center', width: '90%' }}>
                        <TouchableOpacity
                            style={styles.AddToCardBtn}
                            onPress={() => this.submitbtn('Guidelines')}>
                            <Text style={styles.TextStyle}>Disaster Response Guidelines</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', width: '90%' }}>
                        <TouchableOpacity
                            style={styles.AddToCardBtn}
                            onPress={() => this.submitbtn('SOP')}>
                            <Text style={styles.TextStyle}>Distribution SOP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <ScrollView contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 5 }}>
                    {
                        this.state.AccordionData.map((item, key) =>
                            (
                                <Expandable_ListView key={item.category_Name} onClickFunction={this.update_Layout.bind(this, key)} item={item} />
                            ))
                    }
                </ScrollView> */}
                <StatusBar />
            </View>
        );
    }
}




