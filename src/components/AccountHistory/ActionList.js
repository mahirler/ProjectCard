import React, {useState, useEffect, useMemo} from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import usePreferences from '../../contexts/usePreferences';

const ActionList = ({ filteredDataSource, openActionModal }) => {
    const{toggleTheme, isThemeDark, theme} = usePreferences();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage =7;
    const totalCount = useMemo(() => countTransactions(Object.entries(filteredDataSource)), [filteredDataSource]);


    function countTransactions(data){
      let totalCount=0;

      for (const [date, transactions] of data) {
        for(const transaction in transactions){
          totalCount ++;
        }
      }

      return totalCount;
    }

    function computeCurrentPageData(data){
      let count = 0;
      const result = {};
    
      for (const [date, transactions] of Object.entries(data)) {
        const groupedTransactions = [];
    
        for (const transaction of transactions) {
          if (count >= currentPage * itemsPerPage && count < (currentPage + 1) * itemsPerPage) {
            groupedTransactions.push(transaction);
          }
          count++;
    
          if (count > (currentPage + 1) * itemsPerPage) {
            break;
          }
        }
    
        if (groupedTransactions.length > 0) {
          result[date] = groupedTransactions;
        }
    
        if (count > (currentPage + 1) * itemsPerPage) {
          break;
        }
      }
    
      return result;
    };

    const styles = StyleSheet.create({
      pastactionText:{
          fontSize:16,
          fontWeight:900,
          color:theme.colors.textColor,
      },
      pastactionView:{
          flexDirection:'row',
          alignItems:'center',
          width:'85%',
          borderBottomColor:'gray',
          borderBottomWidth:1,
          marginVertical:5
      },
      pastactionColorView:{
          borderRadius:100,
          width:40,
          height:40,
          marginRight:10,
      },
      paginationButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 4,
        backgroundColor: 'gray',
      },
      activeButton: {
        backgroundColor: '#22c55d',
        width: 50,
        height: 50,
        borderRadius: 25,
      },
    
    })


    const handlePageClick = (pageNum) => setCurrentPage(pageNum);

    const handleEmpty = () => {
      return (
      <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      }}>
        <Text style={{color:theme.colors.textColor}}>Henüz bir işlem gerçekleşmemiş.</Text>
      </View>
      );
    };

    const renderPaginationButtons = () => {
      const maxButtonsToShow = 5;
      let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));
      let endPage = Math.min(Math.ceil(totalCount/itemsPerPage) -1 , startPage + maxButtonsToShow - 1);

      if (endPage - startPage + 1 < maxButtonsToShow) {
        startPage = Math.max(0, endPage - maxButtonsToShow + 1);
      }
  
      const buttons = [];
  
      for (let i = startPage; i <= endPage ; i++) {
        buttons.push(
          <TouchableOpacity
            key={i}
            onPress={() => handlePageClick(i)}
            style={[
              styles.paginationButton,
              i === currentPage ? styles.activeButton : null,
            ]}>
            <Text style={{color: 'white'}}>{i}</Text>
          </TouchableOpacity>,
        );
      }
  
      return (
        <View style={{
          flexDirection:'row',
          margin:30,
          justifyContent:'center'
        }}>
          {buttons}
        </View>
      );
    };

    const PastAction = ({label, type, amount, hour, color, onClick}) => (
    <TouchableOpacity
    style={[styles.pastactionView, {backgroundColor:theme.colors.backgroundColor, width:'90%', margin:20}]}
    onPress={onClick}  
    >
      <View style={{...styles.pastactionColorView, backgroundColor:color}}/>
      <View>
          <Text style={[styles.pastactionText, {fontSize:20}]}
          >{label}
          </Text>
          <Text style={{...styles.pastactionText, color:'gray', fontSize:12}}>
          {type}
          </Text>
      </View>
      <View style={{
          marginStart:'auto'
      }}>
          <Text style={{...styles.pastactionText,fontSize:25, color: amount>0 ? 'green' : 'red'}}>
              {amount}TL
          </Text>
          <Text style={{...styles.pastactionText, marginStart:'auto', color:'gray'}}>
              {hour}
          </Text>
      </View>
    </TouchableOpacity>
    )

    const renderItem = ({ item: [date, options, index] }) => {
      // Splitting the date string into day, month, and year parts
      const [month, day, year] = date.split('/');

      // Creating a new Date object with the correct format
      const temp = new Date(year, month, day);

      // Checking if the date is valid before formatting
      const formattedDate =
        temp instanceof Date && !isNaN(temp)
          ? temp.toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : 'Erişilemeyen Tarih';

      return (
        <View style={{ flexDirection: 'column'}} key={formattedDate}>
          <Text
            style={{
              ...styles.pastactionText,
              marginTop: 20,
              marginLeft:25,
              fontSize:20
            }}>
            {formattedDate}
          </Text>
          {options.map(el => (
            <PastAction
              key={el.id}
              label={el.person}
              type={el.type}
              amount={el.amount}
              hour={el.hour}
              color={el.color}
              onClick={() => openActionModal(el)}
            />
          ))}
        </View>
      );
    };

  return (
    <SafeAreaView style={{
      width:'100%',

    }}>
    <View style={{
      height:'70%',
    }}>
    <FlatList
      data={Object.entries(computeCurrentPageData(filteredDataSource))}
      keyExtractor={([date]) => date}
      renderItem={renderItem}
      ListEmptyComponent={handleEmpty}
    />
    </View>
    <View>
      {renderPaginationButtons()}
    </View>

    </SafeAreaView> 
  );
};



export default ActionList;
