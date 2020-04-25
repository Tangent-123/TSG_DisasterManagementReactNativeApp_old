import React, { Component } from 'react';
import { StyleSheet,View,Image,Text,TouchableOpacity } from 'react-native';
import CommanStyle from '../Util/Header';
export default function HeaderView({title, onPress}) {
    return(
        <View style={CommanStyle.HeaderBackground}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={onPress}>
                        <Image source={require('../images/back.png')} style={{ width: 20, height: 20, }} />
                    </TouchableOpacity>
                    <Text style={CommanStyle.headerItem}>{title}</Text>
                </View>
    )
  }
  
