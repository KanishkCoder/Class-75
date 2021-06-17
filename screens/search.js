import { auto } from 'async';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
//import { ScrollView } from 'react-native-gesture-handler';
import db from '../config';

export default class Search extends React.Component{
    constructor(){
        super();
        this.state={
            allTransactions:[],
            lastVisibleTransaction:null,
            search:''
        }
    }

    fetchMoreTransactions=async()=>{
        var text = this.state.search.toUpperCase()
        var enteredText = text.split("")
        
        if(enteredText[0].toUpperCase()==="B"){
            const query = await db.collection("Transaction").where("bookId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
            query.docs.map((doc)=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })
            })
        }
        else if(enteredText[0].toUpperCase()==="S"){
            const query = await db.collection("Transaction").where("studentId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
            query.docs.map((doc)=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })
            })
    }
}


    searchTransaction=async(text)=>{
        var enteredText = text.split("")
        var text = text.toUpperCase()
        
        if(enteredText[0].toUpperCase()==="B"){
            const transaction = await db.collection("Transaction").where("bookId","==",text).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })
            })
        }
        else if(enteredText[0].toUpperCase()==="S"){
            const transaction = await db.collection("Transaction").where("studentId","==",text).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })
            })
    }
}

    /*fetchMoreTransactions=async()=>{
        const query = await db.collection("Transaction").startAfter(this.state.lastVisibleTransaction).limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTransactions,doc.data()],
                lastVisibleTransaction:doc
            })
        })
    }*/

    /*componentDidMount=async()=>{
        const query = await db.collection("Transaction").get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTransactions,doc.data()]
            })
        })
    }*/
    
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput 
                    style={styles.bar}
                    placeholder="Enter Book Id or Student Id"
                    onChangeText={(text)=>{
                        this.setState({
                            search:text
                        })
                    }}
                    />
                    <TouchableOpacity style={styles.searchButton} 
                    onPress={()=>{this.searchTransaction(this.state.search)}}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                    
            <FlatList
            data={this.state.allTransactions}
            renderItem={({item})=> (
                <View style={{borderWidth:2}}>
                    <Text>{"Book Id: "+item.bookId}</Text>
                    <Text>{"Student Id: "+item.StudentId}</Text>
                    <Text>{"Transaction Type "+item.transactionType}</Text>
                </View>
            )}
            keyExtractor={(item, index)=>index.toString()}
            onEndReached={this.fetchMoreTransactions}
            onEndReachedThreshold={0.7}
            />
            </View>
        )
    }
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignSelf:'center',
        marginTop:20
    },
    searchBar:{
        flexDirection:'row',
        height:40,
        width:'auto',
        borderWidth:0.5,
        alignItems:'center',
        backgroundColor:'grey'
    },
    bar:{
        borderWidth:2,
        height:30,
        width:300,
        paddingLeft:10,
    },
    searchButton:{
        borderWidth:1,
        height:30,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'green'
    }
})