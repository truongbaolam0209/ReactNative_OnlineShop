import { AntDesign } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const QuantityAdjustBox = (props) => {

    const { onChangeNumber, product } = props;

    const [number, setNumber] = useState(product && product.count || 1);

    // const { dispatch } = useContext(CartContext);

    const adjustCartItemQuantity = (count) => {
        // dispatch({
        //     type: ADD_ITEM_TO_CART,
        //     payload: { product, count }
        // });
    };

    const onDecrease = useCallback(() => {
        onChangeNumber ? onChangeNumber(number - 1) : adjustCartItemQuantity(number - 1);
        setNumber(number - 1);
    }, [number]);

    const onIncrease = useCallback(() => {
        onChangeNumber ? onChangeNumber(number + 1) : adjustCartItemQuantity(number + 1);
        setNumber(number + 1);
    }, [number]);


    return (
        <View style={styles.container}>
            <Text style={styles.txtTitle}>Quantity</Text>

            <TouchableOpacity
                style={[styles.button, {
                    backgroundColor: number === 1 ? 'grey' : 'yellow'
                }]}
                disabled={number === 1}
                onPress={onDecrease}
            >
                <AntDesign name="minuscircleo" size={20} color="black" />
            </TouchableOpacity>

            <Text style={styles.txtNumber}>{number}</Text>

            <TouchableOpacity style={styles.button} onPress={onIncrease}>
                <AntDesign name="pluscircleo" size={20} color="black" />
            </TouchableOpacity>

        </View>
    );
};

export default QuantityAdjustBox;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'center',
        marginVertical: 25,
        paddingLeft: 12,
    },
    txtTitle: {
        fontSize: 16,
        color: '#263238',
        marginRight: 19,
        fontWeight: 'bold'
    },
    button: {
        width: 44,
        height: 40,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    txtNumber: {
        fontSize: 22,
        color: '#2C393F',
        fontWeight: 'bold',
        marginHorizontal: 16
    },

});
