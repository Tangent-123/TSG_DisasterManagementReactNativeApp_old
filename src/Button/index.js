import React, { Component } from 'react';

import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

export default function ButtonView({ title, onPress }) {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            padding: 10,
        }}>
            <TouchableOpacity
                style={{
                    width: '99%',
                    padding: 4,
                    backgroundColor: '#3386FF',
                    borderRadius: 4,
                }}
                onPress={onPress} >
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    alignSelf: 'center',
                    fontFamily: "Gilroy-SemiBold",
                }}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

