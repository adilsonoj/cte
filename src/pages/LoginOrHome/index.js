import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';
import Loader from '../../components/Loader'

const LoginOrHome = (props)=>{
    const [loading, setLoading] = useState(true)

    useEffect( ()=>{
      getUser();
    },[])

    const getUser = async ()=>{
      try {
            const user = await AsyncStorage.getItem('user');
           if(user){
              props.navigation.navigate("Home");
           }else{
              props.navigation.navigate("Login")
           }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    
    return <Loader loading={loading}/>
   
};

export default LoginOrHome;
