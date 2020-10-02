import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AvatarCircle from '../../components/ui/AvatarCircle';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Context as AuthContext } from '../../contexts/authContext';
import { Context as CommentContext } from '../../contexts/commentContext';



const CommentBox = (props) => {

    const { item } = props;
    const [replyInputShown, setReplyInputShown] = useState(false);
    const [replyText, setReplyText] = useState('');
    const { createReply } = useContext(CommentContext);
    const { state: stateAuth } = useContext(AuthContext);


    const submitReplyHandle = () => {
        createReply({
            replyUserId: stateAuth.user.id,
            replyUserImageURL: stateAuth.user.userImageURL,
            replyUsername: stateAuth.user.username,
            replyText
        }, item.id);
        setReplyText('');
    };

    const renderReply = ({ item }) => (
        <View>
            <View style={styles.replyBox}>
                <AvatarCircle userImageURL={item.replyUserImageURL} type='small' />
                <View>
                    <Text>{item.replyUsername}</Text>
                    <Text>{item.replyText}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View>
            <View style={styles.commentContainer}>
                <AvatarCircle userImageURL={item.userImageURL} type='medium' />
                <View style={styles.commentTextWrap}>
                    <Text>{item.username}</Text>
                    <Text>{item.commentText}</Text>
                    <TouchableOpacity onPress={() => setReplyInputShown(!replyInputShown)}>
                        <Text>reply</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text>{item.comment}</Text>
            <View style={styles.replyContainer}>
                {replyInputShown && (
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder='comment ...'
                            onChangeText={text => setReplyText(text)}
                            value={replyText}
                        />
                        <Button title='send' onPress={submitReplyHandle} />
                    </View>
                )}
                {item.reply && (
                    <FlatList
                        data={item.reply}
                        renderItem={renderReply}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        </View>
    );
};

export default CommentBox;

const styles = StyleSheet.create({
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10
    },
    replyContainer: {
        paddingLeft: 50,
        margin: 10
    },
    replyBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    commentTextWrap: {
        marginLeft: 10
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row'
    },
});
