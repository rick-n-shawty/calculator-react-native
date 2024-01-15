import { StyleSheet, Text, View } from 'react-native';
import MyButton from './MyButton';
import { useState } from 'react';

export default function App() {
  const [result, setResult] = useState("0"); 
  const [operation, setOpeation] = useState("");
  const [nums, setNums] = useState({num1: "", num2: ""})
  const [activeBtn, setActiveBtn] = useState(null);
  const clear = () => {
    setNums({num1: "", num2: ""});
    setResult(0);
    setOpeation("");
  }
  const display = (num) => {
    setResult(num)
  }
  const calculate = (op) => {
    let res = 0;
    let msg = ""
    let num1 = nums.num1.length > 0 ? JSON.parse(nums.num1) : 0; 
    let num2 = nums.num2.length > 0 ? JSON.parse(nums.num2) : 0;
    console.log(nums)
    console.log("NUM1: " + num1, "NUM2 " + num2)
      switch(op){
        case "+":
          res = num1 + num2; 
          break; 
        case "-":
          res = num1 - num2; 
          break; 
        case "\u00F7":
          if(num2 === 0){
            msg = "Error"
            return msg;
          }
          res = num1 / num2; 
          break; 
        case "\u00D7":
          res = num1 * num2; 
          break;
        default: 
          res = "";
      }
      return JSON.stringify(res);
  }
  const pickOperation = (op) => {
    let res; 
    if(op === "=" && (nums.num1.length < 1 || nums.num2.length < 1)) return;
    if(op === "="){
      res = calculate(operation); 
      setNums(prev => {
        const obj = {...prev}; 
        if(res === ""){
          obj.num1 = "0";
        }else{
          obj.num1 = res;
        }
        return obj;
      });
      display(res);
      return;
    }
    if(operation.length === 0){ 
      // update num1
      if(op === "+/-"){
        res = -1 * JSON.parse(result);
        display(res); 
        setNums(prev => {
          const obj = {...prev}
          obj.num1 = JSON.stringify(res); 
          return obj; 
        })
        setOpeation("");
        return;
      }else if(op === "%"){
        res = JSON.parse(result) / 100;
        display(res); 
        setNums(prev => {
          const obj = {...prev}
          obj.num1 = JSON.stringify(res); 
          return obj;
        })
        setOpeation("");
        return;
      }
      setOpeation(op);
    }else{
      // calculate result
      res = calculate(operation);
      display(res);
      const obj = {num1: res, num2: ""};
      setNums(obj);
      setOpeation(op); 
    }

  }
  const updateNums = (num) =>{
    if(operation.length === 0){
      // choose num1 as a result 
      setNums(prev => {
        const obj = {...prev}
        obj.num1 += num;
        display(obj.num1);
        return obj;
      })
    }else if(operation.length !== 0 && operation !== "%" && operation !== "+/-"){
      // modify num2
      setNums(prev => {
        const obj = {...prev}
        obj.num2 += num; 
        display(obj.num2); 
        return obj;
      })
    }
  }
  const toggleColor = (btn) => {
    setActiveBtn(btn)
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
          <MyButton 
            textStyle={styles.blackText} 
            val={"AC"} style={[styles.btn, styles.lightGrayBtn]} 
            pressHandler={clear} 
            toggleColor={()=>toggleColor("")}
            isActive={false}
          />
          <MyButton 
            textStyle={styles.blackText} 
            val={"+/-"} 
            style={[styles.btn, styles.lightGrayBtn]} 
            pressHandler={pickOperation} 
            toggleColor={()=>toggleColor("")}
            isActive={false}
          />
          <MyButton 
            textStyle={styles.blackText} 
            val={"%"} 
            style={[styles.btn, styles.lightGrayBtn]}
            pressHandler={pickOperation} 
            toggleColor={()=> toggleColor("")}
            isActive={false}
          />
          <MyButton 
            val={'\u00F7'} 
            style={[styles.btn, styles.orangeBtn]} 
            pressHandler={pickOperation}
            isActive={activeBtn === '\u00F7'}
            toggleColor={() => setActiveBtn('\u00F7')}
          />
        </View>
        <View style={styles.buttonRow}>
          <MyButton val={"7"} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton val={"8"} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton val={"9"} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton 
            val={"\u00D7"} 
            style={[styles.btn, styles.orangeBtn]} 
            pressHandler={pickOperation}
            isActive={activeBtn === '\u00D7'}
            toggleColor={() => setActiveBtn('\u00D7')}
          />
        </View>
        <View style={styles.buttonRow}>
          <MyButton val={"4"} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton val={"5"} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton val={"6"} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton 
            val={"-"} 
            style={[styles.btn, styles.orangeBtn]} 
            pressHandler={pickOperation}
            isActive={activeBtn === '-'}
            toggleColor={() => setActiveBtn('-')}
          />
        </View>
        <View style={styles.buttonRow}>
          <MyButton val={"1"} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton val={"2"} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton val={"3"} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton 
            val={"+"} 
            style={[styles.btn,styles.operationNotChosen]} 
            pressHandler={pickOperation}
            toggleColor={() => toggleColor("+")}
            isActive={activeBtn === "+"}
          />
        </View>
        <View style={[styles.buttonRow]}>
          <MyButton val={"0"} style={styles.zeroBtn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton val={"."} style={styles.btn} pressHandler={updateNums} toggleColor={()=> toggleColor("")} isActive={false}/>
          <MyButton 
            val={"="} 
            style={[styles.btn, styles.orangeBtn]} 
            pressHandler={pickOperation}
            toggleColor={()=> toggleColor("=")}
            isActive={false}
          />
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
  orangeText: {
    color: "#FF9500"
  },
  whiteText: {
    color: "white"
  },
  lightGrayBtn: {
    backgroundColor: "#D4D4D2"
  },
  operationChosen: {
    backgroundColor: "white"
  },
  operationNotChosen: {
    backgroundColor: "#FF9500"
  }
});
