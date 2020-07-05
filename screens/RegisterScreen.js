
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';



export default class RegisterScreen extends React.Component{
    
    state = {
        name: "",
        email: "",
        password:"",
        errorMsg: null,

    };

    handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName : this.state.name
            })
        }).catch(error =>  this.setState({errorMsg : error.message}) )
    }
 
    render() {
        return (
    
            <View style={styles.container} >
                <Text style={styles.greeting} >

                    {`Hello .\nSign up to get started.`}
                </Text>
            
            
            <View style={styles.errorMsg}>
                { this.state.errorMsg &&  <Text style={styles.error}> {this.state.errorMsg} </Text>}
            </View>
            <View style={styles.form} >
                <View>
                    <Text style={styles.inputTitle}>Full Name</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={
                        name => this.setState({name})
                    }
                    value={this.state.name}
                    ></TextInput>
                </View>

                <View style={{marginTop: 32}}>
                    <Text >Email Adress</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={
                        email => this.setState({email})
                    }
                    value={this.state.email}
                    ></TextInput>
                </View>

                <View style={{marginTop: 32}} >
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry autoCapitalize="none"
                    onChangeText={
                        password=> this.setState({password})
                    }
                    value={this.state.password}
                    ></TextInput>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={ () => this.handleSignUp()} >
                <Text style={{color:"#FFF" , fontWeight:"500" , fontSize: 18}} >Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf: "center" , marginTop: 32}} onPress={ () =>  this.props.navigation.navigate('Login')} >
                <Text style={{color: "#414959" , fontSize: 13}} >
                    New to BlogApp ?<Text style={{fontWeight: "500" , color: "#E9446A"}} >Login</Text>
                </Text>
            </TouchableOpacity>

        </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: 'center'
    },
    errorMsg:{
        height: 72,
        alignItems : 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    form :{
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle:{
        borderBottomColor: "#8A8F9E",
        fontSize: 12,
        textTransform: 'uppercase',
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"

    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",

    },
    error:{
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign:"center",


    }


});
