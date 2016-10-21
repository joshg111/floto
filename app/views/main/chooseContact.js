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
  Image,
  TextInput,
} from 'react-native';

// Flux
import AltActions from '../../actions/actions';
import AltStore from '../../stores/store';

// React native screen router
import { Actions } from 'react-native-router-flux';

import storage from 'react-native-simple-store';

var Contacts = require('react-native-contacts')

var ToolbarAndroid = require('ToolbarAndroid');
var toolbarActions = [];
    
export default class CreateFlow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      key: Math.random()
    }; 
  }
  
  //Create response callback.
  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      str = JSON.stringify(result);
      str = JSON.stringify(result, null, 4);
      var arr = []; 
      var data = result['data'];
      for (var user in data) 
      {
        arr.push(user['name']);
      }
      console.warn(arr.toString());
      this.setState({friends: arr});
    }
  }
  
  componentDidMount() {
    //storage.get("access_token").then(access_token => {
      //console.warn(access_token);
      
      // Create a graph request asking for user information with a callback to handle the response.
      //const infoRequest = new GraphRequest(
      //  '/me/invitable_friends',
      //  {
      //    accessToken: access_token
      //  },
      //  this._responseInfoCallback.bind(this),
      //);
      // Start the graph request.
      //new GraphRequestManager().addRequest(infoRequest).start();
    //})
      
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        alert("Contacts err = " + err.toString())
      } 
      else {
        str = JSON.stringify(contacts, null, 4); 
        console.warn(str);
        var arr = []; 
        for (var i = 0; i < contacts.length; i++)
        {
          let c = contacts[i];
          //str = JSON.stringify(c, null, 4); 
          //console.warn(c["givenName"]);
          arr.push(c);
        }
        //console.warn(arr); 
        this.setState({friends: arr});
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(arr),
        });
      }
    })
    
    
  }
  
  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});

    let filteredData = this.filterNotes(searchText, this.state.friends);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filteredData),
    });
   
  }

  filterNotes(searchText, notes) {
    let text = searchText.toLowerCase();

    return notes.filter((n) => {
      let note = n["givenName"].toLowerCase();
      return note.search(text) !== -1;
    });
  }
  
  _onPressButton(c)
  {
    AltActions.setTarget(c);
    Actions.pop();
  }
  
  render() {
    return (
      <View style={styles.container}>        
        
          <TextInput
            value={this.state.searchText}
            onChange={this.setSearchText.bind(this)}
            placeholder="Search" 
            style={styles.searchBar}
            autoFocus={true}
          />
        
        <View style={styles.listView}>
          <ListView
            key={this.state.key}
            dataSource={this.state.dataSource}
            renderRow={(c) => 
              <TouchableHighlight onPress={this._onPressButton.bind(this, c)} style={{margin: 8, backgroundColor:"red"}}>
                <Text style={{fontSize:18, color:"blue"}}> {c["givenName"]} </Text>
              </TouchableHighlight>
              }
            style={styles.list}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      
      
      flexDirection: "column"
      
  },
  listView: {
    backgroundColor:"purple",
    flex: 1
  },
  
  list: {

    flex: 1
  },
  
  searchBar: {
    paddingLeft: 30,
    fontSize: 22,
    height: 10,
    flex: .05,
    borderWidth: 9,
    borderColor: '#E4E4E4',
    backgroundColor: "red",
  },

  searchBarView: {
    
    
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