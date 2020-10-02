import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AvatarCircle = (props) => {

    const { userImageURL, type, onPress } = props;

    const size = type === 'large' ? 80 : type === 'medium' ? 50 : 35

    return (
        <TouchableOpacity onPress={onPress}>
            <Image style={{
                ...styles.productImg,
                height: size,
                width: size,
                borderRadius: size
            }} source={{ uri: userImageURL }} />
        </TouchableOpacity>
    );
};

export default AvatarCircle;


const styles = StyleSheet.create({
    productImg: {
        borderWidth: 2,
        borderColor: 'white',

    },

});
