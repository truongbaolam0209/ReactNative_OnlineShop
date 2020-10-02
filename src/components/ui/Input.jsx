import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';



const Input = (props) => {

    const { value, onChangeText, onBlur, placeholder, secureTextEntry } = props;

    return (
        <View style={styles.containerStyle}>
            <TextInput
                style={styles.inputStyle}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

export default Input;


const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        padding: 10,
        fontSize: 16,
        lineHeight: 25,
        borderWidth: 2,
        flex: 1
    },
    containerStyle: {
        flexDirection: 'row',
        flex: 1
    }
});
