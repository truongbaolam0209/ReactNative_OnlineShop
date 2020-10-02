import React, { useCallback, useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context as CartContext } from '../contexts/cartContext';
import ItemProductCart from './screenCart/ItemProductCart';



const ScreenCart = () => {


    const { state: stateCart } = useContext(CartContext);


    const renderItem = useCallback(({ item }) => {
        return <ItemProductCart product={item} />
    }, []);


    const checkoutHandle = () => {

    };


    return (
        <View style={styles.container}>
            <Text style={styles.txtYourCart}>Your Cart</Text>
            <FlatList
                data={Object.values(stateCart)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.containerPrice}>
                <View style={styles.rowPrice}>
                    <Text style={styles.txtTitleRow}>Subtotal</Text>
                    <Text style={styles.txtPrice}>Subtotal</Text>
                </View>
                <View style={styles.rowPrice}>
                    <Text style={styles.txtTitleRow}>Shipping</Text>
                    <Text style={styles.txtPrice}>___</Text>
                </View>
                <View style={styles.rowPrice}>
                    <Text style={styles.txtTitleRow}>Taxes</Text>
                    <Text style={styles.txtPrice}>___</Text>
                </View>
                <View style={styles.rowPrice}>
                    <Text style={styles.txtTotal}>Total</Text>
                    <Text style={styles.txtTotalPrice}>Subtotal</Text>
                </View>
            </View>

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.btnBack}>
                    <Text style={styles.txtBack}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCheckout} onPress={checkoutHandle}>
                    <Text style={styles.txtCheckout}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ScreenCart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    txtYourCart: {
        fontSize: 22,
        color: '#78909C',
        marginTop: 20,
        marginBottom: 24,
        marginLeft: 16,
        fontWeight: 'bold'
    },
    containerPrice: {
        marginHorizontal: 16,
        backgroundColor: '#F7F9F9',
    },
    rowPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16
    },
    txtTitleRow: {
        fontSize: 12,
        color: '#37474F',
        opacity: 0.64
    },
    txtPrice: {
        fontSize: 12,
        color: '#37474F',
        opacity: 0.64,
        fontWeight: 'bold'
    },
    txtTotal: {
        fontSize: 14,
        color: '#263238',
        fontWeight: 'bold'
    },
    txtTotalPrice: {
        fontSize: 14,
        color: '#263238',
        fontWeight: 'bold'
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginHorizontal: 16,
        marginTop: 32,
        marginBottom: 20
    },
    btnBack: {
        width: '21%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBack: {
        fontSize: 14,
        color: '#2196F3',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    btnCheckout: {
        height: 40,
        backgroundColor: '#00ACC1',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '65%'
    },
    txtCheckout: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(38, 50, 56, 0.12)',
        marginHorizontal: 16,
    }
});
