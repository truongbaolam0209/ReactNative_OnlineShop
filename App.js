import * as firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { YellowBox } from 'react-native';
import { Provider as AuthProvider } from './src/contexts/authContext';
import { Provider as CartProvider } from './src/contexts/cartContext';
import { Provider as ChatProvider } from './src/contexts/chatContext';
import { Provider as CommentProvider } from './src/contexts/commentContext';
import { Provider as ProductProvider } from './src/contexts/productContext';
import { Provider as UserProvider } from './src/contexts/userContext';
import NavigationContainerApp from './src/navigation/NavigationContainerApp';
// import { commentData } from './src/data/dataInput';
// import { productData } from './src/data/dataInput';
// import { userData } from './src/data/dataInput';
// import { chatData } from './src/data/dataInput';


YellowBox.ignoreWarnings(['Setting a timer']);


const App = () => {

    const [userId, setUserId] = useState(false);

    useEffect(() => {

        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBxxDm8CfzohaI-oKaVdUTH-AgTbIMoVfc",
                authDomain: "rn-final-tbl.firebaseapp.com",
                databaseURL: "https://rn-final-tbl.firebaseio.com",
                projectId: "rn-final-tbl",
                storageBucket: "rn-final-tbl.appspot.com",
                messagingSenderId: "840188241570",
                appId: "1:840188241570:web:49e23c2637455acd5819fb"
            });
        };

        firebase.auth().onAuthStateChanged(user => {
            // console.log('Auth Stage Changed !!!!', user);
            if (user) setUserId(user.uid);
        });

        // btnLoadDataUser(userData);
        // btnLoadDataProduct(productData);
        // btnLoadDataComment(commentData);
        // btnLoadDataChat(chatData);

    }, []);



    return (
        <AuthProvider>
            <ProductProvider>
                <UserProvider>
                    <CommentProvider>
                        <ChatProvider>
                            <CartProvider>
                                <NavigationContainerApp userId={userId} />
                            </CartProvider>
                        </ChatProvider>
                    </CommentProvider>
                </UserProvider>
            </ProductProvider>
        </AuthProvider>
    );
};

export default App;






async function btnLoadDataUser(arr) {
    for (let i = 0; i < arr.length; i++) {
        const data = arr[i];
        await firebase.firestore()
            .collection('usersCollection')
            .doc(data.id)
            .set(data);
    };
};
async function btnLoadDataProduct(arr) {
    for (let i = 0; i < arr.length; i++) {
        const data = arr[i];
        await firebase.firestore()
            .collection('productsCollection')
            .doc(data.id)
            .set(data);
    };
};
async function btnLoadDataComment(arr) {
    for (let i = 0; i < arr.length; i++) {
        const data = arr[i];
        await firebase.firestore()
            .collection('commentsCollection')
            .doc(data.id)
            .set(data);
    };
};
async function btnLoadDataChat(arr) {
    for (let i = 0; i < arr.length; i++) {
        const data = arr[i];
        await firebase.firestore()
            .collection('chatsCollection')
            .doc(data.id)
            .set(data);
    };
};
