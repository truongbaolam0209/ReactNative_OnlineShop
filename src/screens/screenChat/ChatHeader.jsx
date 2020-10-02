import React, { useContext } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AvatarCircle from '../../components/ui/AvatarCircle';
import { Context as AuthContext } from '../../contexts/authContext';
import { Context as ChatContext } from '../../contexts/chatContext';



const ChatHeader = (props) => {

    const { item, currentChatId } = props;

    const { state: stateChat, setCurrentChat, clearNotiChat } = useContext(ChatContext);
    const { state: stateAuth } = useContext(AuthContext);

    console.log(item[`${stateAuth.user.role}Unseen`]);

    // useEffect(() => {
    //     console.log('OKOKOKOKOK', currentChatId, item.id);
    //     if (currentChatId === item.id) {
    //         clearNotiChat(item.id, stateAuth.user.role);
    //     };
    //     return () => clearNotiChat(item.id, stateAuth.user.role);
    // }, []);

    return (
        <TouchableOpacity
            style={[styles.container, {
                backgroundColor: item.id === stateChat.currentChatId ? 'white' : '#dfe4ea'
            }]}
            onPress={() => setCurrentChat(item.id)}
        >

            {/* {item[`${stateAuth.user.role}Unseen`] > 0
                ? <Text style={styles.notiChat}>{item[`${stateAuth.user.role}Unseen`]}</Text>
                : null
            } */}

            {currentChatId === item.id
                ? null
                : item[`${stateAuth.user.role}Unseen`] > 0
                    ? <Text style={styles.notiChat}>{item[`${stateAuth.user.role}Unseen`]}</Text>
                    : null
            }

            <Image style={styles.imgStyle} source={{ uri: item.productImageURL }} />
            <AvatarCircle
                userImageURL={stateAuth.user.role === 'dealer'
                    ? item.buyerImageURL
                    : item.dealerImageURL
                }
                type='medium'
            />
        </TouchableOpacity>
    );
};

export default ChatHeader;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        position: 'relative'
    },
    imgStyle: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: 'white'
    },
    notiChat: {
        width: 20,
        height: 20,
        borderRadius: 20,
        color: 'white',
        backgroundColor: 'red',
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 10
    }
});
