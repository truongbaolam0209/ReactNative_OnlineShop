import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../data/constants';
const windowWidth = Dimensions.get('window').width;



const PanelProduct = (props) => {

    const { product } = props;

    const { name, price, productImagesURL, sale } = product;

    const navigation = useNavigation();

    const onGoToScreenProduct = useCallback(() => {
        navigation.navigate('ScreenProduct', { product });
    }, []);


    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onGoToScreenProduct}
        >
            {sale !== 0 && (
                <View style={styles.saleTag}>
                    <Text style={styles.saleTagText}>{sale}%</Text>
                </View>
            )}

            <Image style={styles.productImg} source={{ uri: productImagesURL[0] }} />

            <View style={styles.row01}>
                <Text style={{ flex: 1, fontFamily: 'font-thin' }} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
            </View>

            <View style={styles.row02}>
                <Text style={styles.row2Text}>${Math.round((1 - sale / 100) * price)}</Text>
                {sale !== 0 && <Text style={styles.priceOriginal}>${price}</Text>}
            </View>

        </TouchableOpacity>
    );
};
export default PanelProduct;



const styles = StyleSheet.create({

    container: {
        margin: 5,
        paddingBottom: 5,
        backgroundColor: colors.primary,

        width: (windowWidth - 30) / 3,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2.41,
        elevation: 3,
    },

    productImg: {
        width: (windowWidth - 30) / 3,
        height: (windowWidth - 50) / 3 * 1.2,
        borderRadius: 10,
    },
    row01: {
        flexDirection: 'row',
        marginTop: 5,
        marginHorizontal: 5
    },

    row02: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },

    row2Text: {
        color: colors.secondary
    },

    priceOriginal: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },

    saleTag: {
        position: 'absolute',
        top: 12,
        right: 0,
        backgroundColor: colors.secondary,
        zIndex: 10,
        padding: 2,
        paddingLeft: 5,
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7
    },
    saleTagText: {
        color: 'white'
    }
});
