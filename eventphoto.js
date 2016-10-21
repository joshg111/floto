import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

//////////////////////////////////

// 3rd party libraries
import {
  Actions,
  Router,
  Reducer,
  Scene,
  TabBar,
} from 'react-native-router-flux';

// Views
import ProfileView from './app/views/main/profile';
import EditProfileView from './app/views/main/editProfile';
import MyEvents from './app/views/main/myEvents';
import EditEvent from './app/views/main/editEvent';
import CreateFlow from './app/views/main/createFlow';
import ChooseContact from './app/views/main/chooseContact';
import FlotoLogin from './app/views/main/flotoLogin';
import FlotoSignup from './app/views/main/flotoSignup';

import storage from 'react-native-simple-store';


// @todo remove when RN upstream is fixed
//console.ignoredYellowBox = [
//  'Warning: In next release empty section headers will be rendered.',
//  'Warning: setState(...): Can only update a mounted or mounting component.',
//];


var styles = StyleSheet.create({
  tabs: {
    top: 0,
    position: "relative",
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'skyblue',
    
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    flex: 1,
    alignSelf: 'center'
  },
  tabBarStyle: {
    backgroundColor: '#eee',
    top: 54,
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const TabIcon = (props) => (
  <Text
    style={{ color: props.selected ? 'red' : 'black' }}
  >
    {props.title}
  </Text>
);

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: 'pink',
    
  };
  if (computedProps.isActive) {
    //style.marginTop = computedProps.hideNavBar ? 0 : 54;
    style.marginTop = computedProps.hideTabBar ? 56 : 108;
    
  }
  return style;
};



export default class Periods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  
  componentDidMount() {
    storage.get("access_token").then(access_token => {
        //this.state.logged_in = access_token !== null; 
        this.state.logged_in = true; 
        this.setState({
          isLoading: false
        });
    }).catch(error =>{
      alert(error);
    });        
  }
  
  render() {
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }
    
    return (
        <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle} navigationBarStyle={styles.navBar} titleStyle={styles.title}>
          <Scene key="root">
            <Scene key="FlotoLogin" direction="vertical" hideTabBar={true} title="Floto Login" component={FlotoLogin} initial={!this.state.logged_in} />
            <Scene key="FlotoSignup" direction="vertical" hideTabBar={true} title="Floto Sign Up" component={FlotoSignup} />
            <Scene key="EditProfile" direction="vertical" hideTabBar={true} title="EditProfile" component={EditProfileView} />
            <Scene key="CreateFlow" direction="vertical" hideTabBar={true} hideNavBar={false} title="CreateFlow" component={CreateFlow} >
            </Scene>
            <Scene key="ChooseContact" direction="vertical" hideTabBar={true} hideNavBar={false} title="ChooseContact" component={ChooseContact} />
            <Scene key="EditEvent" direction="vertical" hideNavBar={true} title="EditEvent" component={EditEvent} />
            
            <Scene
              key="tab_main"
              tabs
              tabBarStyle={styles.tabBarStyle}
              tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              initial={this.state.logged_in}
            >
              <Scene key="MyEvents" direction="vertical" icon={TabIcon} hideNavBar={false} title="MyEvents" component={MyEvents} initial={this.state.logged_in}/>
              <Scene key="MyProfile" title="MyProfile" onRight={() => Actions.EditProfile()} rightTitle="EDIT" hideNavBar={false} icon={TabIcon} component={ProfileView} />
            </Scene>
          
            
          </Scene>
        </Router>
    );
  }
}