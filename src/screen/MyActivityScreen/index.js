import React, { Component } from 'react';
import {
    AppRegistry, FlatList,StatusBar,
    StyleSheet, Text, TouchableOpacity, Image, View, Alert
} from 'react-native';

export default class MyActivityScreen extends Component {
    static navigationOptions = { header: null };
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
                        <Text style={styles.HeaderText}>My Activities</Text>
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