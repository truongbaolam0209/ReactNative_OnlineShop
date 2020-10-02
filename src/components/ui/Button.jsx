import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Button = (props) => {
    const { title, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.textContainer}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;


const styles = StyleSheet.create({
    container: {

    },
    textContainer: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10

    },
});
