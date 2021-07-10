import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState'
import colors from '../../res/colors';
import Storage from '../../libs/storage';
import CoinsItem from '../coins/CoinsItem';
import { use } from 'ast-types';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key)=>key.includes('favorite-'))
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map((fav)=>JSON.parse(fav[1]));
      setFavorites(favorites)
    } catch (err) {
      console.log('get favorites error', err);
    }
  };

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', {coin})
  }

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus',getFavorites);
    return unsubscribe
  },[navigation]);

  useEffect(()=>{
    getFavorites();
  },[]);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? 
        <FavoritesEmptyState/>
        :
        <FlatList 
          data={favorites}
          renderItem={({item})=>
            <CoinsItem 
              item={item}
              onPress={()=>handlePress(item)}  
            />
          }
        />
      }
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