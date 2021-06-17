import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, KeyboardAvoidingView, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import db from '../config';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:''
        }
    }


    login=async(email,password)=>{
        if(email && password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate("transaction")
                }
            }
            catch(error){
                switch(error.code){
                    case "auth/user-not-found":
                        Alert.alert("User doesn't exists")
                        console.log("Doens't Exists")

                        break;
                        case "auth/invalid-email":
                            Alert.alert("Incorrect email or password")
                            console.log('invalid')
                }
            }
        }
        else{
            Alert.alert("Enter Email Id or Password")
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style={{alignItems: 'center', marginTop: 20}}>
                <View>
                    <Image 
                    source={require("C:/Users/Kanishk/Documents/Class_68/assets/booklogo.jpg")}
                    style={{width:200, height:200}} />
                    <Text style={{textAlign: 'center', fontSize:30}} >Willy</Text>
                </View>
                <View>
                    <TextInput 
                    style={styles.loginBox}
                    placeholder="abc@example.com"
                    keyboardType="email-address"
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }} />
                    <TextInput 
                    style={styles.loginBox}
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }} />
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonText}
                    onPress={()=>{
                        this.Login(this.state.emailId, this.state.password)
                    }}>
                        <Text style={{textAlign: 'center'}} >Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
    },
    buttonText:{
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:7,
    }
})