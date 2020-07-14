import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import * as firebase from 'firebase';
import functions from '@react-native-firebase/functions';

export default class CreateScreen extends React.Component {
  state = {
    name: '',
    post: '',
  };

  handleBlogPost = () => {
    userID = firebase.auth().currentUser.email;
    functions()
      .httpsCallable('addPost')({
        name: this.state.name,
        post: this.state.post,
        userId: userID,
      })
      .then((response) => {
        console.log(response);
      });

    // console.log(userID);
    // firebase
    //   .firestore()
    //   .collection('users')
    //   .add({
    //     name: this.state.name,
    //     post: this.state.post,
    //     userId: userID,
    //   })
    //   .then(function (docRef) {
    //     console.log('Document written with ID: ', docRef.id);
    //   })
    //   .catch(function (error) {
    //     console.error('Error adding document: ', error);
    //   });
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>
          {`Hello .\nCreate your blog post here!`}
        </Text>

        <View style={styles.errorMsg}>
          {this.state.errorMsg && (
            <Text style={styles.error}> {this.state.errorMsg} </Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Blog Post Title</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Blog Post Content</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(post) => this.setState({post})}
              value={this.state.post}></TextInput>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleBlogPost()}>
          <Text style={{color: '#FFF', fontWeight: '500', fontSize: 18}}>
            Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={{color: '#FFF', fontWeight: '500', fontSize: 18}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMsg: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    borderBottomColor: '#8A8F9E',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
