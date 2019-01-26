/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView, TouchableOpacity, TextInput} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  state = {
    load: 0,
    empty: 0,
    price: 0,
    totalweight : 0,
    bagcount : 0,
    remainder : 0,
    totalbagcountcost : 0,
    remainderbagcost : 0,
    finalcost : 0,
    //onebagweight : 0
 }
  handleLoad = (text) => {
    this.setState({ load: Number(text) })
  }
  handleEmpty = (text) => {
    this.setState({ empty: Number(text) })
  }
  handlePrice = (text) => {
    this.setState({ price: Number(text) })
  }
  /*handleOneBagWeight = (text) => {
    this.setState({ onebagweight: Number(text) })
  }*/

  calculate = (load,empty,price) => { //,onebagweight
    console.log("check@@check@@check@@check@@check@@checkcheckcheck")
    if(!load || (load<=0) ){
      alert("Please check Load value");
      return;
    }
    if(!empty || (empty<=0) ){
      alert("Please check Empty value");
      return;
    }
    if(!price || (price<=0) ){
      alert("Please check Price value");
      return;
    }
    /*if(!onebagweight || (onebagweight<=0) ){
      alert("Please check Bag Weight value");
      return;
    }*/
    if(empty > load){
      alert("Empty value greater than load Value");
      return;
    }

    let actualweight = load - empty;
    this.setState({ totalweight : actualweight.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') });

    let bagcount = parseInt(actualweight/62); //onebagweight
    this.setState({ bagcount : bagcount.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') });

    let remainder = Number(actualweight - (bagcount*62));  //onebagweight
    this.setState({ remainder : remainder });


    let cost = (bagcount * price) + (remainder * (price/62));
    this.setState({ totalbagcountcost : (bagcount*price).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') });
    this.setState({ remainderbagcost : (remainder * (price/62)).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') });
    this.setState({finalcost : cost.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') });

    alert('Total Price : Rs ' + cost.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') );
  }

  resetButton = ()=>{
    this.setState({ load: 0,price : 0 , empty : 0, totalweight : 0, bagcount : 0, remainder : 0, totalbagcountcost : 0, remainderbagcost : 0, finalcost : 0});
    console.log(this.state);
  }
  render() {
    return (
      <ScrollView scrollEventThrottle={16} >
      <View style={styles.container}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={true}  >
        <TextInput style = {styles.input}
               keyboardType = "numeric"
               underlineColorAndroid = "transparent"
               placeholder = "Enter Load Weight"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleLoad}/>
        
        <TextInput style = {styles.input}
               keyboardType = "numeric"
               underlineColorAndroid = "transparent"
               placeholder = "Enter Empty Weight"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmpty}/>
        
        <TextInput style = {styles.input}
               keyboardType = "numeric"
               underlineColorAndroid = "transparent"
               placeholder = "Set Price"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePrice}/>
        
        {/* <TextInput style = {styles.input}
               keyboardType = "numeric"
               underlineColorAndroid = "transparent"
               placeholder = "Enter Weight of one Bags"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleOneBagWeight}/> */}

          <View style = {styles.containerInside}>
            <TouchableOpacity
                style = {styles.resetButton}
                onPress = {
                  () => this.resetButton()
                }>
                <Text style = {styles.submitButtonText}> Reset </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                  () => this.calculate(this.state.load, this.state.empty, this.state.price) //this.state.onebagweight
                }>
                <Text style = {styles.submitButtonText}> Calculate </Text>
            </TouchableOpacity>
          </View>
        
        <View style={styles.containertwo}>
          <Text style={styles.welcome}>Total Weight : {this.state.totalweight} Kgs</Text>
          <Text style={styles.welcome}>Total Bags : {this.state.bagcount} => Cost : Rs {this.state.totalbagcountcost}</Text>
          <Text style={styles.welcome}>Remaining : {this.state.remainder} Kgs => Cost : Rs {this.state.remainderbagcost}</Text>
          <Text style={styles.welcome}>Total Amount : Rs {this.state.finalcost} </Text>
        </View>
        </ScrollView>
      </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
 submitButton: {
  backgroundColor: '#7a42f4',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  margin: 15,
  height: 40,
  width: '40%',
},
submitButtonText:{
  color: 'white'
},

containerInside: {
  flex: 1,
  flexDirection: 'row',
  //justifyContent: 'space-between'
},
containertwo: {
  flex: 1,
  flexDirection: 'column',
  alignSelf: 'stretch'
  //justifyContent: 'space-between'
},
resetButton: {
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  margin: 15,
  height: 40,
  width: '40%',
},
});
