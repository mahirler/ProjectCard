
import React, { useState, useEffect, useMemo } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';

const useAction = (text) => {
    const [search, setSearch] = useState(text);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    const masterData = [
        {
        id:1,
        title:"Profil",
        page:"Profile"
        },
        {
        id:2,
        title:"Giriş Yap",
        page:"SignIn"
        },
        {
        id:3,
        title:"Kayıt Ol",
        page:"SignUp"
        },
        {
        id:4,
        title:"Ana Sayfa",
        page:"Home"
        },
        {
        id:5,
        title:"Profil",
        page:"Profile"
        },
        {
        id:6,
        title:"Giriş Yap",
        page:"SignIn"
        },
        {
        id:7,
        title:"Kayıt Ol",
        page:"SignUp"
        },
        {
        id:8,
        title:"Ana Sayfa",
        page:"Home"
        },
    ]

    useEffect(() => {
      try {
        setMasterDataSource(masterData);
      } catch (error) {
        setError(error);
        console.log(error)
      }
    },[])

    const filteredDataSource = useMemo(() => {
      if (!search) {
        return masterDataSource;
      }
  
      const textData = search.toUpperCase();
      return masterDataSource.filter((item) =>
        item.title ? item.title.toUpperCase().includes(textData) : false
      );
    }, [search, masterDataSource]);

  return {search, setSearch, filteredDataSource, error, isLoading}
}

export default useAction
