import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet, SectionList } from 'react-native';
import colors from '../../res/colors';

const CoinsDetailScreen = (props) => {
  const { coin } = props.route.params;

  const getNameIcon = (nameStr) => {
    const name = nameStr.toLowerCase().replace(' ','-');
    return `https://c1.coinlore.com/img/25x25/${name}.png`
  };

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
    })
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
});

export default CoinsDetailScreen;