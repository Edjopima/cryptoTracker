import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList } from 'react-native';
import colors from '../../res/colors';
import useGetRequest from '../../hooks/useGetRequest';
import CoinMarketItem from './CoinMarketItem';

const CoinsDetailScreen = (props) => {
  const { coin } = props.route.params;

  const getNameIcon = (nameStr) => {
    const name = nameStr.toLowerCase().replace(' ','-');
    return `https://c1.coinlore.com/img/25x25/${name}.png`
  };

  const marketsUrl = `https://api.coinlore.net/api/coin/markets/?id=${coin.id}`
  const markets = useGetRequest(marketsUrl);

  const getSections = (coin) => {
    const sections = [
      {
        title:'Market Cap',
        data:[coin.market_cap_usd],
      },
      {
        title:'Volume 24h',
        data:[coin.volume24]
      },
      {
        title:'Change 24h',
        data:[coin.percent_change_24h],
      },
    ]
    return sections;
  };

  useEffect(()=>{
    props.navigation.setOptions({
      title:coin.symbol,
    });
  },[coin]);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image 
          style={styles.iconImg}
          source={{uri:getNameIcon(coin.name)}}
        />
        <Text style={styles.titleText}>{coin.name}</Text>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={(item)=>item}
        renderItem={({item})=>
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        }
        renderSectionHeader={({section})=>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        }
      />

      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList 
      style={styles.list}
        horizontal={true}
        data={markets}
        renderItem={({item})=>
          <CoinMarketItem 
            item={item}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:colors.charade,
    flex:1,
  },
  subHeader:{
    backgroundColor:'rgba(0,0,0,0.1)',
    flexDirection:'row',
    padding:16,
  },
  titleText:{
    fontSize:16,
    fontWeight:'bold',
    color:'#fff',
    marginLeft:8,
  },
  iconImg:{
    width:25,
    height:25,
  },
  section:{
    maxHeight:220,
  },
  sectionHeader:{
    backgroundColor:'rgba(0,0,0,0.2)',
    padding:8,
  },
  sectionItem:{
    padding:8,
  },
  itemText:{
    color:'#fff',
    fontSize:14,
  },
  sectionText:{
    color:'#fff',
    fontSize:14,
    fontWeight:'bold',
  },
  list:{
    maxHeight:100,
    paddingLeft:16,
  },
  marketsTitle:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
    marginBottom:16,
    marginLeft:16,
  },
});

export default CoinsDetailScreen;