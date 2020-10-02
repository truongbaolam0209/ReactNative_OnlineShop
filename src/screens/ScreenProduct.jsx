import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ImageSlider from '../components/ImageSlider';
import AvatarCircle from '../components/ui/AvatarCircle';
// import AvatarCircle from '../components/ui/AvatarCircle';
import Button from '../components/ui/Button';
import QuantityAdjustBox from '../components/ui/QuantityAdjustBox';
import { Context as AuthContext } from '../contexts/authContext';
import { Context as CartContext } from '../contexts/cartContext';
import { Context as ChatContext } from '../contexts/chatContext';
import { Context as ProductContext } from '../contexts/productContext';
import CommentSection from './screenProduct/CommentSection';
// import CommentSection from './screenProduct/CommentSection';
const windowWidth = Dimensions.get('window').width;




const ScreenProduct = () => {

    const route = useRoute();
    const { product } = route.params;

    const { id, name, price, brand, userId, userImageURL, username, productImagesURL, description } = product;

    const { state: stateAuth } = useContext(AuthContext);
    const { createNewChat } = useContext(ChatContext);
    const { addItemToCart } = useContext(CartContext);

    const navigation = useNavigation();
    const onGoToScreenUser = useCallback(() => {
        // navigation.navigate('ScreenUser', { userId: userInfo.userId });
    }, []);

    const onGoToScreenChat = useCallback(() => {
        // createNewChat({
        //     id: `${id}-${stateAuth.user.id}`,
        //     productId: id,
        //     productName: `${name} - ${brand}`,
        //     productImageURL: productImagesURL[0],

        //     dealerId: userId,
        //     dealerImageURL: userImageURL,
        //     dealerUsername: username,

        //     buyerId: stateAuth.user.id,
        //     buyerImageURL: stateAuth.user.userImageURL,
        //     buyerUsername: stateAuth.user.username,

        //     chatTexts: [],
        //     lastSaved: (new Date()).getTime()
        // });
        navigation.navigate('ScreenChat', { product });
    }, []);




    const onGoToScreenChat222 = useCallback(() => {
        navigation.navigate('ScreenChat');
        // navigation.navigate('ScreenChat');
    }, []);



    const onGoToScreenProductCreateAndEdit = useCallback(() => {
        navigation.navigate('ScreenProductCreateAndEdit', { product });
    }, []);

    const { deleteProduct } = useContext(ProductContext);

    const [count, setCount] = useState(1);
    const [commentSectionShown, setCommentSectionShown] = useState(false);


    const addItemToCartHandle = () => {
        addItemToCart({
            productId: id,
            productName: `${brand} - ${name}`,
            productImageURL: productImagesURL[0],
            wishlist: false,
            count
        }, stateAuth.user.id);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Free shipping & return + 365 days guarantee</Text>
                <ImageSlider images={productImagesURL} />

                <View>
                    <Text style={styles.textName}>{name}</Text>
                    <Text style={styles.textBrand}>{brand}</Text>
                    <Text style={styles.textDescription}>{description}</Text>
                    <View>
                        <Text>How To Redeem</Text>
                        <Text></Text>
                    </View>
                    <View>
                        <Text>Terms & Conditions</Text>
                        <Text>
                            
                        </Text>
                    </View>
                </View>

                <AvatarCircle
                    userImageURL={userImageURL}
                    type='medium'
                    onPress={onGoToScreenUser}
                />

                {stateAuth.user.role === 'buyer' && (
                    <QuantityAdjustBox onChangeNumber={num => setCount(num)} />
                )}


                {stateAuth.user.role === 'dealer' && stateAuth.user.id === userId && (
                    <View style={styles.buttonGroup}>
                        <Button title='Edit' onPress={onGoToScreenProductCreateAndEdit} />
                        <Button title='Delete' onPress={() => deleteProduct(id)} />
                    </View>
                )}

                {stateAuth.user.role === 'buyer' && (
                    <View style={styles.buttonGroup}>
                        <Button title='Add to cart' onPress={addItemToCartHandle} />
                        <Button title='Chat' onPress={onGoToScreenChat} />
                    </View>
                )}





                <TouchableOpacity onPress={() => setCommentSectionShown(!commentSectionShown)}>
                    <Text>VIEW COMMENT</Text>
                </TouchableOpacity>
                {commentSectionShown && <CommentSection productId={id} userId={userId} />}

            </View>
        </ScrollView>
    );
};

export default ScreenProduct;


const styles = StyleSheet.create({

    container: {
        padding: 10,
        flex: 1,
        alignItems: 'flex-start'
    },

    productImg: {
        width: windowWidth - 40,
        height: windowWidth - 40,
    },
    buttonGroup: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'green'
    },

    textName: {
        fontWeight: 'bold',
        fontSize: 25
    },

    textDescription: {
        color: 'grey'
    }



});
