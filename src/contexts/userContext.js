import firebase from 'firebase';
import _ from 'lodash';
import { transformDocs } from '../utils';
import createDataContext from './_createDataContext';


const productReducer = (state, { type, payload }) => {
    switch (type) {

        case 'FETCH_USERS':
            return _.keyBy(payload, 'id');

        default:
            return state;
    };
};



const fetchUsers = dispatch => async () => {

    try {
        const response = await firebase.firestore()
            .collection('usersCollection')
            .get();
        dispatch({
            type: 'FETCH_USERS',
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








export const { Provider, Context } = createDataContext(
    productReducer,
    { fetchUsers },
    {}
);
