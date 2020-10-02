import firebase from 'firebase';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { transformDocs } from '../utils';
import createDataContext from './_createDataContext';


const productReducer = (state, { type, payload }) => {
    switch (type) {

        case 'FETCH_PRODUCTS':
            return { ...payload };

        case 'CREATE_PRODUCT':
            return {
                ...state, [payload.id]: payload
            };
        case 'CLEAR_PRODUCTS':
            return {};

        case 'UPDATE_PRODUCT':
            return {
                ...state, ...payload
            };

        case 'DELETE_PRODUCT':
            return {
                ..._.omit(state, [payload])
            };

        default:
            return state;
    };
};


const createProduct = dispatch => async (product) => {
    try {
        const productId = uuidv4();
        await firebase.firestore()
            .collection('productsCollection')
            .doc(productId)
            .set({ ...product, id: productId });

        dispatch({
            type: 'CREATE_PRODUCT',
            payload: { ...product, id: productId }
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};

const fetchProducts = dispatch => async () => {
    try {
        const response = await firebase.firestore()
            .collection('productsCollection')
            .get();

        dispatch({
            type: 'FETCH_PRODUCTS',
            payload: transformDocs(response.docs)
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};

const clearProducts = dispatch => () => {
    dispatch({
        type: 'CLEAR_PRODUCTS'
    });
};




















const updateProduct = dispatch => async (product) => {

    try {
        await fetch(`https://mindx-rn-final.firebaseio.com/products/${product.id}.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        dispatch({
            type: 'UPDATE_PRODUCT',
            payload: product
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};

const deleteProduct = dispatch => async (productId) => {

    try {
        await fetch(`https://mindx-rn-final.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE'
        });

        dispatch({
            type: 'DELETE_PRODUCT',
            payload: productId
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};





export const { Provider, Context } = createDataContext(
    productReducer,
    { createProduct, fetchProducts, clearProducts },
    {}
);
