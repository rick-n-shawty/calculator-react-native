import React, {useState} from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
export default function MyButton({val, style, pressHandler, textStyle}){ 
    return(
        <TouchableOpacity 
        style={[style]} 
        onPress={() => pressHandler(val)}
        activeOpacity={0.8}
        >
            <Text style={[textStyle ? textStyle : {"color": "white"}, styles.text]}>{val}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: "600"
    }
})