import React, { useEffect, useState } from 'react';
import { View,Text,ActivityIndicator,StyleSheet, FlatList } from 'react-native';
import useGetRequest from '../../hooks/useGetRequest';
import CoinsItem from './CoinsItem';
import colors from '../../res/colors'
import CoinsSearch from './CoinsSearch';

const CoinsScreen = ({navigation}) => {
  const [coins, setCoins] = useState([]);
  const allCoins = useGetRequest('https://api.coinlore.net/api/tickers/').data; 

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail',{coin})
  }

  const handleSearch = (query) => {
    const coinFiltered = allCoins.filter((coin)=>{
      return coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase());
    })
    setCoins(coinFiltered)
  }

  useEffect(()=>{
    setCoins(allCoins);
  },[allCoins]);

  return (
    <View style={styles.container} >
      <CoinsSearch onChange={handleSearch}/>
      {!coins && <ActivityIndicator style={styles.loader} color='#000' size='large'/>}
      <FlatList 
        data={coins}
        renderItem={({item}) => 
          <CoinsItem 
            item={item} 
            onPress={()=>handlePress(item)}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:colors.blackPearl
  },
  titleText:{
    color:'#fff',
    textAlign:'center',
  },
  btn: {
    padding:8,
    backgroundColor:'blue',
    borderRadius:8,
    margin:16,
  },
  btnText :{
    color: '#fff',
    textAlign:'center'
  },
  loader:{
    marginTop:60,
  },
})

export default CoinsScreen;