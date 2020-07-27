import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
 

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
class GuidlineScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            pdfGuideline: '',
            ActivityName: '',
            typeData: '',
            PdfType:'',
        }
    }
    componentWillMount() {
        const PDFTYPE = this.props.navigation.getParam('PDFTYPE');
        this.setState({
            PdfType:PDFTYPE
        })
    }
    getback = () => {
        this.props.navigation.navigate('GuidlineScreen');

    }

renderview=()=>{
if (this.state.PdfType =='Guidelines') {
return(
<Pdf   
                    source={require('../../Util/File/guidlines.pdf') }
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }} />
)
}else{
return(
    <Pdf
                    source={require('../../Util/File/SOA.pdf')}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }} />
)
}
}
    render() {

        return (
            <View style={{ flex: 1 }}>
              
                {/* <View style={{flex:1}}> */}

                {this.renderview()}
                
                {/* </View> */}

                <StatusBar />
            </View>
        );
    }
}


export default createMaterialTopTabNavigator({
  Album: { screen: GuidlineScreen },
  Library: { screen: GuidlineScreen },
  History: { screen: GuidlineScreen },
  Cart: { screen: GuidlineScreen },
});