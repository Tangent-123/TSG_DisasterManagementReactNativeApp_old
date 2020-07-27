import React, { Component } from 'react';

import {
    Image,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    TouchableOpacity,
    UIManager,
    Dimensions,
    LayoutAnimation,
    FlatList,
    View
} from 'react-native';

import Toast from 'react-native-simple-toast';

import Pdf from 'react-native-pdf';

import StoreHeader from '../../Header';
import StatusBar from '../../Assets/StatusBar';
import LevelStore from '../../Componenet/ReactString';
import colors from '../../Util/Color_Value';
import CommanStyle from '../../Util/Header';
export default class GuidlineScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            pdfGuideline: '',
            ActivityName: '',
            typeData: '',
            ImageArray:[],
        }
    }
    componentWillMount() {
        const PDFTYPE = this.props.navigation.getParam('PDFTYPE');
        this.setState({
            ImageArray:PDFTYPE
        })
    }
    getback = () => {
        this.props.navigation.navigate('GuidlineScreen');

    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <StoreHeader title='Disaster Response Guidelines' onPress={this.getback} />
                 <View style={{flex:1,padding:1}}>

              <FlatList
                    //style={{ height: Dimensions.get('window').height}}
                    data={this.state.ImageArray}
                    renderItem={({ item }) =>
                        <Image
                            source={item.image}
                            resizeMode={'contain'}
                            style={{ height: Dimensions.get('window').height, width: '100%', margin: 2 }}
                        />
                    }
                    keyExtractor={(item, index) => index}
                />
                </View>

                <StatusBar />
            </View>
        );
    }
}




