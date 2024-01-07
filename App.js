import { StyleSheet, Text, View } from 'react-native';
import MyButton from './MyButton';
import { useState } from 'react';

export default function App() {
  const [result, setResult] = useState("0"); 
  const [operation, setOpeation] = useState("");
  const [nums, setNums] = useState({num1: "", num2: ""})
  const [fontSize, setFontSize] = useState(80);
  const updateNums = (num) => {
    if(operation.length === 0){
      if(nums.num1.length > 8) return; 
      setNums(prev => {
        const newState = {...prev}; 
        newState.num1 += num; 
        setResult(newState.num1); 
        return newState;
      }); 
    }else{
      if(nums.num2.length > 8) return;
      setNums(prev => {
        const newState = {...prev}; 
        newState.num2 += num; 
        setResult(newState.num2);
        return newState; 
      })
    }
  }
  const clear = () => {
    setNums({num1: "", num2: ""});
    setResult(0);
    setOpeation("");
  }
  const pickOperation = (op) => {
    let res = 0; 
    if(operation.length !== 0){
      if(operation === "+"){
        res = JSON.parse(nums.num1) + JSON.parse(nums.num2);
      }else if(operation === "-"){
        res = JSON.parse(nums.num1) - JSON.parse(nums.num2);
      }else if(operation === "x"){
        res = JSON.parse(nums.num1) * JSON.parse(nums.num2);
      }else if(operation === '\u00F7'){
        if(JSON.parse(nums.num2) === 0){
          setResult("Error");
          setNums({num1: "", num2: ""});
          return;
        }
        res = JSON.parse(nums.num1) / JSON.parse(nums.num2);
      }
      setNums(prev => {
        const newState = {...prev} 
        newState.num1 = JSON.stringify(res); 
        newState.num2 = "";
        return newState;
      })
      setResult(res);
      setOpeation(""); 
    }else{
      setOpeation(op);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text 
        adjustsFontSizeToFit 
        minimumFontScale={0.8} 
        numberOfLines={1} 
        style={[styles.displayText]}>{result}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <MyButton textStyle={styles.blackText} val={"AC"} style={[styles.btn, styles.lightGrayBtn]} pressHandler={clear}/>
          <MyButton textStyle={styles.blackText} val={"+/-"} style={[styles.btn, styles.lightGrayBtn]} pressHandler={pickOperation}/>
          <MyButton textStyle={styles.blackText} val={"%"} style={[styles.btn, styles.lightGrayBtn]} pressHandler={pickOperation}/>
          <MyButton val={'\u00F7'} style={[styles.btn, styles.orangeBtn]} pressHandler={pickOperation}/>
        </View>
        <View style={styles.buttonRow}>
          <MyButton val={"7"} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"8"} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"9"} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"x"} style={[styles.btn, styles.orangeBtn]} pressHandler={pickOperation}/>
        </View>
        <View style={styles.buttonRow}>
          <MyButton val={"4"} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"5"} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"6"} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"-"} style={[styles.btn, styles.orangeBtn]} pressHandler={pickOperation}/>
        </View>
        <View style={styles.buttonRow}>
          <MyButton val={"1"} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"2"} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"3"} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"+"} style={[styles.btn, styles.orangeBtn]} pressHandler={pickOperation}/>
        </View>
        <View style={[styles.buttonRow]}>
          <MyButton val={"0"} style={styles.zeroBtn} pressHandler={updateNums}/>
          <MyButton val={"."} style={styles.btn} pressHandler={updateNums}/>
          <MyButton val={"="} style={[styles.btn, styles.orangeBtn]} pressHandler={pickOperation}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    flex: 1,
    paddingRight: 15,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
  },
  buttonContainer: {
    flex: 2,
    width: "100%",
    gap: 10
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "#505050",
  },
  zeroBtn: {
    width: 170,
    height: 80,
    backgroundColor: "#505050",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  displayText: {
    fontSize: 80,
    color: 'white',
    maxHeight: "70%"
  },
  orangeBtn: {
    backgroundColor: "#FF9500"
  },
  blackText: {
    color: "black"
  },
  lightGrayBtn: {
    backgroundColor: "#D4D4D2"
  }

});
