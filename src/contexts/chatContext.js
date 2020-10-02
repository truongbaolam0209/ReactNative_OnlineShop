import firebase from 'firebase';
import _ from 'lodash';
import { transformDoc, transformDocs } from '../utils';
import createDataContext from './_createDataContext';



const productReducer = (state, { type, payload }) => {
    switch (type) {

        case 'FETCH_CHATS':
            return {
                ...state, allChats: payload
            };

        case 'FETCH_CHATS_ONSNAPSHOT':
            return {
                ...state, allChats: { ...state.allChats, ...payload }
            };

        case 'CREATE_NEW_CHAT':
            return {
                ...state
            };

        case 'ADD_NEW_CHAT_TEXT':
            // const allChats = state.allChats;
            // allChats[state.currentChatId].chatTexts.push(payload);
            // console.log(allChats);

            return {
                ...state, ...state.allChats[state.currentChatId].chatTexts.push(payload)
            };

        case 'SET_CURRENT_CHAT':
            return {
                ...state, currentChatId: payload
            };

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


const fetchChats = dispatch => async (userData) => {
    try {
        const response = await firebase.firestore()
            .collection('chatsCollection')
            .where(`${userData.role}Id`, '==', userData.userId)
            .get();
        const responseArray = transformDocs(response.docs);

        dispatch({
            type: 'FETCH_CHATS',
            payload: _.keyBy(responseArray, 'id')
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};


const fetchChatsOnSnapshot = dispatch => (userData) => {

    firebase.firestore()
        .collection('chatsCollection')
        .where(`${userData.role}Id`, '==', userData.id)
        .onSnapshot(snapshot => {

            let docChanges = snapshot.docChanges();

            for (let docChange of docChanges) {
                if (docChange.type == 'modified') {
                    let conversation = transformDoc(docChange.doc);

                    dispatch({
                        type: 'FETCH_CHATS_ONSNAPSHOT',
                        payload: { [conversation.id]: conversation }
                    });

                } else if (docChange.type == 'added') {
                    let conversation = transformDoc(docChange.doc);
                };
            };
        });
        
};

const createNewChat = dispatch => async (newChat) => {
    try {
        await firebase.firestore()
            .collection('chatsCollection')
            .doc(newChat.id)
            .set(newChat);

        dispatch({
            type: 'CREATE_NEW_CHAT',
            payload: newChat.id
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};

const addNewChatText = dispatch => async (chatData, currentChatId, role) => {

    try {
        await firebase.firestore()
            .collection('chatsCollection')
            .doc(currentChatId)
            .update({
                chatTexts: firebase.firestore.FieldValue.arrayUnion(chatData),
            });

        await firebase.firestore()
            .collection('chatsCollection')
            .doc(currentChatId)
            .update({
                [`${role === 'dealer' ? 'buyer' : 'dealer'}Unseen`]: firebase.firestore.FieldValue.increment(1),
                [`${role}Unseen`]: 0
            });
        
        // dispatch({
        //     type: 'ADD_NEW_CHAT_TEXT',
        //     payload: {
        //         owner: chatData.owner,
        //         chatText: chatData.chatText
        //     }
        // });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    };
};


const clearNotiChat = dispatch => (chatId, role) => {

    firebase.firestore()
    .collection('chatsCollection')
    .doc(chatId)
    .onSnapshot(snapshot => {

        console.log('ZZZZZZZZZZZZZZZZZZZZ', snapshot.data());
    });

    // try {
    //     await firebase.firestore()
    //         .collection('chatsCollection')
    //         .doc(chatId)
    //         .update({
    //             [`${role}Unseen`]: -99
    //         });

        // dispatch({
        //     type: 'ADD_NEW_CHAT_TEXT',
        //     payload: {
        //         owner: chatData.owner,
        //         chatText: chatData.chatText
        //     }
        // });
    // } catch (err) {
    //     console.log(err);
        // dispatch({
        //     type: 'ERROR_MESSAGE_ADD',
        //     payload: { loading: false, errMessage: 'Something went wrong with sign up ...' }
        // });
    // };
};


const setCurrentChat = dispatch => (chatId) => {
    dispatch({
        type: 'SET_CURRENT_CHAT',
        payload: chatId
    });
};








export const { Provider, Context } = createDataContext(
    productReducer,
    { addNewChatText, createNewChat, fetchChats, setCurrentChat, fetchChatsOnSnapshot, clearNotiChat },
    { currentChatId: null, allChats: {} }
);
