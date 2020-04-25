import React, { Component } from 'react';
import { StyleSheet,View,Image,Text } from 'react-native';
export default function ReactView(title,onPress) {
    return(
        <View style={{ marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',width:'99%',flexDirection:'row'}}>
      <Image
          style={{ width:60,height: 60,alignSelf:'center'}}
           source={require('../../Assets/Images/logo.png')}></Image>
          <View style={{flexDirection:'column',marginLeft:10}}>
            <Text style={{ color: '#000', fontSize: 11, }}>
              American
           </Text>
           <Text style={{ color: '#000', fontSize: 11,}}>
             Gastroenterological
           </Text>
           <Text style={{ color: '#000', fontSize: 11, }}>
             Association
           </Text>
</View>
</View>
    )
  }
  
