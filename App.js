/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  state = {
    load: 0,
    empty: 0,
    price: 0,
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
    let bagcount = parseInt(actualweight/62); //onebagweight
    let remainder = Number(actualweight - (bagcount*62));  //onebagweight
    let cost = (bagcount * price) + (remainder * (price/62));
    alert('Total Price : Rs ' + cost.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') );
  }

  render() {
    return (
      <View style={styles.container}>
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

        <TouchableOpacity
        style = {styles.submitButton}
        onPress = {
          () => this.calculate(this.state.load, this.state.empty, this.state.price) //this.state.onebagweight
        }>
        <Text style = {styles.submitButtonText}> Calculate </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    //flex: 1,
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
},
submitButtonText:{
  color: 'white'
}
});
