import firebase from 'firebase';
import _ from 'lodash';
import { transformDoc } from '../utils';
import createDataContext from './_createDataContext';



const cartReducer = (state, { type, payload }) => {
    switch (type) {
        
        case 'FETCH_CART_ITEMS_FOR_BUYER':
            return { ...payload }

        case 'ADD_ITEM_TO_CART':
            return {
                ...state, [payload.productId]: payload
            };

        case 'CHECKOUT':
            return {
                ...state
            }

        case 'REMOVE_ITEM_FROM_CART':
            return {
                ..._.omit(state, [payload])
            };

        default:
            return state;
    };
};


const fetchCartItemsForBuyer = dispatch => async (buyerId) => {
    try {
        const response = await firebase.firestore()
            .collection('usersCollection')
            .doc(buyerId)
            // .collection('cart')
            .get();
        const cartData = transformDoc(response).cart;

        dispatch({
            type: 'FETCH_CART_ITEMS_FOR_BUYER',
            payload: _.keyBy(cartData, 'productId')
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};


const addItemToCart = dispatch => async (product, buyerId) => {
    try {
        await firebase.firestore()
            .collection('usersCollection')
            .doc(buyerId)
            .collection('cart')
            // .doc(product.productId)
            // .set(product)
            .update({
                cart: firebase.firestore.FieldValue.arrayUnion(product)
            });
        // dispatch({
        //     type: 'ADD_ITEM_TO_CART',
        //     payload: product
        // });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};


const removeItemFromCart = dispatch => (productId) => {
    dispatch({
        type: 'REMOVE_ITEM_FROM_CART',
        payload: productId
    });
};



export const { Provider, Context } = createDataContext(
    cartReducer,
    { addItemToCart, removeItemFromCart, fetchCartItemsForBuyer },
    {}
);
