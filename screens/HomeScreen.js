
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component{

    state = {
        email: "",
        displayName: ""
    }
    componentDidMount(){
        const { email , displayName} = firebase.auth().currentUser;
        this.setState({email ,displayName});
    }
    signOutuser = () => {
        firebase.auth().signOut();
    }



    render() {
        return (
            <View style={styles.container} >
                <Text>Hi {this.state.email}</Text>
                <TouchableOpacity style={{marginTop: 32 }} onPress={ () => this.signOutuser()} >
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity>
		<TouchableOpacity style={{marginTop: 40 }} onPress={ () => {this.props.navigation.navigate('CreateBlogPost')}} > 
		    <Text>
                        Create Blog Post
		    </Text>
                </TouchableOpacity>
		<TouchableOpacity style={{marginTop: 40 }} onPress={ () => {this.props.navigation.navigate('ViewAllPosts')}} > 
		    <Text>
                        View My Posts!
		    </Text>
                </TouchableOpacity>
		
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        justifyContent: 'center',
        alignItems: 'center',

    }
});
