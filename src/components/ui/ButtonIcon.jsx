import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const ButtonIcon = (props) => {
    const { source, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={source} />
        </TouchableOpacity>
    );
};

export default ButtonIcon;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        color: 'white'
    },
});
