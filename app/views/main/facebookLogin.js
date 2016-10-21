import React from 'react';
import {
  Linking,
  ListView,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  RefreshControl,
  Image
} from 'react-native';

// Flux
import AltActions from '../../actions/actions';
import AltStore from '../../stores/store';

// React native screen router
import { Actions } from 'react-native-router-flux';

import storage from 'react-native-simple-store';

var ToolbarAndroid = require('ToolbarAndroid');
var toolbarActions = [];

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;
    
export default class FacebookLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}; 
    
  }
  
  loginFinished(error, result) {
    if (error) {
      alert("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          try {
            storage.save("access_token", data.accessToken.toString()); 
            Actions.tab_main(); 
          }
          catch (error) { 
            alert('AsyncStorage error: ' + error.message); 
          }
        }
      )
    }
    
    
    
  }
  
  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          
          readPermissions={["user_friends"]}
          onLoginFinished={this.loginFinished.bind(this)}
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      
  },
  
  toolbar: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
      flex: 0,
      width: 200,
      height: 220
  },
  body: {
    flex: 10
  },
});