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
// class Expandable_ListView extends Component {

//     constructor() {

//         super();

//         this.state = {

//             layout_Height: 0

//         }
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.item.expanded) {
//             this.setState(() => {
//                 return {
//                     layout_Height: null
//                 }
//             });
//         }
//         else {
//             this.setState(() => {
//                 return {
//                     layout_Height: 0
//                 }
//             });
//         }
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         if (this.state.layout_Height !== nextState.layout_Height) {
//             return true;
//         }
//         return false;
//     }

//     show_Selected_Category = (item) => {

//         // Write your code here which you want to execute on sub category selection.
//         Alert.alert(item);

//     }

//     render() {
//         return (
//             <View style={styles.Panel_Holder}>

//                 <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClickFunction} style={styles.category_View}>

//                     <Text style={styles.category_Text}>{this.props.item.category_Name} </Text>

//                     <Image
//                         source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2019/02/arrow_right_icon.png' }}
//                         style={styles.iconStyle} />

//                 </TouchableOpacity>

//                 <View style={{ height: this.state.layout_Height, overflow: 'hidden' }}>

//                     {
//                         this.props.item.sub_Category.map((item, key) => (

//                             <TouchableOpacity key={key} style={styles.sub_Category_Text} onPress={this.show_Selected_Category.bind(this, item.name)}>

//                                 <Text> {item.name} </Text>

//                                 <View style={{ width: '98%', marginLeft: 6, marginEnd: 10, marginTop: 2, height: 1, backgroundColor: 'gray' }} />

//                             </TouchableOpacity>

//                         ))
//                     }

//                 </View>

//             </View>

//         );
//     }
// }
export default class GuidlineScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();

        // if (Platform.OS === 'android') {

        //     UIManager.setLayoutAnimationEnabledExperimental(true)

        // }

        //     const array = [

        //         {
        //             expanded: false, category_Name: "1. Insert A Topic Sentence", sub_Category:
        //                 [{ id: 1, name: 'Encapsulates and organizes an entire paragraph'},
        //                 { id: 2, name: 'in academic essays they often appear at the beginning' },
        //                 { id: 3, name: 'What point are your trying to make?' },
        //                 { id: 4, name: 'Why you chosen to include the information you have?' },
        //                 { id: 5, name: 'Although most paragraphs should have a topic sentence' }]
        //         },

        //         {
        //             expanded: false, category_Name: "2. Explain Your Topic Sentence:", sub_Category:
        //                 [{ id: 8, name: 'Does your topic sentence require further explanation?' },
        //                 { id: 9, name: 'add another 1-2 sentences explaining your topic sentence here' },
        //                 { id: 10, name: 'Corbett, one of Americas most distinguished rhetoricians' },
        //                 { id: 11, name: 'Explain what the quote means and why its important to your argument.' }]
        //         },

        //         {
        //             expanded: false, category_Name: "3. Computer Accessories", sub_Category: [{ id: 12, name: 'Pendrive' }, { id: 13, name: 'Bag' },
        //             { id: 14, name: 'Mouse' }, { id: 15, name: 'Keyboard' }]
        //         },

        //         {
        //             expanded: false, category_Name: "4. Home Entertainment", sub_Category: [{ id: 16, name: 'Home Audio Speakers' },
        //             { id: 17, name: 'Home Theatres' }, { id: 18, name: 'Bluetooth Speakers' }, { id: 19, name: 'DTH Set Top Box' }]
        //         },

        //         {
        //             expanded: false, category_Name: "5. TVs by brand", sub_Category: [{ id: 20, name: 'Mi' },
        //             { id: 21, name: 'Thomson' }, { id: 22, name: 'LG' }, { id: 23, name: 'SONY' }]
        //         },

        //         {
        //             expanded: false, category_Name: "6. Kitchen Appliances", sub_Category: [{ id: 24, name: 'Microwave Ovens' },
        //             { id: 25, name: 'Oven Toaster Grills (OTG)' }, { id: 26, name: 'Juicer/Mixer/Grinder' }, { id: 27, name: 'Electric Kettle' }]
        //         }
        //     ];

        //     this.state = { AccordionData: [...array] }
        // }

        // update_Layout = (index) => {

        //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        //     const array = [...this.state.AccordionData];

        //     array[index]['expanded'] = !array[index]['expanded'];

        //     this.setState(() => {
        //         return {
        //             AccordionData: array
        //         }
        //     });
    }
    submitbtn(itemname) {
        // Toast.show(itemname)
        this.props.navigation.navigate('PDFVIEWSCREEN', {
            PDFTYPE: itemname
        })
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




