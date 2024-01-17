import { StyleSheet, Text, View } from 'react-native';
import MyButton from './MyButton';
import { useState } from 'react';
import MyError from './MyError';

export default function App() { 
  const [result, setResult] = useState('0'); 
  const [activeBtn, setActiveBtn] = useState(null); 
  const [nums, setNums] = useState({num1: "", num2: ""});
  const [error, setError] = useState("");
  const [operator, setOperator] = useState('');
  const [previous, setPrevious] = useState('')

  const formatNumber = (num) => {
    const numeric = parseFloat(num);
    let formatted; 
    if(numeric >= 1e9){
      formatted = numeric.toExponential(); 
      formatted = formatted.replace(/\+/g, '');  
      let arr = formatted.split(''); 
      console.log(formatted.split(''))
      let newStr = "";
      for(let i = 0; i < arr.length; i++){
        if(i > 6 && i < arr.indexOf('e')) continue;  
        if(i === 6){
          newStr += Math.round(parseFloat(arr[i])).toString();
          continue; 
        } 
        newStr += arr[i]; 
      }
      formatted = newStr;
    }else{
      formatted = numeric.toLocaleString();
    }
    return formatted;
  }
  const checkLimit = (num) => {
    const numeric = parseFloat(num);
    let formatted = numeric >= 1e9 ? numeric.toExponential() : numeric.toLocaleString();
    formatted = formatted.replace(/,/g, ''); 
    return formatted;
  }
  const clear = () => {
    setNums({num1: "", num2: ""});
    setResult(0);
    setOperator("");
    setError("");
  }

  const calculate = (op, num1, num2) => {
    let res = 0;
    if(num1.length === 0 && num2.length === 0) return;

    num1 = parseFloat(num1); 
    num2 = parseFloat(num2); 

    switch(op){
      case "+":
        res = num1 + num2; 
        break; 
      case "-":
        res = num1 - num2; 
        break; 
      case "\u00F7":
        if(num2 === 0){
          throw new MyError("Error");
        }
        res = num1 / num2; 
        break; 
      case "\u00D7":
        res = num1 * num2; 
        break;
      default: 
        throw new MyError("Something went wrong");
    }
    try{
      res = res.toString();
      res = checkLimit(res);
    }catch(err){
      throw new MyError("Error");
    }
    // returns string 
    return res; 
  }
 
  const handleOperatorClick = (op) => {
    let res;
    if(op === "=" && operator.length === 0) return; 

    if(op === "=" && operator.length !== 0 && nums.num1.length !== 0 && nums.num2.length === 0){
      res = calculate(operator, nums.num1, previous); 
      setNums(prev => {
        const temp = {...prev}
        temp.num1 = res; 
        temp.num2 = ""; 
        return temp; 
      })
      setResult(formatNumber(res)); 
      return; 
    }else if(op === "=" && operator.length !== 0 && nums.num1.length !== 0 && nums.num2.length !== 0){
      try{
        res = calculate(operator, nums.num1, nums.num2); 
        setResult(formatNumber(res)); 
        setPrevious(nums.num2); 
        setNums(prev => {
          const temp = {...prev}
          temp.num1 = res; 
          temp.num2 = ""
          return temp; 
        })
      }catch(err){
        setError(err.message); 
      }
      return;
    }
    let num = 0; 

   if(operator.length === 0 && (op === "%" || op === "+/-")){
      if(op === "%"){
        num = parseFloat(nums.num1) / 100;
      }else if(op === "+/-"){
        num = -1 * parseFloat(nums.num1);
      }
      console.log("NUMBER ", num)
      if(num === NaN){
        num = 0;
      }
      setNums(prev => {
        const temp = {...prev}; 
        if(num !== 0) temp.num1 = num.toString(); 
        else temp.num1 = ""; 
        return temp;
      }) 
      setResult(formatNumber(num)); 
    }else if(operator.length === 0 && (op === "%" || op === "+/-")){
      if(op === "%"){
        num = parseFloat(nums.num2) / 100;
      }else if(op === "+/-"){
        num = -1 * parseFloat(nums.num2);
      }
      if(num === NaN){
        num = 0;
      }
      setNums(prev => {
        const temp = {...prev}; 
        if(num !== 0) temp.num2 = num.toString(); 
        else temp.num2 = ""; 
        return temp;
      }) 
      setResult(formatNumber(num)); 
    }

    if(op !== "+/-" && op !== "%" && op !== "="){
      setOperator(op); 
    }

    if(nums.num1.length !== 0 && nums.num2.length !== 0 && operator.length !== 0){
      // user enters num1, operator, num2, operator
      try{
        res = calculate(operator,nums.num1, nums.num2);
        setResult(formatNumber(res)); 
        setPrevious(nums.num2);
        setNums(prev => {
          const temp = {...prev}; 
          temp.num1 = res; 
          temp.num2 = ""; 
          return temp; 
        })
        setOperator(op);
      }catch(err){
        setError(err.message); 
      }
    }
  }
  
  const updateNums = (num) =>{
    if(operator.length === 0){
      // choose num1 as a result 
      setNums(prev => {
        const obj = {...prev}
        obj.num1 += num;
        setResult(obj.num1);
        return obj;
      })
    }else if(operator.length !== 0){
      // modify num2
      setNums(prev => {
        const temp = {...prev}; 
        temp.num2 += num; 
        setResult(temp.num2); 
        return temp; 
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
        style={[styles.displayText]}>{error.length > 0 ? error : result}</Text>
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
            pressHandler={handleOperatorClick} 
            toggleColor={()=>toggleColor("")}
            isActive={false}
          />
          <MyButton 
            textStyle={styles.blackText} 
            val={"%"} 
            style={[styles.btn, styles.lightGrayBtn]}
            pressHandler={handleOperatorClick} 
            toggleColor={()=> toggleColor("")}
            isActive={false}
          />
          <MyButton 
            val={'\u00F7'} 
            style={[styles.btn, styles.orangeBtn]} 
            pressHandler={handleOperatorClick}
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
            pressHandler={handleOperatorClick}
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
            pressHandler={handleOperatorClick}
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
            pressHandler={handleOperatorClick}
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
            pressHandler={handleOperatorClick}
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
    fontSize: 70,
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
