import { MaterialIcons, Octicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const PolicyIconBar = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 7 }}>
            <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name='assignment-return' size={15} color='red' />
                <Text style={{ fontSize: 10, paddingLeft: 3 }}>15 Days Return</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Octicons name='verified' size={13} color='red' />
                <Text style={{ fontSize: 10, paddingLeft: 3 }}>100% Authentic</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name='local-shipping' size={15} color='red' />
                <Text style={{ fontSize: 10, paddingLeft: 3 }}>Free Shipping</Text>
            </View>
        </View>
    );
};

export default PolicyIconBar;

const styles = StyleSheet.create({});
