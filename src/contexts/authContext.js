// import _ from 'lodash';
import firebase from 'firebase';
import { transformDocs } from '../utils';
import createDataContext from './_createDataContext';


const authReducer = (state, { type, payload }) => {
    switch (type) {

        case 'SAVE_USER':
            return {
                ...state,
                user: payload
            };

        case 'SIGN_IN_OR_UP':
            return {
                user: payload.user,
                isLoading: payload.isLoading,
                errMessage: ''
            };

        // case 'SIGN_OUT':
        //     return { ...state, token: null, errMessage: '' };

        case 'ERROR_MESSAGE_ADD':
            return {
                ...state,
                errMessage: payload.errMessage,
                isLoading: payload.isLoading
            };

        // case 'ERROR_MESSAGE_CLEAR':
        //     return { ...state, errMessage: '' };

        case 'LOADING_SPINNER':
            return { ...state, isLoading: true };

        default:
            return state;
    };
};



const saveUserData = dispatch => async (userId) => {

    const response = await firebase.firestore()
        .collection('usersCollection')
        .where('id', '==', userId)
        .get();

    dispatch({
        type: 'SAVE_USER',
        payload: transformDocs(response.docs)[0]
    });
};



const signin = dispatch => async ({ email, password }) => {
    dispatch({ type: 'LOADING_SPINNER' });
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password);

        const userData = await firebase.firestore()
            .collection('usersCollection')
            .where('id', '===', response.user.uid)
            .get();

        dispatch({
            type: 'SIGN_IN_OR_UP',
            payload: {
                user: transformDocs(userData.docs)[0],
                isLoading: false
            }
        });

        // useNavigation().navigate('ScreenHome');
    } catch (err) {
        dispatch({
            type: 'ERROR_MESSAGE_ADD',
            payload: { isLoading: false, errMessage: 'Something went wrong with sign in ...' }
        });
    };
};


const signup = dispatch => async ({ username, email, password, role }) => {
    dispatch({ type: 'LOADING_SPINNER' });
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password);

        await firebase.firestore()
            .collection('usersCollection')
            .doc(response.user.uid)
            .set({
                id: response.user.uid,
                username,
                role,
                email: email,
                userImageURL: null
            });

        const userData = await firebase.firestore()
            .collection('usersCollection')
            .where('id', '===', response.user.uid)
            .get();

        dispatch({
            type: 'SIGN_IN_OR_UP',
            payload: {
                user: transformDocs(userData.docs)[0],
                isLoading: false
            }
        });
    } catch (err) {
        dispatch({
            type: 'ERROR_MESSAGE_ADD',
            payload: { isLoading: false, errMessage: 'Something went wrong with sign up ...' }
        });
    };
};



// const signout = dispatch => async () => {
//     try {
//         await AsyncStorage.removeItem('mindX_RN_token');
//         dispatch({ type: 'SIGN_OUT' });

//     } catch (err) {
//         dispatch({
//             type: 'ERROR_MESSAGE_ADD',
//             payload: 'Something went wrong with sign out ...'
//         });
//     };
// };


// const errorMessageClear = dispatch => () => {
//     dispatch({ type: 'ERROR_MESSAGE_CLEAR' });
// };



export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, saveUserData },
    { user: null, errMessage: '', isLoading: false }
);







