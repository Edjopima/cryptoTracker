import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import colors from '../../res/colors';

const CoinsSearch = ({onChange}) => {
  const [query, setQuery] = useState('');

  const handleText = (text) => {
    setQuery(text);
    if (onChange) {
      onChange(text);
    }
  }
  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios'?
            styles.textInputIos :
            styles.textInputAndroid,
        ]}
        onChangeText={handleText}      
        value={query}
        placeholder='Search Coin'
        placeholderTextColor='#fff'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput:{
    height:46,
    backgroundColor:colors.charade,
    paddingLeft:16,
    color:'#fff',
  },
  textInputAndroid:{
    borderBottomWidth:2,
    borderBottomColor:colors.zircon,
  },
  textInputIos:{
    margin:8,
    borderRadius:8,
  },
})

export default CoinsSearch;