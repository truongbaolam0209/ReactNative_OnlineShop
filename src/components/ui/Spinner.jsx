import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Spinner = (props) => {

    const { size } = props;

    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

export default Spinner;

const styles = StyleSheet.create({
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
