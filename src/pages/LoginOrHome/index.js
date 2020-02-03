import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginAction from '../../actions/loginAction';
import Loader from '../../components/Loader';


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

const mapStateToProps = state => ({
  user: state.userLogged.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginAction, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(LoginOrHome);
