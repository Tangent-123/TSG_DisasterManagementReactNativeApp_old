import React, { Component } from 'react';

import { StatusBar } from 'react-native';

import SColor from '../../Util/Color_Value';
export default function Status() {
  return (
    <StatusBar
      backgroundColor={SColor.StatusBar}
      barStyle='dark-content'
    />
  )
}

