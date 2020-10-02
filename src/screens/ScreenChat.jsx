import { useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Context as AuthContext } from '../contexts/authContext';
import { Context as ChatContext } from '../contexts/chatContext';
import ChatHeader from './screenChat/ChatHeader';





const ScreenChat = (props) => {
    
    const route = useRoute();
    const product = route.params && route.params.product;


    const {
        state: stateChat, addNewChatText, fetchChats,
        setCurrentChat, createNewChat, fetchChatsOnSnapshot } = useContext(ChatContext);

    const { state: stateAuth } = useContext(AuthContext);
    const [text, setText] = useState('');


    useEffect(() => {
        fetchChats({
            userId: stateAuth.user.id,
            role: stateAuth.user.role
        });
    }, []);


    useEffect(() => {
        fetchChatsOnSnapshot(stateAuth.user);
        return () => fetchChatsOnSnapshot(stateAuth.user);
    }, []);



    const addNewChatTextHandle = () => {

        // if (!(`${product.id}-${stateAuth.user.id}` in stateChat.allChats)) {
        //     createNewChat(initNewChat(product));
        // };

        addNewChatText({
            text,
            owner: stateAuth.user.id,
            createdAt: (new Date()).getTime()
        }, stateChat.currentChatId, stateAuth.user.role);

        setText('');
    };


    const renderChatHeader = useCallback(({ item }) => {
        return (
            <ChatHeader 
                item={item} 
                currentChatId={stateChat.currentChatId}
            />
        )
    }, []);


    const renderChatText = ({ item }) => {
        const currentChat = stateChat.allChats[stateChat.currentChatId];
        return (
            <View style={styles.chatTextContainer}>

                {item.owner === stateAuth.user.id
                    ? <Text style={styles.textRight}>{item.text}</Text>
                    : <Text style={styles.textLeft}>{item.text}</Text>
                }

            </View>
        );
    };

    const initNewChat = (product) => {
        return {
            id: `${product.id}-${stateAuth.user.id}`,
            productId: product.id,
            productName: product.name,
            productImageURL: product.productImagesURL[0],

            dealerId: product.userId,
            dealerImageURL: product.userImageURL,
            dealerUsername: product.username,
            dealerUnseen: 0,
            
            buyerId: stateAuth.user.id,
            buyerImageURL: stateAuth.user.userImageURL,
            buyerUsername: stateAuth.user.username,
            buyerUnseen: 0,
            
            chatTexts: [],
            lastSaved: (new Date()).getTime(),
        };
    };


    return (
        <View style={styles.container}>

            <View style={styles.chatHeaderColumn}>
                <FlatList data={
                    product && !(`${product.id}-${stateAuth.user.id}` in stateChat.allChats)
                        ? [...Object.values(stateChat.allChats), initNewChat(product)]
                        : Object.values(stateChat.allChats)
                }
                    renderItem={renderChatHeader}
                    keyExtractor={chat => chat.id}
                />
            </View>

            <View style={styles.chatTextColumn}>
                <View>
                    {stateChat.currentChatId && (
                        <FlatList
                            data={stateChat.allChats[stateChat.currentChatId].chatTexts}
                            renderItem={renderChatText}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}

                </View>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder='comment ...'
                        onChangeText={text => setText(text)}
                        value={text}
                    />
                    <Button title='send' onPress={addNewChatTextHandle} />
                </View>
            </View>

        </View>
    );
};

export default ScreenChat;





const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    chatHeaderColumn: {
        width: 200,
        backgroundColor: '#dfe4ea',
        width: 120
    },
    chatTextColumn: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 120
    },



    chatTextContainer: {
        flex: 1
    },


    inputContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
    },

    textLeft: {
        alignSelf: 'flex-start',
        backgroundColor: 'grey',
        borderRadius: 5,
        padding: 4,
        margin: 2
    },
    textRight: {
        alignSelf: 'flex-end',
        backgroundColor: 'grey',
        borderRadius: 5,
        padding: 4,
        margin: 2
    },

});
