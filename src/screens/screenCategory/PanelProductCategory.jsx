import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AvatarCircle from '../../components/ui/AvatarCircle';
import { colors } from '../../data/constants';
const windowWidth = Dimensions.get('window').width;



const PanelProductCategory = (props) => {

    const { product } = props;

    const { name, price, productImagesURL, sale, brand, userImageURL, username } = product;

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
            <View style={styles.avatarContainer}>
                <View style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 5000 }}>
                    <AvatarCircle userImageURL={userImageURL} type='medium' />
                </View>
                <View style={{ height: 50, justifyContent: 'flex-end', zIndex: 1, paddingBottom: 5 }}>
                    <Text style={styles.textUsername}>{username}</Text>
                </View>
            </View>

            <View style={styles.row01}>
                <Text style={{ flex: 1, fontFamily: 'font-light', fontSize: 17 }} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
                <Text style={{ flex: 1, fontFamily: 'font-light', color: colors.secondary }}>{brand}</Text>
            </View>

            <View style={styles.row03}>
                <Text style={styles.row03Text}>${Math.round((1 - sale / 100) * price)}</Text>
                {sale !== 0 && <Text style={styles.priceOriginal}>${price}</Text>}
            </View>

        </TouchableOpacity>
    );
};
export default PanelProductCategory;



const styles = StyleSheet.create({

    container: {
        margin: 5,
        paddingBottom: 5,
        backgroundColor: colors.primary,

        width: (windowWidth - 20) / 2,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2.41,
        elevation: 3,
    },
    avatarContainer: {
        position: 'absolute',
        flexDirection: 'row',
        left: 10,
        top: (windowWidth - 20) / 2 * 1.1 - 35
    },
    textUsername: {
        backgroundColor: 'white',
        marginLeft: 30,
        paddingLeft: 20,
        paddingRight: 10,
        paddingVertical: 2,
        borderRadius: 100,


        shadowColor: "#000",
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 0.41,
        elevation: 3,
    },

    productImg: {
        width: (windowWidth - 20) / 2,
        height: (windowWidth - 20) / 2 * 1.1,
        borderRadius: 10,
    },
    row01: {
        marginTop: 17,
        marginHorizontal: 5
    },

    row03: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },

    row03Text: {
        color: colors.secondary,
        fontSize: 18
    },

    priceOriginal: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: 18,
        color: 'grey'
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
