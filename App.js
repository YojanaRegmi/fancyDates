import  React,{useState,useEffect} from 'react';
import { Text, View,Button, StyleSheet,Switch,ScrollView} from 'react-native';
import Constants from 'expo-constants';

var id=0;

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      start:0,
      disable:false,
      breakTime:5,
    }
  }

  startCounting=()=>{
    this.setState(prevState=>({
        disable:!prevState.disable
      }))

   this.interval= setInterval(this.inc,1000)
  }

  inc=()=>{if(this.state.start<3){
    this.setState(prevState=>({
      start:prevState.start+1
    }))
  }else{
    clearInterval(this.interval)
    this.setState(prevState=>({
      breakTime:5,
      btndisable:!prevState.btndisable
    }))
    return
  }
    
  }

  abort=()=>{
    this.setState(prevState=>({
        disable:!prevState.disable,
      start:0
    }))
     clearInterval(this.interval)
  }
 takeABreak=()=>{
   this.setState({
     btndisable:false,
     start:0
   })
   this.newinterval=setInterval(this.takingBreak,1000)
   clearInterval(this.interval)
 }
    takingBreak=()=>{
      if(this.state.breakTime>0){
        this.setState(prevState=>({
          breakTime:prevState.breakTime-1
        }))
      }else{
        clearInterval(this.newinterval)
    this.setState(prevState=>({
    disable:!prevState.disable
    }))
    return
      }
    }

  
  render(){
    return(
      <View style={styles.container}>
      <Text>pomodoro timer!</Text>
      <Button title='START' onPress={this.startCounting}
      disabled={this.state.disable?true:false}/>
      <Text>{this.state.start}</Text>
      <Button title='break accepted'onPress={this.takeABreak} disabled={this.state.btndisable?false:true}/>
      <Text>{this.state.breakTime}</Text>
      {this.state.start>=3?<Text>time is up. take a break</Text>:<Text>keep going on!</Text>}
      <Button title='abort' onPress={this.abort}/>
      
      
      </View>

    )
  }}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
