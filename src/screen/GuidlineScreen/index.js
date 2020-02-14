import React from 'react';
import {
    Image,
    StatusBar,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native';
// import Axios from 'axios';
import { TextField } from 'react-native-material-textfield';
// import AsyncStorage from '@react-native-community/async-storage';
// import Toast from 'react-native-simple-toast';
import LoginStyle from './style';
import colors from '../../util/Color_Value';
// import LoginApi from '../../../util/ApiCollection';
// import Spinner from 'react-native-loading-spinner-overlay';
export default class GuidlineScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            password: '',
            spinner: false,
        }
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    //  width: "100%",  
                    backgroundColor: "#000",
                }}
            />
        );
    };
    //handling onPress action  
    getListViewItem = (item) => {
        Alert.alert(item.key);
    }
    // getlogin = () => {
    //     this.props.navigation.navigate('DashboardStack')
    //     if (this.state.Name !== '') {
    //         if (this.state.password !== '') {
               
    //             //  this.getApiLogin();
    //         } else {
    //             //  Toast.show('Please Enter Vaild Password');
    //         }
    //     } else {
    //         //  Toast.show('Please Enter Vaild Email id');
    //     }
    // }
    // getApiLogin() {
    //     this.setState({
    //         spinner: true,
    //     });
    //     const formData = new FormData();
    //     formData.append('username', this.state.Name);
    //     formData.append('password', this.state.password);
    //     formData.append('loginType', '2');
    //     Axios.post(LoginApi.LoginUrl, formData,
    //         { headers: { 'Content-Type': 'multipart/form-data' } })
    //         .then(p => {
    //             if (p.data.status == true) {
    //                 AsyncStorage.setItem('Arn_id', JSON.stringify(p.data.data.arn_id))
    //                 AsyncStorage.setItem('NAME', p.data.data.name)
    //                 AsyncStorage.setItem('mobile', p.data.data.mobile)
    //                 this.props.navigation.navigate('RootStack')
    //                 this.setState({
    //                     spinner: false,
    //                 });
    //             } else {
    //                 Toast.show('please enter vaild Email and Password ');
    //                 this.setState({
    //                     spinner: false,
    //                 });
    //             }
    //         }).catch(error => {
    //             console.log("api error:" + error);
    //             Toast.show('responce' + error)
    //             this.setState({
    //                 spinner: false,
    //             });
    //         });

    // }
    getback = () => {
        this.props.navigation.navigate('DashboardStack')
    }
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.HeaderBackground}>
                <TouchableOpacity
                    onPress={this.getback} >
                    <Image source={require('../../images/arrow.png')} style={{ width: 30, height: 20, marginRight: 20 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.HeaderText}>Guidelines</Text>
                </View>
            </View>
            <FlatList
                data={[
                    { key: 'Android' }, { key: 'iOS' }, { key: 'Java' }, { key: 'Swift' },
                    { key: 'Php' }, { key: 'Hadoop' }, { key: 'Sap' },
                    { key: 'Python' }, { key: 'Ajax' }, { key: 'C++' },
                    { key: 'Ruby' }, { key: 'Rails' }, { key: '.Net' },
                    { key: 'Perl' }, { key: 'Sap' }, { key: 'Python' },
                    { key: 'Ajax' }, { key: 'C++' }, { key: 'Ruby' },
                    { key: 'Rails' }, { key: '.Net' }, { key: 'Perl' }
                ]}
                renderItem={({ item }) =>
                    <Text style={styles.item}
                        onPress={this.getListViewItem.bind(this, item)}>{item.key}</Text>}
                ItemSeparatorComponent={this.renderSeparator}
            />

            <StatusBar
                backgroundColor="#3386FF"
                barStyle='dark-content'
            />
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    HeaderBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        backgroundColor: '#3386FF',
      //  marginLeft: 4,
        height: 60,

    },
    HeaderText: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: 10,
        fontFamily: "Gilroy-Bold",
    },
})  

