import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import * as firebase from 'firebase';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';

var firebaseConfig = {
  apiKey: "yourkey",
  authDomain: "yourkey",
  databaseURL: "yourkey",
  projectId: "blogapp-21599",
  storageBucket: "yourkey",
  messagingSenderId: "yourkey",
  appId: "yourkey"
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen,

});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register : RegisterScreen

});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouterName: 'Loading',

    }
  )
);
