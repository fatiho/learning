import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import functions from '@react-native-firebase/functions';

var arry = [];
var title = [];
var id = [];

export default class ViewPosts extends React.Component {
  state = {
    email: '',
    displayName: '',
    posts: null,
    ids: null,
  };
  getAllPosts = () => {
    var array = [];
    var titles = [];
    var ids = [];
    var cool = functions()
      .httpsCallable('getPosts')({
        email: firebase.auth().currentUser.email,
      })
      .then((response) => {
        console.log('WOWZA');
        console.log(response.data);
        arry = response.data.a;
        title = response.data.b;
        id = response.data.c;
      });
    console.log('works');
    console.log(cool);
    // this.state.posts = firebase.firestore().collection('users').get();
    // console.log(this.state.posts);
    // firebase
    //   .firestore()
    //   .collection('users')
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(firebase.auth().currentUser.email);
    //       if (doc.data().userId == firebase.auth().currentUser.email) {
    //         console.log('BOO YAH');
    //         console.log(`${doc.id} => ${doc.data().userId}`);
    //         array.push(doc.data().post);
    //         titles.push(doc.data().name);
    //         ids.push(doc.id);
    //         console.log(array.length);
    //       }
    //     });
    //     console.log('one ' + array.toString());
    //     arry = array;
    //     title = titles;
    //     id = ids;
    //     console.log(arry[0]);
    //   });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi {firebase.auth().currentUser.email}</Text>
        <Text>{this.getAllPosts()}</Text>
        {title.map((num) => (
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => {
              this.props.navigation.navigate('ViewBlog', {itemId: num});
            }}>
            <Text> {num} </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{marginTop: 54}}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Text>Go back Home!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
