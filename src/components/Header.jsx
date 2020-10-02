import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
const width_screen = Dimensions.get('window').width;


const Header = () => {


    const navigation = useNavigation();

    const onGoToScreenHome = useCallback(() => {
        navigation.navigate('ScreenHome');
    }, []);
    const onGoToScreenCart = useCallback(() => {
        navigation.navigate('ScreenChat');
    }, []);

    const onGoToScreenSignin = useCallback(() => {
        // navigation.navigate('ScreenProductCreateAndEdit');
        navigation.navigate('ScreenSignin');
    }, []);

    const onGoToScreenChat = useCallback(() => {
        navigation.navigate('ScreenChat');
    }, []);


    return (
        <View style={styles.headerContainer}>
            <View style={styles.searchContainer}>
                <AntDesign name='search1' size={20} color='black' />
                <TextInput style={styles.inputContainer} />
            </View>

            <TouchableOpacity onPress={onGoToScreenSignin} style={styles.buttonWrap}>
                <AntDesign name='login' size={20} color='black' />
            </TouchableOpacity>

            <TouchableOpacity onPress={onGoToScreenHome} style={styles.buttonWrap}>
                <AntDesign name='home' size={20} color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={onGoToScreenCart} style={styles.buttonWrap}>
                <AntDesign name='shoppingcart' size={20} color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={onGoToScreenChat} style={styles.buttonWrap}>
                <AntDesign name='message1' size={20} color='black' />
            </TouchableOpacity>



        </View>
    );
};

export default Header;


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        // backgroundColor: 'blue',
        alignItems: 'center',
        // borderWidth: 2,
        flex: 1,
        height: '100%',
    },
    searchContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 20,
        // borderColor: 'red',
        // borderWidth: 1,
        borderWidth: 2,
    },
    inputContainer: {
        fontSize: 16,
        width: width_screen - 185 - 150,
        marginRight: 20,
        marginLeft: 10,
        // height: 20
    },
    buttonWrap: {
        marginHorizontal: 7
    }
});
