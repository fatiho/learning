
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

var arry = [];
var title = [];
var id = [];


export default class ViewPost extends React.Component{
    

    state = {
        email: "",
        displayName: "",
	posts: null,
	ids: null
    }
    getAllPosts = () => {
	var array = [];
	var titles = [];
	var ids = [];
	var itemId = this.props.navigation.state.params.itemId;
	console.log(this.props.navigation.state.params.itemId);
	//var one = JSON.stringify(itemId);
	this.state.posts = firebase.firestore().collection("users").get()
	firebase.firestore().collection("users").get().then((querySnapshot) => {
    		querySnapshot.forEach((doc) => {
			
			if (doc.data().name == itemId) {
				console.log("BOO YAH");
				console.log(`${doc.id} => ${doc.data().userId}`);
				array.push(doc.data().post)
				titles.push(doc.data().name)
				ids.push(doc.id)
				console.log(array.length)
			}
        		
			
    		});
		console.log("one " + array.toString());
		arry = array
		title = titles
		id = ids
		console.log(arry[0]);
	});
	

    }

    deletePlz = () => {
	firebase.firestore().collection("users").doc(id[0]).delete().then(function() {
    		console.log("Document successfully deleted!");
		
	}).catch(function(error) {
    		console.error("Error removing document: ", error);
	});
	
	this.props.navigation.navigate('ViewAllPosts');
	

    }



    render() {
        return (
            <View style={styles.container} >
                <Text>Hi {firebase.auth().currentUser.email}</Text>
		<Text>{this.getAllPosts()}</Text>
		{arry.map(num => (
		    	<Text> {num} </Text>
          		
        	))}

		<TouchableOpacity style={{marginTop: 48 }} onPress={ () => this.deletePlz()} > 
		    <Text>
                        Delete
		    </Text>
                </TouchableOpacity>
                
		<TouchableOpacity style={{marginTop: 54 }} onPress={ () => {this.props.navigation.navigate('ViewAllPosts')}} > 
		    <Text>
                        Go Back
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
