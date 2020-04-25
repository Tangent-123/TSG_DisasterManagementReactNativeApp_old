import React, { Component } from 'react';

import { StyleSheet, View,TouchableOpacity, Image, Text } from 'react-native';
export default function ReactTabDashView({ title, onPress,image }) {
    return (
        <View style={styles.Preview}>
            <TouchableOpacity
                onPress={onPress}>
                <View style={styles.TextView}>
                    <Image style={styles.ImagesView} resizeMode={'stretch'} source={image} />
                    <Text style={styles.TextDesign} numberOfLines={1}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    Preview: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        elevation: 6,
        marginTop: 4,
    },
    TextView: {
        flexDirection: 'column',
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        marginLeft: 4
    },
    ImagesView: {
        alignItems: 'center',
        width: 40,
        height: 40
    },
    TextDesign: {
        textAlign: 'center',
        width: 80,
        color: '#3386FF',
        marginBottom: 4,
        fontWeight: '700',
        fontSize: 13,
    },

})

