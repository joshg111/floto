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

import Toolbar from '../../utils/toolbar';
import storage from 'react-native-simple-store';
import {Button} from 'native-base';

var ToolbarAndroid = require('ToolbarAndroid');
var toolbarActions = 
    [{title: 'Edit', show: 'always'}];
    
export default class Main extends React.Component {
  constructor(props) {
    super(props);
   
    s = AltStore.getState()
    this.state = {
      name: s.profile.name,
      gender: s.profile.gender,
      pic_source: s.profile.pic_source
    };
    
  }

  componentDidMount() {
    AltStore.listen((state) => this.onAltStoreChange(state));

    AltActions.getProfile();
  }

  componentWillUnmount() {
    AltStore.unlisten((state) => this.onAltStoreChange(state));
    
  }

  onAltStoreChange(state) {
    this.setState({
      name: state.profile.name,
      gender: state.profile.gender,
      pic_source: state.profile.pic_source
    });
  }
  
  onActionSelected(position) {
    if (position === 0) { // index of 'Settings'
      Actions.EditProfile(); 
    } 
  }
  
  onLogout() {
    storage.delete("access_token"); 
    Actions.FlotoLogin({type: 'reset'}); 
  }
  
  render() {
    return (
      <View style={styles.col}>
        <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={this.state.pic_source} />
        </View>
        <View style={styles.details}>
          <Text style={styles.hello}>Name: {this.state.name}</Text>
          <Text style={styles.hello}>Gender: {this.state.gender}</Text>
          <Button onPress={this.onLogout.bind(this)}> Logout </Button>
        </View>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topbar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  toolbar: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  myToolbar: {
    flex: 1,
    backgroundColor: 'black',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 9,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  imageBox: {
    flex: 9,
    
  },
  image: {
    width: 200,
    height: 220,
  },
  hello: {
    flex: 0,
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
  },
});