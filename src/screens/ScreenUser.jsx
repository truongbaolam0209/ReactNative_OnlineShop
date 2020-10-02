import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { dataProduct } from '../data/dataStore';


const ScreenUser = () => {

    const route = useRoute();

    const { userId } = route.params;
    return (
        <View>
            <Text>OK</Text>
        </View>
    );
};

export default ScreenUser;


const styles = StyleSheet.create({


});
