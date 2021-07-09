import React from 'react';
import { View,Text,ActivityIndicator,StyleSheet, FlatList } from 'react-native';
import useGetRequest from '../../hooks/useGetRequest';
import CoinsItem from './CoinsItem';
import colors from '../../res/colors'

const CoinsScreen = ({navigation}) => {

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail',{coin})
  }

  const coins = useGetRequest('https://api.coinlore.net/api/tickers/')

  return (
    <View style={styles.container} >
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
    backgroundColor:colors.charade,
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