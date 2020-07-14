import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import * as firebase from 'firebase';
import functions from '@react-native-firebase/functions';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';
import CreateScreen from './screens/CreateScreen';
import ViewPosts from './screens/ViewPosts';
import ViewPost from './screens/ViewPost';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

var firebaseConfig = {
  apiKey: 'AIzaSyCZTypZ6uAHMw3ow13WpD4MhK4wD8Fa_Hs',
  authDomain: 'blog-app-7e2a8.firebaseapp.com',
  databaseURL: 'https://blog-app-7e2a8.firebaseio.com',
  projectId: 'blog-app-7e2a8',
  storageBucket: 'blog-app-7e2a8.appspot.com',
  messagingSenderId: '996802332043',
  appId: '1:996802332043:web:1713c7aec7d3ec23071b8e',
};

functions()
  .httpsCallable('addMessage')({text: 'HI'})
  .then((response) => {
    setProducts(response.data);
    setLoading(false);
  });

firebase.initializeApp(firebaseConfig);
// var functions = fire.functions();
// var addMessage = functions.httpsCallable('addMessage');
// addMessage({text: messageText}).then(function (result) {
//   // Read result of the Cloud Function.
//   var sanitizedMessage = result.data.text;
// });
const AppStack = createStackNavigator({
  Home: HomeScreen,
  CreateBlogPost: CreateScreen,
  ViewAllPosts: ViewPosts,
  ViewBlog: ViewPost,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
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
    },
  ),
);
