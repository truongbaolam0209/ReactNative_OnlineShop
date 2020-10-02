import firebase from 'firebase';
import { transformDocs } from '../utils';
import createDataContext from './_createDataContext';



const productReducer = (state, { type, payload }) => {
    switch (type) {

        case 'FETCH_COMMENTS':
            return { ...payload };

        case 'CREATE_COMMENT':
            return {
                ...state, [payload.id]: payload
            };

        // case 'CREATE_REPLY':
        //     return {
        //         ...state, [payload.id]: payload
        //     };

        // case 'UPDATE_PRODUCT':
        //     return {
        //         ...state, ...payload
        //     };

        // case 'DELETE_PRODUCT':
        //     return {
        //         ..._.omit(state, [payload])
        //     };

        default:
            return state;
    };
};


const createComment = dispatch => async (comment) => {

    try {
        await firebase.firestore()
            .collection('commentsCollection')
            .doc(comment.id)
            .set(comment);

        dispatch({
            type: 'CREATE_COMMENT',
            payload: comment
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};

const fetchComments = dispatch => async (productId) => {
    try {
        const response = await firebase.firestore()
            .collection('commentsCollection')
            .where('productId', '==', productId)
            .get();

        dispatch({
            type: 'FETCH_COMMENTS',
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

const createReply = dispatch => async (reply, commentId) => {
    try {
        await firebase.firestore()
            .collection('commentsCollection')
            .doc(commentId)
            .update({
                reply: firebase.firestore.FieldValue.arrayUnion(reply)
            });

        // dispatch({
        //     type: 'CREATE_REPLY',
        //     payload: transformDocs(response.docs)
        // });
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
    { createComment, fetchComments, createReply },
    {}
);
