import React, {useState} from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
export default function MyButton({val, style, pressHandler, textStyle, isActive, toggleColor}){ 
    return(
        <TouchableOpacity 
        style={[style, isActive ? styles.activeBtn : {}]} 
        onPress={() => {
            pressHandler(val)
            toggleColor();
        }}

        activeOpacity={0.8}
        >
   
            <Text style={[textStyle ? textStyle : {"color": "white"}, isActive && styles.activeText, styles.text]}>{val}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: "600"
    },
    activeText: {
        color: "#FF9500"
    },
    activeBtn: {
        backgroundColor: "white"
    }
})