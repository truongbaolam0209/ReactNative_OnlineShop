import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QuantityAdjustBox from '../../components/ui/QuantityAdjustBox';


const ItemProductCart = (props) => {

    const { product } = props;
    const { productImageURL, productName, count } = product;


    const removeItemFromCart = () => {
        // dispatch({
        //     type: REMOVE_ITEM_FROM_CART,
        //     payload: product.id
        // });
    };


    return (
        <View style={styles.containerItem}>
            <View style={styles.containerName}>
                <Image style={styles.imageContainer} source={productImageURL} />
                <Text style={styles.txtNameItem}>
                    {productName} {"\n"}
                </Text>
            </View>
            <View style={styles.containerQti}>{count}</View>

            <TouchableOpacity style={styles.btnDelete} onPress={removeItemFromCart}>
                <AntDesign name='delete' size={20} color='black' />
            </TouchableOpacity>

            <QuantityAdjustBox product={product} />

        </View >
    );
};
export default ItemProductCart;


const styles = StyleSheet.create({
    containerItem: {
        width: '100%'
    },
    imageContainer: {
        width: 100,
        height: 100
    },
    containerName: {
        flexDirection: 'row',
        width: '70%',
        marginLeft: 16,
        marginTop: 24
    },
    txtNameItem: {
        fontSize: 14,
        color: '#263238',
        lineHeight: 18,
        flex: 1,
        textTransform: 'uppercase',
        marginLeft: 16
    },
    txtBrand: {
        color: '#78909C',
        lineHeight: 18
    },
    containerQti: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 24
    },
    qti: {
        marginVertical: 0,
        marginLeft: 0
    },
    txtPriceItem: {
        fontSize: 16,
        color: '#263238',
        fontWeight: 'bold',
        position: 'absolute',
        right: 0,
        top: 10
    },
    btnDelete: {
        width: 24,
        height: 24,
        backgroundColor: 'green'
        // position: 'absolute',
        // right: 16,
        // top: 24
    }
});







