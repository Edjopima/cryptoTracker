import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState'
import colors from '../../res/colors';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <FavoritesEmptyState/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:colors.charade,
    flex:1,
  },
})

export default FavoritesScreen;