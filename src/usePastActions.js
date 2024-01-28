
import React,  { useState, useEffect, useMemo } from 'react';


const usePastActions = (text) => {
    const [search, setSearch] = useState(text);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();


    const masterData = [
        {
            id: 1,
            person: 'Ziraatbank',
            color:'red',
            type:'Para Transferi',
            amount:-200,
            hour:'11.22',
            date: new Date('2023-06-02T11:22:00'),
        },
        {
            id: 2,
            person: 'Ziraatbank',
            color:'red',
            type:'Para Transferi',
            amount:300,
            hour:'11.22',
            date: new Date('2023-08-02T11:22:00'),
        },
        {
            id: 3,
            person: 'Ziraatbank',
            color:'red',
            type:'Para Transferi',
            amount:-300,
            hour:'11.22',
            date: new Date('2023-03-02T11:22:00'),
        },
        {
            id: 4,
            person: 'Ziraatbank',
            color:'red',
            type:'Para Transferi',
            amount:-400,
            hour:'11.22',
            date: new Date('2023-0-02T11:22:00'),
        },
        {
            id: 5,
            person: 'Vakıfbank',
            color:'yellow',
            type:'Para Transferi',
            amount:1500,
            hour:'10.22',
            date: new Date('2023-05-02T11:22:00'),
        },
        {
            id: 6,
            person: 'Vakıfbank',
            color:'yellow',
            type:'Para Transferi',
            amount:-1500,
            hour:'10.22',
            date: new Date('2023-05-02T11:22:00'),
        },
        {
            id: 7,
            person: 'Semih Saygıner',
            color:'blue',
            type:'Para Transferi',
            amount:200,
            hour:'11.22',
            date: new Date('2023-00-02'),
        },
        {
            id: 8,
            person: 'Semih Saygıner',
            color:'blue',
            type:'Para Transferi',
            amount:300,
            hour:'11.22',
            date: new Date('2023-08-02'),
        },
        {
            id: 9,
            person: 'Semih Saygıner',
            color:'blue',
            type:'Para Transferi',
            amount:500,
            hour:'11.22',
            date: new Date('2023-08-02'),
        },
        {
            id: 10,
            person: 'Semih Saygıner',
            color:'blue',
            type:'Para Transferi',
            amount:-4200,
            hour:'11.22',
            date: new Date('2023-09-02'),
        },
        {
            id: 11,
            person: 'Semih Saygıner',
            color:'blue',
            type:'Para Transferi',
            amount:5200,
            hour:'11.22',
            date: new Date('2023-09-02'),
        },
        {
            id: 12,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:5200,
            hour:'11.22',
            date: new Date('2023-09-02'),
        },
        {
            id: 13,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:1200,
            hour:'11.22',
            date: new Date('2023-04-02'),
        },
        {
            id: 14,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:0.50,
            hour:'11.22',
            date: new Date('2023-04-02'),
        },
        {
            id: 15,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:-150,
            hour:'11.22',
            date: new Date('2023-06-02'),
        },
        {
            id: 16,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:-400,
            hour:'22.22',
            date: new Date('2023-06-02'),
        },
        {
            id: 17,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:500,
            hour:'14.22',
            date: new Date('2023-02-02'),
        },
        {
            id: 18,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:-1500,
            hour:'11.22',
            date: new Date('2023-03-02'),
        },
        {
            id: 19,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:3500,
            hour:'11.22',
            date: new Date('2023-04-02'),
        },
        {
            id: 20,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:10500,
            hour:'10.22',
            date: new Date('2023-04-23'),
        },
        {
            id: 21,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:-500,
            hour:'10.22',
            date: new Date('2023-06-02'),
        },
        {
            id: 22,
            person: 'Ömer Dörtlüoğlu',
            color:'blue',
            type:'Para Transferi',
            amount:-500,
            hour:'10.22',
            date: new Date('2023-10-23'),
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
      // Filter the data based on the search query
      const filteredData = !search
        ? masterDataSource
        : masterDataSource.filter((item) =>
            item.person ? item.person.toUpperCase().includes(search.toUpperCase()) : false
          );
    
      // Group the filtered data by date without hour
      const grouped = filteredData.reduce((acc, el) => {
        const dateWithoutHour = new Date(el.date).toLocaleDateString();
    
        if (!acc[dateWithoutHour]) acc[dateWithoutHour] = [];
        acc[dateWithoutHour].push(el);
        return acc;
      }, {});
    
      return grouped;
    }, [search, masterDataSource]);
    


  return {search, setSearch, filteredDataSource, error, isLoading}
}

export default usePastActions
